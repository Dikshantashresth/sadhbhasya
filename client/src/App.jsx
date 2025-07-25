import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Settings from "./components/Settings";
import Chat from "./components/Chat";
import GetForm from "./components/GetForm";
import Login from "./components/Login";
import MainContent from "./components/MainContent";
import Register from "./components/Register";
import { UserContextProvider } from "./context/context";
import Calories from "./components/Calories";
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import FeaturesPage from "./pages/Features";
import NavBar from "./components/NavBar";
import MainRouter from "./components/MainRouter";

export default function App() {
  return (
    <Router>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/router" element={<MainRouter/>}/>
          <Route path="/getform/:userid" element={<GetForm />} />
          <Route path="chat/:roomId" element={<Chat />} />
          <Route path="/dashboard/:user" element={<Dashboard />}>
            <Route index element={<MainContent />} />
            <Route path="settings" element={<Settings />} />
            <Route path="calories" element={<Calories />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </Router>
  );
}
