import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  employees: [],
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      state.employees.push({
        id: nanoid(),
        ...action.payload,
      });
    },
    setEmployees: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.employees = action.payload;
      }
    },
  },
});

export const { addEmployee, setEmployees } = employeeSlice.actions;
export default employeeSlice.reducer;
