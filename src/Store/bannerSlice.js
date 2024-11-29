import { createSlice } from "@reduxjs/toolkit";

const bannerSlice = createSlice({
  name: "banner",
  initialState: {
    dataBanner: [],
  },
  reducers: {
    handleDataBannerRedux: (state, action) => {
      state.dataBanner = action.payload;
    },
  },
});

export const { handleDataBannerRedux } = bannerSlice.actions;
export default bannerSlice.reducer;
