import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../Utils/constants";
import { addFeed } from "../Utils/feedSlice";
import axios from "axios";
import { useEffect } from "react";
import UserCard from "./UserCard";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../Utils/appStore";

const Feed = () => {
  const feed = useSelector((store: RootState) => store.feed);
  const user = useSelector((store: RootState) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    const getFeed = async () => {
      if (Array.isArray(feed) && feed.length > 0) return;
      try {
        const res = await axios.get(API_URL + "/feed", {
          withCredentials: true,
        });
        dispatch(addFeed(res.data.data));
      } catch (err) {
        console.log("errror :" + err);
      }
    };
    getFeed();
  }, [feed, navigate, dispatch]);

  return Array.isArray(feed) && feed.length > 0 ? (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 mb-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">
            Discover Developers
          </h1>
          <p className="text-xl text-center opacity-90">
            Connect with amazing developers from around the world
          </p>
          <div className="flex justify-center items-center gap-4 mt-4">
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-sm font-medium">{feed.length} developers available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feed Grid */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">
          {feed.map((x) => (
            <div key={x._id} className="transform hover:scale-105 transition-transform duration-300">
              <UserCard user={x} />
            </div>
          ))}
        </div>
        
        {/* Bottom Stats */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">{feed.length}</div>
              <div className="text-gray-600">Total Developers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">24/7</div>
              <div className="text-gray-600">Active Platform</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">Global</div>
              <div className="text-gray-600">Worldwide Network</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🤔</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">No Developers Found</h2>
        <p className="text-gray-600 text-lg">Check back later for new connections!</p>
      </div>
    </div>
  );
};

export default Feed;
