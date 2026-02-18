import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Todo = {
    id: string;
    title: string;
    completed: boolean;
};

type Filter = "all" | "active" | "done";

type TodoState = {
    todos: Todo[];
    filter: Filter;
};

const initialState: TodoState = {
    todos: [],
    filter: "all",
};

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<string>) {
            state.todos.push({
                id: crypto.randomUUID(),
                title: action.payload,
                completed: false,
            });
        },
        removeTodo(state, action: PayloadAction<string>) {
            state.todos = state.todos.filter(t => t.id !== action.payload);
        },
        toggleTodo(state, action: PayloadAction<string>) {
            const todo = state.todos.find(t => t.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        setFilter(state, action: PayloadAction<Filter>) {
            state.filter = action.payload;
        },
    },
});

export const { addTodo, removeTodo, toggleTodo, setFilter } = todoSlice.actions;
export default todoSlice.reducer;