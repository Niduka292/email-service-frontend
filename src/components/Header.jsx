import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import './Header.css';
import { Menu, Search, LogOut, X } from 'lucide-react';

const Header = ({onMenuToggle, onSearch, searchQuery}) => {
    const {user, logout} = useAuth();
    const [localSearch, setLocalSearch] = useState(searchQuery || '');
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setLocalSearch(value);
        onSearch(value);
    };

    const handleClearSearch = () => {
        setLocalSearch('');
        onSearch('');
    }

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

            <div className={`header-search ${isSearchFocused ? 'focused' : ''}`}>
                <Search size={20} />
                <input
                type="text"
                placeholder="Search mail"
                className="search-input"
                value={localSearch}
                onChange={handleSearchChange}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                />
                {localSearch && (
                <button className="clear-search-btn" onClick={handleClearSearch}>
                    <X size={18} />
                </button>
                )}
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