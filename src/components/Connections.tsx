import axios from "axios";
import { API_URL } from "../Utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../Utils/connectionsSlice";
import Connection_Card from "./Connection_Card";
import { useEffect, useState } from "react";
import type { RootState } from "../Utils/appStore";

const Connections = () => {
  const dispatch = useDispatch();
  const [error, seterror] = useState("");
  const users = useSelector((store: RootState) => store.connections);
  useEffect(() => {
    const loadConnections = async () => {
      try {
        const res = await axios.get(API_URL + "/user/connections", {
          withCredentials: true,
        });
        console.log("API response:", res.data);

        dispatch(addConnection(res.data.data));
      } catch (err) {
        console.error("Failed to load connections:", err);
        seterror("Failed to load connections. Please try again later.");
      }
    };

    loadConnections();
  }, [dispatch]);

  return (
    <div>
      <div className="flex justify-center font-bold my-1 py-2 bg-amber-100 text-3xl">
        <h1>My Connections</h1>
      </div>
      <div>
        {error && <p className="text-red-500 text-center my-2">{error}</p>}
        {Array.isArray(users) && users.length > 0 ? (
          users.map((user) => <Connection_Card key={user._id} user={user} />)
        ) : (
          <p>No connections found.</p>
        )}
      </div>
    </div>
  );
};

export default Connections;
