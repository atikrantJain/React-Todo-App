import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

interface tasks {
  id: string;
  title: string;
  status: string;
}

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state: { tasks: Array<tasks> }, action) => {
      state.tasks.push(action.payload);
    },
    deleteTodo: (state: { tasks: Array<tasks> }, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
    },
    updateTodo: (state: { tasks: Array<tasks> }, action) => {
      let { tasks }: { tasks: Array<any> } = state;
      state.tasks = tasks.map((item: any) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

export const { addTodo, deleteTodo, updateTodo } = todoSlice.actions;

export default todoSlice.reducer;
