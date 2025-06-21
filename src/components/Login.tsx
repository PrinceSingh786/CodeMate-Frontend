import { useState } from "react";
import "../index.css";
import { addUser } from "../Utils/userSlice.tsx";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../Utils/constants.tsx";
import { Link } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("prince.adams44@example.com");
  const [password, setPassword] = useState("K3vinPrince");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        API_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.user));
      return navigate("/");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
            error.response?.data?.error ||
            (typeof error.response?.data === "string"
              ? error.response.data
              : undefined) ||
            "Login failed. Please try again."
        );
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center bg-repeat-round bg-center min-h-screen" style={{backgroundImage:"url('https://t3.ftcdn.net/jpg/08/68/51/04/360_F_868510427_vsvN67LV1zSmLMyXMOFG05tRCmTAj1xL.jpg')"}}>
      <fieldset className="fieldset bg-white bg-opacity-95 border-base-300 rounded-box h-8/12 w-8/12 md:w-4/12 my-20 border p-4">
        <div className=" flex justify-center">
          <legend className="fieldset-legend font-bold  p-2 text-3xl my-2 ">
            Login
          </legend>
        </div>

        <label className="label text-xl text-black mt-5  font-bold">
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <h2 className=" bg-red-600 text-2xl">{error}</h2>
        <button
          onClick={handleLogin}
          className="btn text-2xl btn-neutral mt-3 p-1"
        >
          Login
        </button>
        <h1 className=" flex justify-center font-bold text-2xl my-5">Or</h1>
        <Link
          to="/signup"
          className="btn text-xl btn-neutral flex justify-center bg-black"
        >
          Sign Up
        </Link>
      </fieldset>
    </div>
  );
};

export default Login;
