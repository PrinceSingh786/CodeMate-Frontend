import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../Utils/constants";
import { useDispatch } from "react-redux";
import { removeUser } from "../Utils/userSlice";
import type { RootState } from "../Utils/appStore";
interface User {
  name: string;
  photo?: string;
  // ...other fields
}
const NavBar = () => {
  const user = useSelector((store: RootState) => store.user as User | null);

  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const handlelogout = async () => {
    try {
      await axios.post(API_URL + "/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      // Always clear user state regardless of API response
      dispatch(removeUser());
      Navigate("/login");
    }
  };

  return (
    <div>
      <div className="navbar bg-base-300 shadow-sm py-4">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-2xl font-bold">
            CodeMate{" "}
          </Link>
        </div>
        
        {/* Desktop Navigation - Show on larger screens */}
        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <>
              <p className="text-xl font-bold">Welcome {user.name} !</p>
              <Link to="/" className="btn font-bold bg-blue-500 text-white btn-ghost text-lg">
                Feeds
              </Link>
              <Link to="/connections" className="btn font-bold bg-blue-500 text-white btn-ghost text-lg">
                Connections
              </Link>
              <Link to="/requests" className="btn btn-ghost bg-blue-500 text-white text-lg">
                Requests
              </Link>
              <Link to="/profile" className="btn btn-ghost bg-blue-500 text-white text-lg">
                Profile
              </Link>
              <button onClick={handlelogout} className="btn bg-blue-500 text-white btn-ghost text-lg">
                Logout
              </button>
              <div className="avatar">
                <Link to="/profile" className="rounded-full">
                  <div className="w-12 h-12 rounded-full">
                    <img
                      alt="User avatar"
                      src={
                        user.photo ||
                        "https://documents.iplt20.com/ipl/IPLHeadshot2025/2.png"
                      }
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>
                </Link>
              </div>
            </>
          ) : (
            <>
              <p className="text-xl font-bold">Welcome to CodeMate!</p>
              <Link to="/login" className="btn  btn-primary text-lg">
                Login
              </Link>
              <Link to="/signup" className="btn btn-outline text-lg">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Navigation - Show on smaller screens */}
        <div className="lg:hidden flex gap-2">
          {user ? (
            <>
              <p className="text-xl font-bold">Welcome {user.name} !</p>
              <div className="dropdown dropdown-end mx-4">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-12 h-12 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={
                        user.photo ||
                        "https://documents.iplt20.com/ipl/IPLHeadshot2025/2.png"
                      }
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                   <li>
                    <Link to="/" className=" font-bold text-xl">
Feeds                    </Link>
                  </li>
                  <li>
                    <Link to="connections" className=" font-bold text-xl">
                      Connections
                    </Link>
                  </li>
                  <li>
                    <Link to="requests" className="font-bold text-xl">
                      Requests received
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile" className="justify-between font-bold text-xl">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/login" className="text-xl font-bold" onClick={handlelogout}>
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <p className="text-xl font-bold">Welcome!</p>
              <Link to="/login" className="btn btn-primary btn-sm">
                Login
              </Link>
              <Link to="/signup" className="btn btn-outline btn-sm">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
