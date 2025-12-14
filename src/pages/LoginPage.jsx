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
    const [focusedInput, setFocusedInput] = useState('');
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
            gap: '80px',
            padding: '40px',
            background: 'linear-gradient(135deg, #1a0b2e 0%, #2d1b4e 50%, #3d2463 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Ambient glow effects */}
            <div style={{
                position: 'absolute',
                width: '600px',
                height: '600px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(138, 43, 226, 0.15) 0%, transparent 70%)',
                top: '-250px',
                right: '-200px',
                filter: 'blur(80px)',
                pointerEvents: 'none'
            }} />
            <div style={{
                position: 'absolute',
                width: '500px',
                height: '500px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(75, 0, 130, 0.2) 0%, transparent 70%)',
                bottom: '-200px',
                left: '-150px',
                filter: 'blur(80px)',
                pointerEvents: 'none'
            }} />

            <div className="login-form-container" style={{ 
                maxWidth: '440px', 
                width: '100%',
                padding: '50px 45px',
                background: 'rgba(45, 27, 78, 0.6)',
                borderRadius: '24px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(138, 43, 226, 0.2)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                position: 'relative',
                zIndex: 1,
                border: '1px solid rgba(138, 43, 226, 0.15)'
            }}>
                {/* Decorative corner accents */}
                <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '80px',
                    height: '80px',
                    borderTop: '2px solid rgba(138, 43, 226, 0.4)',
                    borderLeft: '2px solid rgba(138, 43, 226, 0.4)',
                    borderTopLeftRadius: '24px'
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: '0',
                    right: '0',
                    width: '80px',
                    height: '80px',
                    borderBottom: '2px solid rgba(138, 43, 226, 0.4)',
                    borderRight: '2px solid rgba(138, 43, 226, 0.4)',
                    borderBottomRightRadius: '24px'
                }} />

                <div style={{ marginBottom: '40px' }}>
                    <h1 style={{
                        margin: '0 0 10px 0',
                        fontSize: '48px',
                        fontWeight: '700',
                        color: '#ffffff',
                        letterSpacing: '-0.5px'
                    }}>Login</h1>
                    <div style={{
                        width: '60px',
                        height: '4px',
                        background: 'linear-gradient(90deg, #8a2be2 0%, #9d4edd 100%)',
                        borderRadius: '2px',
                        marginTop: '12px'
                    }} />
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '10px',
                            fontSize: '15px',
                            fontWeight: '500',
                            color: '#e0d4f7',
                            letterSpacing: '0.3px'
                        }}>
                            Username:
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={credentials.username}
                            onChange={handleChange}
                            onFocus={() => setFocusedInput('username')}
                            onBlur={() => setFocusedInput('')}
                            required
                            placeholder="Enter your username"
                            style={{
                                width: '100%',
                                padding: '14px 18px',
                                border: focusedInput === 'username' 
                                    ? '2px solid #8a2be2' 
                                    : '2px solid rgba(138, 43, 226, 0.3)',
                                borderRadius: '12px',
                                fontSize: '15px',
                                transition: 'all 0.3s ease',
                                outline: 'none',
                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                boxSizing: 'border-box',
                                color: '#1a0b2e',
                                boxShadow: focusedInput === 'username' 
                                    ? '0 0 0 4px rgba(138, 43, 226, 0.1)' 
                                    : 'none'
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '28px' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '10px',
                            fontSize: '15px',
                            fontWeight: '500',
                            color: '#e0d4f7',
                            letterSpacing: '0.3px'
                        }}>
                            Password:
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            onFocus={() => setFocusedInput('password')}
                            onBlur={() => setFocusedInput('')}
                            required
                            placeholder="Enter your password"
                            style={{
                                width: '100%',
                                padding: '14px 18px',
                                border: focusedInput === 'password' 
                                    ? '2px solid #8a2be2' 
                                    : '2px solid rgba(138, 43, 226, 0.3)',
                                borderRadius: '12px',
                                fontSize: '15px',
                                transition: 'all 0.3s ease',
                                outline: 'none',
                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                boxSizing: 'border-box',
                                color: '#1a0b2e',
                                boxShadow: focusedInput === 'password' 
                                    ? '0 0 0 4px rgba(138, 43, 226, 0.1)' 
                                    : 'none'
                            }}
                        />
                    </div>

                    {error && (
                        <div style={{
                            padding: '14px 18px',
                            marginBottom: '24px',
                            backgroundColor: 'rgba(220, 38, 38, 0.15)',
                            border: '1px solid rgba(220, 38, 38, 0.4)',
                            borderRadius: '12px',
                            color: '#fca5a5',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            animation: 'slideIn 0.3s ease',
                            backdropFilter: 'blur(10px)'
                        }}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}
                    
                    <button 
                        type="submit" 
                        disabled={loading}
                        style={{ 
                            width: '100%', 
                            padding: '16px',
                            background: loading 
                                ? 'rgba(138, 43, 226, 0.5)' 
                                : 'linear-gradient(135deg, #6b21ff 0%, #8a2be2 50%, #9d4edd 100%)',
                            color: 'white', 
                            border: 'none',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            borderRadius: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                            transition: 'all 0.3s ease',
                            boxShadow: loading 
                                ? 'none' 
                                : '0 4px 20px rgba(138, 43, 226, 0.4), 0 0 0 1px rgba(138, 43, 226, 0.2)',
                            letterSpacing: '0.5px'
                        }}
                        onMouseEnter={(e) => {
                            if (!loading) {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 8px 25px rgba(138, 43, 226, 0.5), 0 0 0 1px rgba(138, 43, 226, 0.3)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!loading) {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 20px rgba(138, 43, 226, 0.4), 0 0 0 1px rgba(138, 43, 226, 0.2)';
                            }
                        }}
                    >
                        {loading ? (
                            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                <span style={{
                                    width: '18px',
                                    height: '18px',
                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                    borderTopColor: '#ffffff',
                                    borderRadius: '50%',
                                    animation: 'spin 0.7s linear infinite'
                                }} />
                                Logging in...
                            </span>
                        ) : 'Login'}
                    </button>
                </form>
                <div style={{
                    marginTop: '32px',
                    paddingTop: '24px',
                    borderTop: '1px solid rgba(138, 43, 226, 0.2)',
                    textAlign: 'center'
                }}>
                    <p style={{ margin: 0, fontSize: '15px', color: '#c4b5d9' }}>
                        Don't have an account?{' '}
                        <Link to="/signup" style={{
                            color: '#9d4edd',
                            textDecoration: 'none',
                            fontWeight: '600',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.color = '#b57eeb';
                            e.target.style.textShadow = '0 0 8px rgba(138, 43, 226, 0.5)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.color = '#9d4edd';
                            e.target.style.textShadow = 'none';
                        }}
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
            
            <div className="login-page-img" style={{
                maxWidth: '550px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 1
            }}>
                <div style={{
                    width: '100%',
                    maxWidth: '480px',
                    aspectRatio: '1',
                    background: 'rgba(45, 27, 78, 0.4)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid rgba(138, 43, 226, 0.2)',
                    boxShadow: '0 8px 40px rgba(0, 0, 0, 0.3), inset 0 0 60px rgba(138, 43, 226, 0.1)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {/* Animated rotating ring */}
                    <div style={{
                        position: 'absolute',
                        width: '90%',
                        height: '90%',
                        border: '2px solid transparent',
                        borderTopColor: 'rgba(138, 43, 226, 0.4)',
                        borderRightColor: 'rgba(138, 43, 226, 0.2)',
                        borderRadius: '50%',
                        animation: 'rotate 10s linear infinite'
                    }} />
                    
                    <img 
                        src={loginImage}
                        alt="Login illustration"
                        style={{
                            width: '85%',
                            height: '85%',
                            objectFit: 'cover',
                            borderRadius: '50%',
                            filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))'
                        }}
                    />
                </div>
            </div>

            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                @keyframes rotate {
                    to { transform: rotate(360deg); }
                }
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
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