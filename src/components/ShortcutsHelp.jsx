import { X, Command } from 'lucide-react';
import './ShortcutsHelp.css';
import { useEffect } from 'react';

const ShortcutsHelp = ({ isOpen, onClose }) => {

    // Add effect for closing with Escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const shortcuts = [
        { key: 'C', description: 'Compose new email', category: 'Actions' },
        { key: 'R', description: 'Reply to selected email', category: 'Actions' },
        { key: 'D', description: 'Delete selected email', category: 'Actions' },
        { key: '*', description: 'Star/Unstar email', category: 'Actions' },
        { key: '/', description: 'Focus search', category: 'Navigation' },
        { key: '?', description: 'Show this help', category: 'Help' },
    ];

    const groupedShortcuts = shortcuts.reduce((acc, shortcut) => {
        if (!acc[shortcut.category]) {
            acc[shortcut.category] = [];
        }
        acc[shortcut.category].push(shortcut);
        return acc;
    }, {});

    return (
        <div className="shortcuts-overlay" onClick={onClose}>
            <div className="shortcuts-modal" onClick={(e) => e.stopPropagation()}>
                <div className="shortcuts-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Command size={24} />
                        <h2>Keyboard Shortcuts</h2>
                    </div>
                    <button className="close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="shortcuts-content">
                    {Object.entries(groupedShortcuts).map(([category, shortcuts]) => (
                        <div key={category} className="shortcuts-category">
                            <h3>{category}</h3>
                            <div className="shortcuts-list">
                                {shortcuts.map((shortcut, index) => (
                                    <div key={index} className="shortcut-item">
                                        <kbd className="shortcut-key">{shortcut.key}</kbd>
                                        <span className="shortcut-description">{shortcut.description}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="shortcuts-footer">
                    <p>Press <kbd>?</kbd> anytime to toggle this menu</p>
                </div>
            </div>
        </div>
    );
};

export default ShortcutsHelp;