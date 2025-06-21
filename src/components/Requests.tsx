import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../Utils/constants";
import axios from "axios";
import { addRequests, removeRequest } from "../Utils/requestSlice";
import { useEffect, useState } from "react";
import type { RootState } from "../Utils/appStore";
interface UserRef {
  _id: string;
  name: string;
  age: number;
  gender: string;
  bio: string;
  photo?: string;
}

interface Request {
  _id: string;
  fromUserId: UserRef;
  // add other fields if needed
}
const Requests = () => {
  const dispatch = useDispatch();
  const [error, seterror] = useState("");
  const requestData = useSelector(
    (store: RootState) => store.requests as Request[]
  );
  const reviewRequest = async (status: string, _id: string) => {
    try {
      console.log("id :" + _id);
      await axios.post(
        API_URL + "/acceptconnectionrequest/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err);
      seterror("Something went wrong while reviewing");
    }
  };
  useEffect(() => {
    const loadrequests = async () => {
      try {
        const res = await axios.get(API_URL + "/user/requests", {
          withCredentials: true,
        });
        console.log("REQUEST DATA :" + res.data.data);
        const data = res.data.data;
        dispatch(addRequests(data));
      } catch (err) {
        console.log(err);
        seterror("Unable to load the requests");
      }
    };

    loadrequests();
  }, [dispatch]);
  return (
    <div>
      <div className="flex justify-center font-bold my-1 py-2 bg-amber-100 text-3xl">
        <h1>My Requests</h1>
      </div>
      <div>
        {error && <p className="text-red-500 text-center my-2">{error}</p>}
        {Array.isArray(requestData) && requestData.length > 0 ? (
          requestData.map((request) => {
            const { name, age, gender, bio, photo } = request.fromUserId;
            return (
              <div className="flex justify-center my-15">
                <div className="card card-side bg-base-100 w-full md:w-8/12  shadow-sm">
                  <div className="w-4/12 ">
                    <figure>
                      {" "}
                      <img
                        className="w-full h-60 md:h-80 object-cover rounded-lg"
                        src={photo}
                        alt="Movie"
                      />
                    </figure>
                  </div>

                  <div className="card-body w-4/12">
                    <h1 className="card-title">
                      Name: <h1 className="font-thin">{name}</h1>
                    </h1>
                    {age && (
                      <div className="flex ">
                        <h3 className=" font-bold">AGE: </h3>{" "}
                        <h3 className="mx-4">{age}</h3>
                      </div>
                    )}
                    {gender && (
                      <div className="flex ">
                        <h3 className=" font-bold">Gender: </h3>{" "}
                        <h3 className="mx-4">{gender}</h3>
                      </div>
                    )}
                    <div className="flex ">
                      <h3 className=" font-bold">Bio: </h3>{" "}
                      <h3 className="mx-4">{bio}</h3>
                    </div>{" "}
                    <div className="card-actions my-10 justify-around">
                      <button
                        className="btn btn-primary p-5"
                        onClick={() =>
                          reviewRequest("accepted", request.fromUserId._id)
                        }
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-secondary p-5"
                        onClick={() =>
                          reviewRequest("rejected", request.fromUserId._id)
                        }
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-4xl bg-red-600 flex justify-center">
            No Requests found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Requests;
