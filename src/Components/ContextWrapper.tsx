import React from "react";
import {TodoProvider, useTodo} from "../Context/TodoContext";
import {TodoBoard} from "./TodoBoard";


const Inner = () => {
    const { state, dispatch } = useTodo();

    return (
        <TodoBoard
            todos={state.todos}
            add={(title) => dispatch({ type: "ADD", payload: title })}
            remove={(id) => dispatch({ type: "REMOVE", payload: id })}
            toggle={(id) => dispatch({ type: "TOGGLE", payload: id })}
        />
    );
};

export const ContextWrapper = () => (
    <TodoProvider>
        <Inner />
    </TodoProvider>
);