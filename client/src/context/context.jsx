import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const UserContext = createContext({});
export const useUserContext = () => useContext(UserContext);

export function UserContextProvider({ children }) {
  const [username, setUsername] = useState("");
  const [id, setId] = useState(null);
  const [email, setemail] = useState();

  const navigate = useNavigate();
  const location = useLocation();

  const shouldRedirect =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/dashboard";

  useEffect(() => {
    const fetchProfileAndRedirect = async () => {
      try {
        const res = await axios.get("http://localhost:4000/profile", {
          withCredentials: true,
        });

        if (res.data) {
          const { username, userId } = res.data;
          setUsername(username);
          setId(userId);

          if (shouldRedirect) {
            try {
              const check = await axios.get(`http://localhost:4000/search/${userId}`);
              if (check.data.exists) {
                navigate(`/dashboard/${username}`);
              } else {
                navigate(`/getform/${username}`);
              }
            } catch (err) {
              console.error("Error checking user existence:", err.message);
            }
          }
        }
        console.log("PROFILE DATA:", res.data);
      } catch (err) {
        console.log("Not logged in", err.message);
        navigate("/");
      }
    };

    fetchProfileAndRedirect();
  }, []); // Only run once on mount

  return (
    <UserContext.Provider value={{ username, setUsername, id, setId,setemail,email }}>
      {children}
    </UserContext.Provider>
  );
}
