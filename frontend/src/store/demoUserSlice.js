import { createSlice } from "@reduxjs/toolkit";

const initialPassword = localStorage.getItem('demoPassword') || "Password123!";

export const demoUserSlice = createSlice({
  name: "demoUser",
  initialState: {
    password: initialPassword,
  },
  reducers: {
    updatePassword: (state, action) => {
      state.password = action.payload;
      localStorage.setItem('demoPassword', action.payload); 
    },
  },
});

export const { updatePassword } = demoUserSlice.actions;

export default demoUserSlice.reducer;
