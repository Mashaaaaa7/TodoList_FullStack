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

// Ключ для localStorage
const STORAGE_KEY = "redux_todos";

// Загружаем сохраненные задачи
const loadInitialState = (): TodoState => {
    try {
        const savedTodos = localStorage.getItem(STORAGE_KEY);
        if (savedTodos) {
            const todos = JSON.parse(savedTodos);
            if (Array.isArray(todos)) {
                return {
                    todos,
                    filter: "all",
                };
            }
        }
    } catch (error) {
        console.error("Error loading todos from localStorage:", error);
    }

    return {
        todos: [],
        filter: "all",
    };
};

const initialState: TodoState = loadInitialState();

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
            // Сохраняем в localStorage
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state.todos));
        },
        removeTodo(state, action: PayloadAction<string>) {
            state.todos = state.todos.filter(t => t.id !== action.payload);
            // Сохраняем в localStorage
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state.todos));
        },
        toggleTodo(state, action: PayloadAction<string>) {
            const todo = state.todos.find(t => t.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
                // Сохраняем в localStorage
                localStorage.setItem(STORAGE_KEY, JSON.stringify(state.todos));
            }
        },
        setFilter(state, action: PayloadAction<Filter>) {
            state.filter = action.payload;
        },
    },
});

export const { addTodo, removeTodo, toggleTodo, setFilter } = todoSlice.actions;
export default todoSlice.reducer;