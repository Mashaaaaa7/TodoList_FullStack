import { useSelector, useDispatch } from "react-redux";
import React from "react";
import {AppDispatch, RootState} from "../store";
import {addTodo, removeTodo, toggleTodo} from "../Redux/features/todoSlice";
import {TodoBoard} from "./TodoBoard";


export const ReduxWrapper = () => {
    const todos = useSelector((state: RootState) => state.todo.todos);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <TodoBoard
            todos={todos}
            add={(title) => dispatch(addTodo(title))}
            remove={(id) => dispatch(removeTodo(id))}
            toggle={(id) => dispatch(toggleTodo(id))} //переключает статус между выполнено-не выполнено
        />
    );
};
