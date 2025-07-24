import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
const UserContext = createContext({});
export const useUserContext = () => useContext(UserContext);

export function UserContextProvider({ children }) {
  const [username, setUsername] = useState("");
  const [id, setId] = useState(null);
  const [email,setemail] = useState()

  const navigate = useNavigate();
  const location = useLocation();
  const shouldRedirect =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/dashboard"
  useEffect(() => {
    axios
      .get("http://localhost:4000/profile", { withCredentials: true })
      .then((res) => {
        if (res.data) {
          setUsername(res.data.username);
          setId(res.data.userId);
          if (shouldRedirect) {
            navigate(`/dashboard/${res.data.username}`);
          }
        }
   
        console.log("PROFILE DATA:", res.data);
      })
      .catch((err) => {
        console.log("Not logged in", err.message);
        navigate('/login')
      });
  }, [username]);

  return (
    <UserContext.Provider
      value={{username, setUsername, id, setId }}
    >
      {children}
    </UserContext.Provider>
  );
}
