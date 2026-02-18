import { useState } from "react";
import {ContextWrapper} from "./Components/ContextWrapper";
import {ReduxWrapper} from "./Components/ReduxWrapper";
import React from "react";


export default function App() {
    const [mode, setMode] = useState<"context" | "redux">("context");

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
