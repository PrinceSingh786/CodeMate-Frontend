import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { API_URL } from "../Utils/constants";
import axios from "axios";
import { addUser } from "../Utils/userSlice";
import { useDispatch } from "react-redux";
const SignIn = () => {
  const [toast, settoast] = useState(false);
  const [name, setname] = useState("");
  const dispatch = useDispatch();
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState("");
  const navigate = useNavigate();
  const handleSignIn = async () => {
    try {
      const res = await axios.post(
        API_URL + "/signup",
        { name, email, password },
        { withCredentials: true }
      );

      //save user to localStorage and redux
      dispatch(addUser(res.data.user));
      setTimeout(() => {
        settoast(false);
        navigate("/");
      }, 2000);
    } catch (err) {
      //Logic for error handling
      seterror("Sign In Failed !" + err);
    }
  };
  return (
    <div className="flex justify-center bg-blue-400   ">
      {toast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Data saved successfully.</span>
          </div>
          <div className="alert alert-success bg-amber-400">
            <span>Redirecting to the homepage .</span>
          </div>
        </div>
      )}
      <fieldset className="fieldset bg-white  border-base-300 rounded-box w-8/12 md:w-4/12  my-20 border p-4">
        <div className=" flex justify-center">
          <legend className="fieldset-legend font-bold  p-2 text-3xl my-2 ">
            Sign Up
          </legend>
        </div>
        <label className="label text-xl text-black mt-2  font-bold">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setname(e.target.value)}
          className="input w-full mb-5 "
          placeholder="Name"
        />

        <label className="label text-xl text-black mt-2  font-bold">
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          className="input w-full mb-5 "
          placeholder="Email"
        />

        <label className="label text-xl font-bold text-black">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input w-full "
          placeholder="Password"
        />

        {error && <h1 className="text-xl bg-red-600">{error}</h1>}
        <button
          type="button"
          onClick={handleSignIn}
          className="btn text-xl btn-neutral flex justify-center bg-black"
        >
          Sign Up
        </button>
        <h1 className=" flex justify-center font-bold text-2xl my-5">Or</h1>
        <Link
          to="/login"
          className="btn text-xl btn-neutral flex justify-center bg-black"
        >
          Login
        </Link>
      </fieldset>
    </div>
  );
};

export default SignIn;
