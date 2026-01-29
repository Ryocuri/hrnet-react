import { createSlice } from '@reduxjs/toolkit';

// Load initial state from localStorage
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('employees');
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error('Error loading employees from localStorage:', e);
    return [];
  }
};

// Save state to localStorage
const saveToLocalStorage = (employees) => {
  try {
    const serializedState = JSON.stringify(employees);
    localStorage.setItem('employees', serializedState);
  } catch (e) {
    console.error('Error saving employees to localStorage:', e);
  }
};

const initialState = {
  employees: loadFromLocalStorage(),
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      state.employees.push(action.payload);
      saveToLocalStorage(state.employees);
    },
    removeEmployee: (state, action) => {
      state.employees = state.employees.filter(
        (_, index) => index !== action.payload
      );
      saveToLocalStorage(state.employees);
    },
    updateEmployee: (state, action) => {
      const { index, employee } = action.payload;
      state.employees[index] = employee;
      saveToLocalStorage(state.employees);
    },
    clearAllEmployees: (state) => {
      state.employees = [];
      saveToLocalStorage(state.employees);
    },
  },
});

export const { addEmployee, removeEmployee, updateEmployee, clearAllEmployees } = employeeSlice.actions;

export const selectEmployees = (state) => state.employees.employees;

export default employeeSlice.reducer;