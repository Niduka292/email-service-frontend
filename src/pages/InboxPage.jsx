import { useAuth } from "../context/AuthContext"

const InboxPage = () => {
    const {user, logout} = useAuth();

    return (
        <div style={{ padding: '20px' }}>
            <h1>Inbox</h1>
            <p>Welcome, {user?.username}!</p>
            <button onClick={logout} style={{ padding: '10px', marginTop: '10px' }}>
                Logout
            </button>
            <p style={{ marginTop: '20px' }}>
                Inbox content will be displayed here...
            </p>
        </div>
    );
}

export default InboxPage;