import { createSlice } from "@reduxjs/toolkit";

interface User {
  _id: string;
  name: string;
  age: number;
  gender: string;
  bio: string;
  photo?: string;
  // add other fields as needed
}

const initialState: User[] = [];

const connectionsSlice = createSlice({
  name: "connections",
  initialState,
  reducers: {
    addConnection: (_state, action) => action.payload,

    removeConnection: () => [],
  },
});

export const { addConnection, removeConnection } = connectionsSlice.actions;

export default connectionsSlice.reducer;
