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
const axios = require("axios");
const UserBio = require("./models/meals")

require("dotenv").config();

const app = express();
const server = http.createServer(app);
const Key = process.env.SECRET_KEY;
const Url = process.env.MONGODB_URI;
const API_TOKEN = process.env.TOKEN;

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

  const { userId } = userBio;
console.log(userBio)
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    // Step 1: Check if user already has a fitness plan
    const existingPlan = await FitnessModel.findOne({ user: userId });

    if (existingPlan) {
      return res.json({
        success: true,
        message: "Fitness plan already exists.",
        data: existingPlan,
        redirectToDashboard: true,
        username: existingPlan.name,
      });
    }

    // Step 2: Prepare AI prompt
    const prompt = `
You are a fitness and health AI expert.

Below is a user's biodata:
${JSON.stringify(userBio, null, 2)}

Based on this biodata, generate a personalized fitness plan strictly in JSON format with the following structure:

{
  "calories": number,
  "macronutrients": {
    "protein": number,
    "carbs": number,
    "fats": number
  },
  "waterIntakeLiters": number,
  "recommendedSleepHours": number,
  "workoutRecommendations": [ "string", "string", ... ],
  "lifestyleAdvice": [ "string", "string", ... ],
  "warnings": [ "string", "string", ... ]
}

Make sure to only return valid JSON. Do not include explanations or any text outside of the JSON object.
`;

    // Step 3: Call OpenRouter
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "biodata-fitness-app",
        },
      }
    );

    const fitnessPlan = JSON.parse(response.data.choices[0].message.content);

    // Step 4: Save new plan with user ref
    const created = await FitnessModel.create({
      user: userId,
      ...userBio,
      fitnessPlan,
    });

    res.json({
      success: true,
      message: "New fitness plan created.",
      data: created,
      redirectToDashboard: true,
      username: created.name,
    });
  } catch (error) {
    console.error("OpenRouter error:", error?.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate fitness plan." });
  }
});


app.get("/api/fitness-plan/:userId", async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'Invalid user ID format' });
  }

  try {
    const userObjectId =new  mongoose.Types.ObjectId(userId);

    const fitnessPlanDoc = await FitnessModel.findOne({ user: userObjectId });

    if (!fitnessPlanDoc) {
      return res.status(404).json({ error: "Fitness plan not found for this user." });
    }

    return res.json({
      success: true,
      data: fitnessPlanDoc.fitnessPlan,
      username: fitnessPlanDoc.name || null,
    });
  } catch (error) {
    console.error("Error fetching fitness plan:", error);
    return res.status(500).json({ error: "Failed to retrieve fitness plan." });
  }
});




app.get("/search/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const existingUser = await FitnessModel.findOne({ user: userId });

    if (existingUser) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(404).json({ exists: false });
    }
  } catch (err) {
    return res.status(500).json({ error: "Server error", details: err.message });
  }
});
app.get('/getPlan/:userId',async(req,res)=>{

});
app.post('/update-user', async (req, res) => {
  const { userId, newUsername } = req.body;

  if (!userId || !newUsername) {
    return res.status(400).json({ success: false, message: 'Missing data' });
  }

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.username = newUsername;
    await user.save();

    res.json({ success: true, message: 'Username updated successfully' });
  } catch (err) {
    console.error('Error updating username:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


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
      systemPrompt = "You are a medical expert";
      break;
    case "Dietician":
      systemPrompt = "You are a medical ";
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
app.post("/api/nutrition/parse", async (req, res) => {
  try {
    console.log("Request body:", req.body);

    const foodDescription = req.body.foodDescription;
    if (!foodDescription) {
      return res.status(400).json({ error: "foodDescription is required" });
    }

    const prompt = `
You are a fitness and health AI expert.

Below is a user's food description:
${foodDescription}

Please provide the nutritional info strictly in valid JSON format, with numeric values for calories, protein, carbs, and fats. Do not include any text outside of the JSON.

Example:
{
  "calories": 350,
  "protein": 30,
  "carbs": 40,
  "fats": 10
}
`;


    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const aiResponse = response.data.choices[0].message.content;
    console.log("AI response:", aiResponse);

    // Extract JSON substring to safely parse
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return res.status(500).json({ error: "No JSON found in AI response" });
    }

    const nutritionData = JSON.parse(jsonMatch[0]);

    return res.json({ success: true, nutritionData });
  } catch (error) {
    console.error("Error processing nutrition parse:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/health-tips/:userId", async (req, res) => {
  const { userId } = req.params;

  if (!userId) return res.status(400).json({ error: "User ID is required" });

  try {
    // Fetch fitness plan data for user
    const fitnessPlan = await FitnessModel.findOne({ user: userId }).lean();

    if (!fitnessPlan) {
      return res.status(404).json({ error: "Fitness plan not found" });
    }

    // Prepare prompt for LLM
    const prompt = `
You are a health and fitness expert AI assistant.

Given this user's fitness plan data:
${JSON.stringify(fitnessPlan, null, 2)}

Provide personalized health tips and daily recommendations in clear bullet points or short sentences.
Return only the advice without extra commentary.
    `;

    // Call OpenRouter API
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const aiMessage = response.data.choices[0].message.content;

    // Return AI suggestions
    res.json({ success: true, suggestions: aiMessage });
  } catch (error) {
    console.error("Error fetching health tips:", error?.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch health tips" });
  }
});

server.listen(process.env.PORT);
