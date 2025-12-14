import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import loginImage from "../assets/login-page-img.avif"

const LoginPage = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setError('');
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setLoading(true);
        setError('');

        const result = await login(credentials);

        if(result.success){
            toast.success('Login successful');
            navigate('/inbox');
        }else{
            const errorMsg = result.error || 'Invalid username or password';
            setError(errorMsg);
            toast.error(errorMsg, {
                duration: 5000,
                position: 'top-right',
            });
        }

        setLoading(false);
        return false;
    };

    return(
        <div className="login-page" style={{
            display: 'flex',
            minHeight: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '40px',
            padding: '20px'
        }}>
            <div className="login-form-container" style={{ 
                maxWidth: '400px', 
                width: '100%',
                padding: '20px',
                backgroundColor: '#171D21',
                borderRadius: '12px',
                boxShadow: '0px 0px 90px #360a57ff'
            }}>
                <h1 style={{marginBottom: '20px', fontSize: '50px'}}>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={credentials.username}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        />
                    </div>

                    {error && (
                        <div style={{
                            padding: '12px',
                            marginBottom: '20px',
                            backgroundColor: '#fef2f2',
                            border: '1px solid #fecaca',
                            borderRadius: '6px',
                            color: '#dc2626',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <span>⚠️</span>
                            <span>{error}</span>
                        </div>
                    )}
                    
                    <button 
                        type="submit" 
                        disabled={loading}
                        style={{ 
                            width: '100%', 
                            padding: '10px', 
                            background: 'linear-gradient(135deg, rgb(0, 98, 255) 0%, rgb(110, 46, 143) 100%)', 
                            color: 'white', 
                            border: 'none',
                            cursor: 'pointer',
                            borderRadius: '5px',
                            marginTop: '15px',
                            fontSize: '16px'
                        }}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p style={{ marginTop: '15px', textAlign: 'center' }}>
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
            </div>
            
            <div className="login-page-img" style={{
                maxWidth: '500px',
                width: '100%'
            }}>
                <img 
                    src={loginImage}
                    style={{
                        width: '90%',
                        height: 'auto',
                        objectFit: 'contain',
                        marginLeft: '80px'
                    }}
                />
            </div>
            <style>{`
                @media (max-width: 1024px) {
                    .login-page-img {
                        display: none !important;
                    }
                }
                
            `}</style>
        </div>
    );
};

export default LoginPage;
