import { useEffect, useState } from "react";

export default function ApiTest() {
    const [message, setMessage] = useState("Connecting to backend...");

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/test/")
            .then((response) => response.json())
            .then((data) => {
                setMessage(data.message);
            })
            .catch((error) => {
                console.error("Backend connection error:", error);
                setMessage("Backend connection failed");
            });
    }, []);

    return (
        <div>
            <h2>{message}</h2>
        </div>
    );
}