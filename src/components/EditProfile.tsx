import { useState } from "react";
import "../index.css";
import UserCard from "./UserCard";
import { API_URL } from "../Utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";
interface User {
  age: number;
  _id?: string;
  bio: string;
  name: string;
  photo?: string;
  gender: string;
  // add other fields if needed
}

const EditProfile = ({ user }: { user: User }) => {
  const [name, setname] = useState(user.name);
  const [age, setage] = useState<number>(user.age);
  const [gender, setgender] = useState(user.gender);
  const [bio, setbio] = useState(user.bio);
  const [photo, setphoto] = useState(user.photo);
  const [error, seterror] = useState("");
  const [toastdata, settoastdata] = useState(false);
  const dispatch = useDispatch();

  const saveprofile = async () => {
    seterror("");

    try {
      const res = await axios.patch(
        API_URL + "/profile/edit",
        { name, age: Number(age), gender, bio, photo },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res?.data?.data));
      settoastdata(true);
      setTimeout(() => {
        settoastdata(false);
      }, 3000);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        seterror(
          error.response?.data?.message ||
            error.response?.data?.error ||
            (typeof error.response?.data === "string"
              ? error.response.data
              : undefined) ||
            error.message ||
            "An error occurred."
        );
      } else if (error instanceof Error) {
        seterror(error.message);
      } else {
        seterror("An unknown error occurred.");
      }
    }
  };
  return (
    user && (
      <div className="flex justify-center my-10">
        {toastdata && (
          <div className="toast toast-top toast-center">
            <div className="alert alert-success">
              <span>Profile data saved successfully.</span>
            </div>
          </div>
        )}

        <div className="w-6/12">
          <fieldset className="fieldset bg-black w-6/12 text-amber-50  border-base-300 rounded-box   border p-4">
            <h1 className="flex justify-center text-2xl">Edit Profile</h1>

            <label className="label text-xl font-bold">Name </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
                seterror("");
              }}
              className="input w-full bg-gray-800 text-amber-50"
              placeholder={name}
            />

            <label className="label text-xl font-bold ">Age {age} xyz</label>
            <input
              type="number"
              value={age}
              onChange={(e) => {
                setage(Number(e.target.value));
                seterror(""); // Clear error when editing
              }}
              className="input w-full bg-gray-800 text-amber-50"
              placeholder={age.toString()}
            />

            <label className="label text-xl font-bold">Gender</label>
            <input
              type="text"
              value={gender}
              onChange={(e) => {
                setgender(e.target.value);
                seterror("");
              }}
              className="input w-full bg-gray-800 text-amber-50"
              placeholder={gender}
            />

            <label className="label text-xl font-bold">Bio</label>
            <input
              type="text"
              value={bio}
              onChange={(e) => {
                setbio(e.target.value);
                seterror("");
              }}
              className="input w-full bg-gray-800 text-amber-50"
              placeholder={bio}
            />
            <label className="label text-xl font-bold">Photo Url</label>
            <input
              type="text"
              value={photo}
              onChange={(e) => {
                setphoto(e.target.value);
                seterror("");
              }}
              className="input w-full bg-gray-800 text-amber-50"
              placeholder={photo}
            />
            {error && <p className="text-red-500">{error}</p>}
            <button
              onClick={saveprofile}
              className="text-2xl font-bold cursor-pointer bg-blue-600 p-2"
            >
              Save Profile
            </button>
          </fieldset>
        </div>
        <div>
          <div className="flex justify-center">
            {" "}
            <h1 className="font-bold text-3xl">Preview</h1>
          </div>
          <UserCard
            user={{ _id: user._id || "preview", name, age, gender, bio, photo }}
          />
        </div>
      </div>
    )
  );
};

export default EditProfile;
