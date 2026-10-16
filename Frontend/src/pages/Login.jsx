import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await fetch("http://127.0.0.1:8000/api/login/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: username.trim(),
                    password: password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(
                    data.non_field_errors?.[0] ||
                    data.detail ||
                    "Invalid username or password."
                );
                return;
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            navigate("/");
        } catch (err) {
            console.error("Login error:", err);
            setError("Unable to connect to the server.");
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        width: "100%",
        padding: "12px",
        marginTop: "8px",
        marginBottom: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxSizing: "border-box",
    };

    return (
        <div
            style={{
                maxWidth: "400px",
                margin: "80px auto",
                padding: "30px",
                background: "white",
                borderRadius: "15px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            }}
        >
            <h1 style={{ textAlign: "center", marginBottom: "10px" }}>
                ✈️ Trip Buddy
            </h1>

            <p style={{ textAlign: "center", color: "#666", marginBottom: "30px" }}>
                Login to your account
            </p>

            <form onSubmit={handleLogin}>
                <label>Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    required
                    style={inputStyle}
                />

                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                    style={inputStyle}
                />

                {error && (
                    <p
                        style={{
                            color: "red",
                            background: "#fff0f0",
                            padding: "10px",
                            borderRadius: "8px",
                        }}
                    >
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "13px",
                        background: "#ef4444",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        fontWeight: "bold",
                        fontSize: "16px",
                        cursor: "pointer",
                    }}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>

            <p style={{ textAlign: "center", marginTop: "25px" }}>
                Don't have an account?{" "}
                <Link to="/register" style={{ color: "#ef4444", fontWeight: "bold" }}>
                    Register
                </Link>
            </p>
        </div>
    );
}