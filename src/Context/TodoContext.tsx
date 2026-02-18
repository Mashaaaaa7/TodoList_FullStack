import React, { createContext, useContext, useReducer } from "react";

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
    | { type: "SET_FILTER"; payload: State["filter"] };

const initialState: State = {
    todos: [],
    filter: "all",
};

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "ADD":
            return {
                ...state,
                todos: [
                    ...state.todos,
                    { id: crypto.randomUUID(), title: action.payload, completed: false },
                ],
            };
        case "REMOVE":
            return {
                ...state,
                todos: state.todos.filter(t => t.id !== action.payload),
            };
        case "TOGGLE":
            return {
                ...state,
                todos: state.todos.map(t =>
                    t.id === action.payload
                        ? { ...t, completed: !t.completed }
                        : t
                ),
            };
        case "SET_FILTER":
            return { ...state, filter: action.payload };
        default:
            return state;
    }
}

const TodoContext = createContext<
    { state: State; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

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
