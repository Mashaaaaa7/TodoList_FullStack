import React, { useState } from "react";

export type Todo = {
    id: string;
    title: string;
    completed: boolean;
};

type Props = {
    todos: Todo[];
    add: (title: string) => void;
    remove: (id: string) => void;
    toggle: (id: string) => void;
};

export const TodoBoard: React.FC<Props> = ({ todos, add, remove, toggle }) => {
    const [input, setInput] = useState("");
    const done = todos.filter((t) => t.completed).length;

    return (
        <div className="card">
            <h1>Task Flow</h1>

            <div style={{ display: "flex", gap: 10 }}>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Добавить задачу..."
                    style={{ flex: 1, padding: 10, borderRadius: 8 }}
                />
                <button
                    onClick={() => {
                        if (input.trim()) {
                            add(input);
                            setInput("");
                        }
                    }}
                >
                    Добавить задачу
                </button>
            </div>

            <div style={{ marginTop: 20 }}>
                {todos.map((todo) => (
                    <div
                        key={todo.id}
                        className={`todo-item ${todo.completed ? "completed" : ""}`}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 10,
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggle(todo.id)}
                            />
                            <span>{todo.title}</span>
                        </div>

                        <button
                            className="delete-btn"
                            onClick={() => remove(todo.id)}
                        >
                            Удалить
                        </button>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: 10 }}>
                Completed: {done} / {todos.length}
            </div>
        </div>
    );
};