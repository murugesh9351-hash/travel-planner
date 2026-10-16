import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (password !== password2) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/register/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username,
                        email,
                        password,
                        password2,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                if (data.email) {
                    setError(data.email[0]);
                } else if (data.username) {
                    setError(data.username[0]);
                } else if (data.password) {
                    setError(data.password[0]);
                } else if (data.password2) {
                    setError(data.password2[0]);
                } else if (data.detail) {
                    setError(data.detail);
                } else {
                    setError("Registration failed.");
                }

                return;
            }

            setSuccess("Registration successful! Redirecting to login...");

            setTimeout(() => {
                navigate("/login");
            }, 1000);
        } catch (err) {
            console.error("Registration error:", err);
            setError("Unable to connect to the server.");
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        width: "100%",
        padding: "13px 14px",
        marginTop: "8px",
        border: "1px solid #d1d5db",
        borderRadius: "10px",
        boxSizing: "border-box",
        fontSize: "15px",
        backgroundColor: "#f9fafb",
    };

    const labelStyle = {
        display: "block",
        fontSize: "14px",
        fontWeight: "600",
        color: "#374151",
    };

    return (
        <main
            style={{
                minHeight: "calc(100vh - 80px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px 20px",
                background:
                    "linear-gradient(135deg, #fff1f2 0%, #fef2f2 45%, #f3f4f6 100%)",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "460px",
                    background: "#ffffff",
                    borderRadius: "20px",
                    padding: "35px",
                    boxSizing: "border-box",
                    boxShadow: "0 15px 40px rgba(0, 0, 0, 0.12)",
                }}
            >
                <div style={{ textAlign: "center", marginBottom: "28px" }}>
                    <div
                        style={{
                            width: "64px",
                            height: "64px",
                            margin: "0 auto 15px",
                            borderRadius: "50%",
                            background: "#fee2e2",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "30px",
                        }}
                    >
                        ✈️
                    </div>

                    <h1
                        style={{
                            margin: 0,
                            fontSize: "30px",
                            fontWeight: "800",
                            color: "#1f2937",
                        }}
                    >
                        Join Trip Buddy
                    </h1>

                    <p
                        style={{
                            marginTop: "8px",
                            color: "#6b7280",
                            fontSize: "15px",
                        }}
                    >
                        Create your account and start exploring
                    </p>
                </div>

                <form onSubmit={handleRegister}>
                    <div style={{ marginBottom: "18px" }}>
                        <label style={labelStyle}>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            required
                            style={inputStyle}
                        />
                    </div>

                    <div style={{ marginBottom: "18px" }}>
                        <label style={labelStyle}>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            style={inputStyle}
                        />
                    </div>

                    <div style={{ marginBottom: "18px" }}>
                        <label style={labelStyle}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Minimum 8 characters"
                            required
                            minLength={8}
                            style={inputStyle}
                        />
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                        <label style={labelStyle}>Confirm Password</label>
                        <input
                            type="password"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            placeholder="Enter your password again"
                            required
                            minLength={8}
                            style={inputStyle}
                        />
                    </div>

                    {error && (
                        <div
                            style={{
                                marginBottom: "18px",
                                padding: "12px 14px",
                                borderRadius: "10px",
                                background: "#fef2f2",
                                border: "1px solid #fecaca",
                                color: "#dc2626",
                                fontSize: "14px",
                            }}
                        >
                            {error}
                        </div>
                    )}

                    {success && (
                        <div
                            style={{
                                marginBottom: "18px",
                                padding: "12px 14px",
                                borderRadius: "10px",
                                background: "#f0fdf4",
                                border: "1px solid #bbf7d0",
                                color: "#15803d",
                                fontSize: "14px",
                            }}
                        >
                            {success}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: "100%",
                            padding: "14px",
                            border: "none",
                            borderRadius: "10px",
                            background: loading ? "#fca5a5" : "#ef4444",
                            color: "#ffffff",
                            fontSize: "16px",
                            fontWeight: "700",
                            cursor: loading ? "not-allowed" : "pointer",
                        }}
                    >
                        {loading ? "Creating account..." : "Create Account"}
                    </button>
                </form>

                <div
                    style={{
                        marginTop: "25px",
                        paddingTop: "20px",
                        borderTop: "1px solid #e5e7eb",
                        textAlign: "center",
                        fontSize: "14px",
                        color: "#6b7280",
                    }}
                >
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        style={{
                            color: "#ef4444",
                            fontWeight: "700",
                            textDecoration: "none",
                        }}
                    >
                        Login
                    </Link>
                </div>
            </div>
        </main>
    );
}