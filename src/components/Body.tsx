import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../Utils/appStore";
import { useEffect } from "react";
import Footer from "./Footer";

const Body = () => {
  const user = useSelector((store: RootState) => store.user);
  const navigate = useNavigate();

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
