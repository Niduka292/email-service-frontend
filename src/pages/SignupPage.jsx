import { useState } from "react"
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import loginImage from "../assets/login-page-img.avif"

const SignupPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        gender: 'Male',
    });

    const [loading, setLoading] = useState(false);
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
            toast.error('Passwords do not match');
            return;
        }

        setLoading(true);

        const { confirmPassword, ...signupData } = formData;
        const result = await signup(signupData);

        if (result.success) {
            toast.success('Signup successsful! Please login');
            navigate('/login');
        } else {
            toast.error(result.error || 'Signup failed');
        }

        setLoading(false);
    };

    return (
        <div className="signup-page" style={{
            display: 'flex',
            minHeight: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '80px',
            padding: '20px',
            backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}>
            <div className="signup-form-container" style={{
                maxWidth: '400px',
                width: '100%',
                padding: '20px',
                backgroundColor: '#372a415e',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blue(10px)',
                boxShadow: '0px 0px 200px #5a2881ff'
            }}>
                <h1 style={{ marginBottom: '15px' }}>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '5px' }}>
                        <label>First Name:</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '8px', marginTop: '3px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '5px' }}>
                        <label>Last Name:</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '8px', marginTop: '3px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '5px' }}>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '8px', marginTop: '3px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '5px' }}>
                        <label>Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '8px', marginTop: '3px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '5px' }}>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength="6"
                            style={{ width: '100%', padding: '8px', marginTop: '3px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '5px' }}>
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '8px', marginTop: '3px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '25px' }}>
                        <label>Gender:</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '8px', marginTop: '3px' }}
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
                            width: '100%',
                            padding: '10px',
                            background: 'linear-gradient(135deg, rgba(0, 159, 29, 1) 0%, rgba(3, 155, 51, 0.76) 100%)',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            borderRadius: '5px'
                        }}
                    >
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>
                <p style={{ marginTop: '15px', textAlign: 'center' }}>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
            <div className="signup-page-img" style={{
                maxWidth: '500px',
                width: '100%'
            }}>
                <img
                    src={loginImage}
                    style={{
                        width: '90%',
                        height: 'auto',
                        objectFit: 'contain',
                        marginLeft: '65px'
                    }}
                />

            </div>
            <style>{`
                @media (max-width: 1024px) {
                    .signup-page-img {
                        display: none !important;
                    }
                }
                
            `}</style>
        </div>
    )

}

export default SignupPage;