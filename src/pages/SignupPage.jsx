import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import loginImage from "../assets/login-page-img.avif";

const SignupPage = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: "Male",
    });

    const [loading, setLoading] = useState(false);
    const [focusedInput, setFocusedInput] = useState("");
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);

        const { confirmPassword, ...signupData } = formData;
        const result = await signup(signupData);

        if (result.success) {
            toast.success("Signup successful! Please login");
            navigate("/login");
        } else {
            toast.error(result.error || "Signup failed");
        }

        setLoading(false);
    };

    return (
        <div
            className="signup-page"
            style={{
                display: "flex",
                // Keep minHeight for centering when content is smaller than viewport
                minHeight: "100vh", 
                alignItems: "center",
                justifyContent: "center",
                gap: "80px",
                padding: "40px",
                background:
                    "linear-gradient(135deg, #1a0b2e 0%, #2d1b4e 50%, #3d2463 100%)",
                position: "relative",
                // Keep overflow: hidden here to contain the ambient glow effects inside this div
                overflow: "hidden", 
            }}
        >
            {/* Ambient glow effects */}
            <div
                style={{
                    position: "absolute",
                    width: "600px",
                    height: "600px",
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(138, 43, 226, 0.15) 0%, transparent 70%)",
                    top: "-250px",
                    right: "-200px",
                    filter: "blur(80px)",
                    pointerEvents: "none",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    width: "500px",
                    height: "500px",
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(75, 0, 130, 0.2) 0%, transparent 70%)",
                    bottom: "-200px",
                    left: "-150px",
                    filter: "blur(80px)",
                    pointerEvents: "none",
                }}
            />

            <div
                className="signup-form-container"
                style={{
                    maxWidth: "440px",
                    width: "100%",
                    padding: "20px 45px",
                    background: "rgba(45, 27, 78, 0.6)",
                    borderRadius: "24px",
                    boxShadow:
                        "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(138, 43, 226, 0.2)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    position: "relative",
                    zIndex: 1,
                    border: "1px solid rgba(138, 43, 226, 0.15)",
                    // Add vertical margin to ensure the form is never cut off against the edge of the screen
                    margin: '20px 0',
                }}
            >
                {/* Decorative corner accents */}
                <div
                    style={{
                        position: "absolute",
                        top: "0",
                        left: "0",
                        width: "80px",
                        height: "80px",
                        borderTop: "2px solid rgba(138, 43, 226, 0.4)",
                        borderLeft: "2px solid rgba(138, 43, 226, 0.4)",
                        borderTopLeftRadius: "24px",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: "0",
                        right: "0",
                        width: "80px",
                        height: "80px",
                        borderBottom: "2px solid rgba(138, 43, 226, 0.4)",
                        borderRight: "2px solid rgba(138, 43, 226, 0.4)",
                        borderBottomRightRadius: "24px",
                    }}
                />

                <div style={{ marginBottom: "20px" }}>
                    <h1
                        style={{
                            margin: "0 0 10px 0",
                            fontSize: "48px",
                            fontWeight: "700",
                            color: "#ffffff",
                            letterSpacing: "-0.5px",
                        }}
                    >
                        Sign Up
                    </h1>
                    <div
                        style={{
                            width: "60px",
                            height: "4px",
                            background:
                                "linear-gradient(90deg, #8a2be2 0%, #9d4edd 100%)",
                            borderRadius: "2px",
                            marginTop: "12px",
                        }}
                    />
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "18px" }}>
                        <label
                            style={{
                                display: "block",
                                marginBottom: "8px",
                                fontSize: "14px",
                                fontWeight: "500",
                                color: "#e0d4f7",
                                letterSpacing: "0.3px",
                            }}
                        >
                            First Name:
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            onFocus={() => setFocusedInput("firstName")}
                            onBlur={() => setFocusedInput("")}
                            required
                            placeholder="Enter your first name"
                            style={{
                                width: "100%",
                                padding: "10px 16px",
                                border:
                                    focusedInput === "firstName"
                                        ? "2px solid #10b981"
                                        : "2px solid rgba(16, 185, 129, 0.3)",
                                borderRadius: "10px",
                                fontSize: "14px",
                                transition: "all 0.3s ease",
                                outline: "none",
                                backgroundColor: "rgba(255, 255, 255, 0.95)",
                                boxSizing: "border-box",
                                color: "#1a0b2e",
                                boxShadow:
                                    focusedInput === "firstName"
                                        ? "0 0 0 4px rgba(16, 185, 129, 0.1)"
                                        : "none",
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: "18px" }}>
                        <label
                            style={{
                                display: "block",
                                marginBottom: "8px",
                                fontSize: "14px",
                                fontWeight: "500",
                                color: "#e0d4f7",
                                letterSpacing: "0.3px",
                            }}
                        >
                            Last Name:
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            onFocus={() => setFocusedInput("lastName")}
                            onBlur={() => setFocusedInput("")}
                            required
                            placeholder="Enter your last name"
                            style={{
                                width: "100%",
                                padding: "10px 16px",
                                border:
                                    focusedInput === "lastName"
                                        ? "2px solid #10b981"
                                        : "2px solid rgba(16, 185, 129, 0.3)",
                                borderRadius: "10px",
                                fontSize: "14px",
                                transition: "all 0.3s ease",
                                outline: "none",
                                backgroundColor: "rgba(255, 255, 255, 0.95)",
                                boxSizing: "border-box",
                                color: "#1a0b2e",
                                boxShadow:
                                    focusedInput === "lastName"
                                        ? "0 0 0 4px rgba(16, 185, 129, 0.1)"
                                        : "none",
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: "18px" }}>
                        <label
                            style={{
                                display: "block",
                                marginBottom: "8px",
                                fontSize: "14px",
                                fontWeight: "500",
                                color: "#e0d4f7",
                                letterSpacing: "0.3px",
                            }}
                        >
                            Email:
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onFocus={() => setFocusedInput("email")}
                            onBlur={() => setFocusedInput("")}
                            required
                            placeholder="Enter your email"
                            style={{
                                width: "100%",
                                padding: "10px 16px",
                                border:
                                    focusedInput === "email"
                                        ? "2px solid #10b981"
                                        : "2px solid rgba(16, 185, 129, 0.3)",
                                borderRadius: "10px",
                                fontSize: "14px",
                                transition: "all 0.3s ease",
                                outline: "none",
                                backgroundColor: "rgba(255, 255, 255, 0.95)",
                                boxSizing: "border-box",
                                color: "#1a0b2e",
                                boxShadow:
                                    focusedInput === "email"
                                        ? "0 0 0 4px rgba(16, 185, 129, 0.1)"
                                        : "none",
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: "18px" }}>
                        <label
                            style={{
                                display: "block",
                                marginBottom: "8px",
                                fontSize: "14px",
                                fontWeight: "500",
                                color: "#e0d4f7",
                                letterSpacing: "0.3px",
                            }}
                        >
                            Username:
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            onFocus={() => setFocusedInput("username")}
                            onBlur={() => setFocusedInput("")}
                            required
                            placeholder="Choose a username"
                            style={{
                                width: "100%",
                                padding: "10px 16px",
                                border:
                                    focusedInput === "username"
                                        ? "2px solid #10b981"
                                        : "2px solid rgba(16, 185, 129, 0.3)",
                                borderRadius: "10px",
                                fontSize: "14px",
                                transition: "all 0.3s ease",
                                outline: "none",
                                backgroundColor: "rgba(255, 255, 255, 0.95)",
                                boxSizing: "border-box",
                                color: "#1a0b2e",
                                boxShadow:
                                    focusedInput === "username"
                                        ? "0 0 0 4px rgba(16, 185, 129, 0.1)"
                                        : "none",
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: "18px" }}>
                        <label
                            style={{
                                display: "block",
                                marginBottom: "5px",
                                fontSize: "14px",
                                fontWeight: "500",
                                color: "#e0d4f7",
                                letterSpacing: "0.3px",
                            }}
                        >
                            Password:
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            onFocus={() => setFocusedInput("password")}
                            onBlur={() => setFocusedInput("")}
                            required
                            minLength="6"
                            placeholder="Create a password (min 6 characters)"
                            style={{
                                width: "100%",
                                padding: "10px 16px",
                                border:
                                    focusedInput === "password"
                                        ? "2px solid #10b981"
                                        : "2px solid rgba(16, 185, 129, 0.3)",
                                borderRadius: "10px",
                                fontSize: "14px",
                                transition: "all 0.3s ease",
                                outline: "none",
                                backgroundColor: "rgba(255, 255, 255, 0.95)",
                                boxSizing: "border-box",
                                color: "#1a0b2e",
                                boxShadow:
                                    focusedInput === "password"
                                        ? "0 0 0 4px rgba(16, 185, 129, 0.1)"
                                        : "none",
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: "18px" }}>
                        <label
                            style={{
                                display: "block",
                                marginBottom: "8px",
                                fontSize: "14px",
                                fontWeight: "500",
                                color: "#e0d4f7",
                                letterSpacing: "0.3px",
                            }}
                        >
                            Confirm Password:
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            onFocus={() => setFocusedInput("confirmPassword")}
                            onBlur={() => setFocusedInput("")}
                            required
                            placeholder="Confirm your password"
                            style={{
                                width: "100%",
                                padding: "10px 16px",
                                border:
                                    focusedInput === "confirmPassword"
                                        ? "2px solid #10b981"
                                        : "2px solid rgba(16, 185, 129, 0.3)",
                                borderRadius: "10px",
                                fontSize: "14px",
                                transition: "all 0.3s ease",
                                outline: "none",
                                backgroundColor: "rgba(255, 255, 255, 0.95)",
                                boxSizing: "border-box",
                                color: "#1a0b2e",
                                boxShadow:
                                    focusedInput === "confirmPassword"
                                        ? "0 0 0 4px rgba(16, 185, 129, 0.1)"
                                        : "none",
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: "28px" }}>
                        <label
                            style={{
                                display: "block",
                                marginBottom: "6px",
                                fontSize: "14px",
                                fontWeight: "500",
                                color: "#e0d4f7",
                                letterSpacing: "0.3px",
                            }}
                        >
                            Gender:
                        </label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            onFocus={() => setFocusedInput("gender")}
                            onBlur={() => setFocusedInput("")}
                            style={{
                                width: "100%",
                                padding: "10px 16px",
                                border:
                                    focusedInput === "gender"
                                        ? "2px solid #10b981"
                                        : "2px solid rgba(16, 185, 129, 0.3)",
                                borderRadius: "10px",
                                fontSize: "14px",
                                transition: "all 0.3s ease",
                                outline: "none",
                                backgroundColor: "rgba(255, 255, 255, 0.95)",
                                boxSizing: "border-box",
                                color: "#1a0b2e",
                                cursor: "pointer",
                                boxShadow:
                                    focusedInput === "gender"
                                        ? "0 0 0 4px rgba(16, 185, 129, 0.1)"
                                        : "none",
                            }}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: "100%",
                            padding: "16px",
                            background: loading
                                ? "rgba(16, 185, 129, 0.5)"
                                : "linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)",
                            color: "white",
                            border: "none",
                            cursor: loading ? "not-allowed" : "pointer",
                            borderRadius: "12px",
                            fontSize: "16px",
                            fontWeight: "600",
                            transition: "all 0.3s ease",
                            boxShadow: loading
                                ? "none"
                                : "0 4px 20px rgba(16, 185, 129, 0.4), 0 0 0 1px rgba(16, 185, 129, 0.2)",
                            letterSpacing: "0.5px",
                        }}
                        onMouseEnter={(e) => {
                            if (!loading) {
                                e.target.style.transform = "translateY(-2px)";
                                e.target.style.boxShadow =
                                    "0 8px 25px rgba(16, 185, 129, 0.5), 0 0 0 1px rgba(16, 185, 129, 0.3)";
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!loading) {
                                e.target.style.transform = "translateY(0)";
                                e.target.style.boxShadow =
                                    "0 4px 20px rgba(16, 185, 129, 0.4), 0 0 0 1px rgba(16, 185, 129, 0.2)";
                            }
                        }}
                    >
                        {loading ? (
                            <span
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "10px",
                                }}
                            >
                                <span
                                    style={{
                                        width: "18px",
                                        height: "18px",
                                        border: "2px solid rgba(255, 255, 255, 0.3)",
                                        borderTopColor: "#ffffff",
                                        borderRadius: "50%",
                                        animation: "spin 0.7s linear infinite",
                                    }}
                                />
                                Signing up...
                            </span>
                        ) : (
                            "Sign Up"
                        )}
                    </button>
                </form>
                <div
                    style={{
                        marginTop: "28px",
                        paddingTop: "20px",
                        borderTop: "1px solid rgba(138, 43, 226, 0.2)",
                        textAlign: "center",
                    }}
                >
                    <p
                        style={{
                            margin: 0,
                            fontSize: "15px",
                            color: "#c4b5d9",
                        }}
                    >
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            style={{
                                color: "#9d4edd",
                                textDecoration: "none",
                                fontWeight: "600",
                                transition: "all 0.3s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.color = "#b57eeb";
                                e.target.style.textShadow =
                                    "0 0 8px rgba(138, 43, 226, 0.5)";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.color = "#9d4edd";
                                e.target.style.textShadow = "none";
                            }}
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
            <div
                className="signup-page-img"
                style={{
                    maxWidth: "550px",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    zIndex: 1,
                }}
            >
                <div
                    style={{
                        width: "100%",
                        maxWidth: "480px",
                        aspectRatio: "1",
                        background: "rgba(45, 27, 78, 0.4)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backdropFilter: "blur(10px)",
                        border: "2px solid rgba(120, 16, 185, 0.2)",
                        boxShadow:
                            "0 8px 40px rgba(0, 0, 0, 0.3), inset 0 0 60px rgba(106, 16, 185, 0.1)",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    {/* Animated rotating ring */}
                    <div
                        style={{
                            position: "absolute",
                            width: "90%",
                            height: "90%",
                            border: "2px solid transparent",
                            borderTopColor: "rgba(131, 16, 185, 0.4)",
                            borderRightColor: "rgba(123, 16, 185, 0.2)",
                            borderRadius: "50%",
                            animation: "rotate 10s linear infinite",
                        }}
                    />

                    <img
                        src={loginImage}
                        alt="Signup illustration"
                        style={{
                            width: "85%",
                            height: "85%",
                            objectFit: "cover",
                            borderRadius: "50%",
                            filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))",
                        }}
                    />
                </div>
            </div>
            <style>{`
                /* CRITICAL: Ensure the HTML and Body can correctly size and scroll content */
                html, body, #root {
                    height: 100%;
                    margin: 0;
                    padding: 0;
                    overflow-x: hidden; /* Prevent horizontal scrollbar issues */
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                @keyframes rotate {
                    to { transform: rotate(360deg); }
                }
                
                @media (max-width: 1024px) {
                    .signup-page {
                        /* On small screens, let content flow naturally, overriding the fixed height attempt */
                        min-height: auto !important;
                        /* Reset vertical centering so content starts from the top */
                        align-items: flex-start !important; 
                    }
                    .signup-page-img {
                        display: none !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default SignupPage;