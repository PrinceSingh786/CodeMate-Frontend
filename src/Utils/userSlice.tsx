import { createSlice } from "@reduxjs/toolkit";

// Read user from localStorage if present and valid
let initialState = null;
const storedUser = localStorage.getItem("user");
if (storedUser && storedUser !== "undefined") {
  try {
    initialState = JSON.parse(storedUser);
  } catch {
    initialState = null;
  }
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (_state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload)); // persist user
      return action.payload;
    },
    removeUser: () => {
      localStorage.removeItem("user"); // remove user from storage
      return null;
    },
  },
});

export default userSlice.reducer;
export const { addUser, removeUser } = userSlice.actions;
