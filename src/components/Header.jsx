import { useAuth } from "../context/AuthContext";
import './Header.css';
import { Menu, Search, LogOut } from 'lucide-react';

const Header = ({onMenuToggle}) => {
    const {user, logout} = useAuth();

    return(
        <div className="header">
            <div className="header-left">
                <button className="menu-btn" onClick={onMenuToggle}>
                <Menu size={24} />
                </button>
                <div className="header-logo">
                <span className="logo-text">Email App</span>
                </div>
            </div>

            <div className="header-search">
                <Search size={20} />
                <input
                type="text"
                placeholder="Search mail"
                className="search-input"
                />
            </div>

            <div className="header-right">
                <div className="user-info">
                <div className="user-avatar">
                    {user?.username?.charAt(0).toUpperCase()}
                </div>
                <span className="user-name">{user?.username}</span>
                </div>
                <button className="logout-btn" onClick={logout} title="Logout">
                <LogOut size={20} />
                </button>
            </div>
        </div>
    );
};

export default Header;