import { useEffect } from "react";

const KeyboardShortcuts = ({
    onCompose,
    onReply,
    onDelete,
    onSearch,
    selectedEmail,
}) => {
    useEffect(() => {
        const handleKeyPress = (e) => {

            // Ignore if user is typing in input/textarea
            if(e.target.tagName === 'INPUT' || 
                e.target.tagName === 'TEXTAREA' ||
                e.isContentEditable
            ){
                return;
            }

            // Prevent default for shortcuts
            const shortcuts = ['c', 'r', 'd', '/'];
            if(shortcuts.includes(e.key.toLowerCase())){
                e.preventDefault();
            }

            switch(e.key.toLowerCase()){

                case 'c':
                    // Compose new mail
                    onCompose && onCompose();
                    break;
                
                case 'r':
                    // Reply to selected mail
                    if(selectedEmail && onReply){
                        onReply(selectedEmail);
                    }
                    break;

                case 'd':
                    // Delete selected mail
                    if(selectedEmail && onDelete){
                        onDelete(selectedEmail.mailId);
                    }
                    break;
                
                case '/':
                    // Focus search
                    onSearch && onSearch();
                    break;

                default:
                    break;
            }       
        };

        // Add event listener
        window.addEventListener('keydown',handleKeyPress);

        // Cleanup
        return() => {
            window.removeEventListener('keydown',handleKeyPress);
        };

    }, [selectedEmail, onCompose, onReply, onDelete, onSearch]);

    return null; // This component doesn't render anything
};

export default KeyboardShortcuts;