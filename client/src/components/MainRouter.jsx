import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../context/context";
import LoaderComponent from "./LoaderComponent";

export default function MainRouter() {
  const navigate = useNavigate();
  const { id, username } = useUserContext(); // id is userId

  useEffect(() => {
    if (!id) return; // Wait until userId is loaded

    async function checkUser() {
      try {
        const res = await axios.get(`http://localhost:4000/search/${id}`);
        if (res.data.exists) {
          navigate(`/dashboard/${username}`);
        } else {
          navigate(`/getform/${username}`);
        }
      } catch (err) {
        console.error("Error checking user existence: ", err);
        navigate(`/getform/${username}`);
      }
    }

    checkUser();
  }, [id]);

  return (
    <div>
      <LoaderComponent/>
    </div>
  ); // Optional: return routes or loading spinner
}
