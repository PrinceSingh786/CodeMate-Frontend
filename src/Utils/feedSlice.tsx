import { createSlice } from "@reduxjs/toolkit";

interface FeedItem {
  _id: string;
  name: string;
  bio: string;
  gender: string;
  age: number;
  photo?: string;
  [key: string]: any;
}

const feedSlice = createSlice({
  name: "feed",
  initialState: [] as FeedItem[],
  reducers: {
    addFeed: (_state, action) => action.payload,

    removeFeed: (state, action) => {
      const newArray = state.filter((r) => r._id !== action.payload);
      return newArray;
    },
  },
});

export const { addFeed, removeFeed } = feedSlice.actions;

export default feedSlice.reducer;
