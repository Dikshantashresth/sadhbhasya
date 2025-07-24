const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const userModel = require("./models/user");
const http = require("http");
const MessageModel = require("./models/message");
const ChatModel = require("./models/Chat");
const { Server } = require("socket.io");
const FitnessModel = require("./models/FItness");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios")

require("dotenv").config();

const app = express();
const server = http.createServer(app);
const Key = process.env.SECRET_KEY;
const Url = process.env.MONGODB_URI;
const API_TOKEN = process.env.TOKEN

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(Url);
app.post("/chat", (req, res) => {});
app.get("/profile", (req, res) => {
  const token = req.cookies?.token;
  if (token) {
    jwt.verify(token, Key, {}, (err, userdata) => {
      if (err) throw err;
      res.json(userdata);
    });
  } else {
    res.status(401).json("no token");
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const founduser = await userModel.findOne({ email });
  if (founduser) {
    bcrypt.compare(password, founduser.password, (err, result) => {
      if (result) {
        jwt.sign(
          { userId: founduser._id, email, username: founduser.username },
          Key,
          {},
          (err, token) => {
            res
              .cookie("token", token, {
                httpOnly: true, // cookie not accessible to JS (good security)
                sameSite: "lax", // relax sameSite to allow sending cookies in normal navigation
                secure: false,
              })
              .status(201)
              .json({ id: founduser._id });
          }
        );
      }
    });
  } else {
    res.status(400).json({ error: "unauthorized" });
  }
});
app.get("/profile", (req, res) => {
  const token = req.cookies?.token;
  if (token) {
    jwt.verify(token, Key, {}, (err, userdata) => {
      if (err) throw err;
      res.json(userdata);
    });
  } else {
    res.status(401).json("no token");
  }
});

app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    jwt.sign({ userId: createdUser._id, username }, Key, {}, (err, token) => {
      if (err) throw err;
      res
        .cookie("token", token, {
          httpOnly: true,
          sameSite: "lax",
          secure: false,
        })
        .status(201)
        .json({ id: createdUser._id });
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Registration failed" });
  }
});

app.post("/submit-biodata", async (req, res) => {
  const userBio = req.body;

  const prompt = `User biodata: ${JSON.stringify(userBio)}. Generate a fitness plan.`;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct", // ✅ Correct model name
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`, // 🔁 Replace this with your real OpenRouter key
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173", // ✅ required by OpenRouter
          "X-Title": "biodata-fitness-app",        // ✅ required by OpenRouter
        },
      }
    );

    res.json({ result: response.data });
  } catch (error) {
    console.error("OpenRouter error:", error?.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate fitness plan." });
  }
});


app.get('/search', async(req,res)=>{
    const FindFitnessUser = await FitnessModel.findById({});
    if(FindFitnessUser){
        res.status(200).json({success:true})
    }else{
        res.status(201).json({sucess:false})
    }

})
app.get("/", (req, res) => {
  console.log("working");
  res.send("Server is running!");
});
io.on("connection", (socket) => {
  console.log("a user connected");


  socket.on("send_message", async (msgData) => {
    const messageSend = await MessageModel.create({
      content: msgData.message,
      room: msgData.roomid,
      sender: msgData.id,
    });
    const populatemessage = await (
      await messageSend.populate("sender")
    ).populate("room");
    const roomname = populatemessage.room.roomName;

    io.to(roomname).emit("get_message", populatemessage);
  });
});
app.get("/messages", async (req, res) => {
  const ChatId = req.query.Chatid;
  try {
    const messages = await MessageModel.find({ Chat: ChatId })
      .sort({ timestamp: 1 })
      .populate("sender");

    res.status(200).json(messages);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.data });
  }
});
app.post("/chat/send", async (req, res) => {
  const { message, botType } = req.body;

  if (!message || !botType) {
    return res.status(400).json({ error: "Message and botType are required" });
  }

  let systemPrompt;

  switch (botType) {
    case "therapist":
      systemPrompt = 
      "You are a compassionate therapist. Help the user with emotional support, self-awareness, and mental clarity.";
      break;
    case "fitness":
      systemPrompt = 
      "You are a motivational fitness coach. Give advice on workouts, health, and lifestyle.";
      break;
    case "MedicalExpert":
      systemPrompt = 
      "You are a medical expert";
      break;
    case "Dietician":
      systemPrompt = 
      "You are a medical ";
      break;
    default:
      systemPrompt = "You are a helpful AI assistant.";
  }

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "chat-app",
        },
      }
    );

    const aiMessage = response.data.choices[0].message.content;
    res.json({ reply: aiMessage });
  } catch (error) {
    console.error("Error calling LLM:", error?.response?.data || error.message);
    res.status(500).json({ error: "Failed to get AI response" });
  }
});


server.listen(process.env.PORT);
