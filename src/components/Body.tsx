import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../Utils/userSlice";
import type { RootState } from "../Utils/appStore";

const Body = () => {
  const dispatch = useDispatch();
  const user = useSelector((store: RootState) => store.user);
  const navigate = useNavigate();

  // On app load, dispatch action to set user from localStorage if present
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    let userFromStorage = null;
    if (storedUser && storedUser !== "undefined") {
      try {
        userFromStorage = JSON.parse(storedUser);
      } catch {
        userFromStorage = null;
      }
    }
    if (userFromStorage) {
      dispatch(addUser(userFromStorage));
    }
  }, [dispatch]);

  useEffect(() => {
    const currentPath = window.location.pathname.toLowerCase();

    // If user is logged in, but on login/signup, redirect to feed.
    if (user && (currentPath === "/login" || currentPath === "/signup")) {
      navigate("/");
    }
    // If user is not logged in and not on a public page, redirect to login.
    else if (!user && currentPath !== "/login" && currentPath !== "/signup") {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;
