import { createSlice } from "@reduxjs/toolkit";
interface Request {
  _id: string;
  fromUserId: {
    _id: string;
    name: string;
    age: number;
    gender: string;
    bio: string;
    photo?: string;
    // add other fields as needed
  };
  // add other fields as needed
}
const initialState: Request[] = [];
const requestSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    addRequests: (_state, action) => action.payload,
    removeRequest: (state, action) => {
      const newArray = state.filter((r) => r.fromUserId._id !== action.payload);
      return newArray;
    },
  },
});

export const { addRequests, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
