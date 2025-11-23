import { useState } from "react"
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

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
    const {signup} = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(formData.password !== formData.confirmPassword){
            toast.error('Passwords do not match');
            return;
        }

        setLoading(true);

        const {confirmPassword, ...signupData} = formData;
        const result = await signup(signupData);

        if(result.success){
            toast.success('Signup successsful! Please login');
            navigate('/login');
        }else{
            toast.error(result.error || 'Signup failed');
        }

        setLoading(false);
    };

    return(
        <div style={{ maxWidth: '400px', margin: '5px auto', padding: '8px' }}>
            <h1 style={{marginBottom: '15px'}}>Sign Up</h1>
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
                    background: '#28a745', 
                    color: 'white', 
                    border: 'none',
                    cursor: 'pointer'
                }}
                >
                {loading ? 'Signing up...' : 'Sign Up'}
                </button>
            </form>
            <p style={{ marginTop: '15px', textAlign: 'center' }}>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    )

}

export default SignupPage;