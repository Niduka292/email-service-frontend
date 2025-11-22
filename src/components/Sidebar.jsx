import { Inbox, Send, Trash2, Star, Archive } from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({currentFolder, onFolderChange, unreadCount = 0}) => {
    const menuItems = [
        {id: 'inbox', label: 'Inbox', icon: Inbox, badge: unreadCount},
        { id: 'sent', label: 'Sent', icon: Send },
        { id: 'starred', label: 'Starred', icon: Star },
        { id: 'trash', label: 'Trash', icon: Trash2 },
    ];

    return(
        <div className="sidebar">
            <div className="sidebar-menu">
                {menuItems.map((item) => (
                <button
                    key={item.id}
                    className={`sidebar-item ${currentFolder === item.id ? 'active' : ''}`}
                    onClick={() => onFolderChange(item.id)}
                >
                    <item.icon size={20} />
                    <span className="sidebar-label">{item.label}</span>
                    {item.badge > 0 && (
                    <span className="sidebar-badge">{item.badge}</span>
                    )}
                </button>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;