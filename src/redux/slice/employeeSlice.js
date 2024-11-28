import { createSlice, nanoid } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
  name: "employee",
  initialState: JSON.parse(localStorage.getItem("employees")) || [],
  reducers: {
    addEmployee: (state, action) => {
      state.push({
        id: nanoid(),
        ...action.payload,
      });
      localStorage.setItem("employees", JSON.stringify(state));
    },
  },
});

export const { addEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
