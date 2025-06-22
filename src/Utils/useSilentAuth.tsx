import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "./userSlice";
import { API_URL } from "./constants";

const useSilentAuth = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        // This request will succeed if the user has a valid cookie
        const response = await axios.get(`${API_URL}/feed`, {
          withCredentials: true,
        });

        if (response.data.user) {
          dispatch(addUser(response.data.user));
        }
      } catch (error) {
        // It's okay if this fails; it just means the user isn't logged in.
        console.log("Silent auth failed or no user session.", error);
      } finally {
        setLoading(false);
      }
    };

    authenticateUser();
  }, [dispatch]);

  return loading;
};

export default useSilentAuth;
