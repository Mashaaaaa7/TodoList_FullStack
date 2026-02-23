import { useState, useEffect } from "react";
import { ContextWrapper } from "./Components/ContextWrapper";
import { ReduxWrapper } from "./Components/ReduxWrapper";
import React from "react";

export default function App() {
    // Загружаем сохраненный режим из localStorage или используем "context" по умолчанию
    const [mode, setMode] = useState<"context" | "redux">(() => {
        const savedMode = localStorage.getItem("appMode");
        return (savedMode === "context" || savedMode === "redux") ? savedMode : "context";
    });

    // Сохраняем режим при изменении
    useEffect(() => {
        localStorage.setItem("appMode", mode);
    }, [mode]);

    return (
        <div className="app-wrapper">
            <div className="switcher">
                <button
                    className={mode === "context" ? "active" : ""}
                    onClick={() => setMode("context")}
                >
                    Context API
                </button>
                <button
                    className={mode === "redux" ? "active" : ""}
                    onClick={() => setMode("redux")}
                >
                    Redux Toolkit
                </button>
            </div>

            {mode === "context" ? <ContextWrapper /> : <ReduxWrapper />}
        </div>
    );
}