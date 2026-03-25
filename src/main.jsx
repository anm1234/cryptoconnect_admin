import React, { useState } from "react";
import LoginForm from "../components/loginForm";
import { createRoot } from "react-dom/client";
import Access from "../components/users";
import "./style.css";

function App() {
    const [proceed, setProceed] = useState(false);

    return (
        <>
            {proceed ? (
                <Access />
            ) : (
                <div id="login">
                    <form>
                        <LoginForm setProceed={setProceed} />
                    </form>
                </div>
            )}
        </>
    );
}

createRoot(document.getElementById('root')).render(<App />);