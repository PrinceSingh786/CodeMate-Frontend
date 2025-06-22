import { createSlice } from "@reduxjs/toolkit";

interface FeedItem {
  _id: string;
  name: string;
  bio: string;
  gender: string;
  age: number;
  photo?: string;
  [key: string]: unknown;
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
    clearFeed: () => [],
  },
});

export const { addFeed, removeFeed, clearFeed } = feedSlice.actions;

export default feedSlice.reducer;
