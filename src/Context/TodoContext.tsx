import React, { createContext, useContext, useReducer, useEffect } from "react";

export type Todo = {
    id: string;
    title: string;
    completed: boolean;
};

type State = {
    todos: Todo[];
    filter: "all" | "active" | "done";
};

type Action =
    | { type: "ADD"; payload: string }
    | { type: "REMOVE"; payload: string }
    | { type: "TOGGLE"; payload: string }
    | { type: "SET_FILTER"; payload: State["filter"] }
    | { type: "LOAD_TODOS"; payload: Todo[] };

const initialState: State = {
    todos: [],
    filter: "all",
};

// Ключ для localStorage
const STORAGE_KEY = "context_todos";

function reducer(state: State, action: Action): State {
    let newState: State;

    switch (action.type) {
        case "ADD":
            newState = {
                ...state,
                todos: [
                    ...state.todos,
                    { id: crypto.randomUUID(), title: action.payload, completed: false },
                ],
            };
            break;
        case "REMOVE":
            newState = {
                ...state,
                todos: state.todos.filter(t => t.id !== action.payload),
            };
            break;
        case "TOGGLE":
            newState = {
                ...state,
                todos: state.todos.map(t =>
                    t.id === action.payload
                        ? { ...t, completed: !t.completed }
                        : t
                ),
            };
            break;
        case "SET_FILTER":
            newState = { ...state, filter: action.payload };
            break;
        case "LOAD_TODOS":
            newState = { ...state, todos: action.payload };
            break;
        default:
            return state;
    }

    // Сохраняем в localStorage после каждого изменения (кроме загрузки)
    if (action.type !== "LOAD_TODOS") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState.todos));
    }

    return newState;
}

const TodoContext = createContext<
    { state: State; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Загружаем сохраненные задачи при монтировании
    useEffect(() => {
        const savedTodos = localStorage.getItem(STORAGE_KEY);
        if (savedTodos) {
            try {
                const todos = JSON.parse(savedTodos);
                if (Array.isArray(todos)) {
                    dispatch({ type: "LOAD_TODOS", payload: todos });
                }
            } catch (error) {
                console.error("Error loading todos from localStorage:", error);
            }
        }
    }, []);

    return (
        <TodoContext.Provider value={{ state, dispatch }}>
            {children}
        </TodoContext.Provider>
    );
};

export const useTodo = () => {
    const ctx = useContext(TodoContext);
    if (!ctx) throw new Error("useTodo must be inside TodoProvider");
    return ctx;
};