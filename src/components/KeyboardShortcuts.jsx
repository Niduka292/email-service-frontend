import { useEffect } from "react";

const KeyboardShortcuts = ({
    onCompose,
    onReply,
    onDelete,
    onSearch,
    onStar,
    selectedMail,
}) =>{

    useEffect(() => {
        const handleKeypress = (e) => {
            
            if(e.target.tagName === 'INPUT' || 
                e.target.tagName === 'TEXTAREA' ||
                e.target.isContentEditable
            ){
                return;
            }

            const shortcuts = ['c', 'd', 'r', '/', '*', '?'];
            if(shortcuts.includes(e.key.toLowerCase())){
                e.preventDefault();
            }

            switch(e.key.toLowerCase()){
                case 'c':
                    onCompose && onCompose();
                    break;
                case 'd':
                    if(selectedMail && onDelete){
                        onDelete(selectedMail.mailId);
                    }
                    break;
                case 'r':
                    if(selectedMail && onReply){
                        onReply(selectedMail);
                    }
                    break;
                case '/':
                    onSearch && onSearch();
                    break;
                case '*':
                    if(selectedMail && onStar){
                        onStar(selectedMail.mailId);
                    }
                    break;
                case '?':
                    alert(`
                        Keyboard Shortcuts:
━━━━━━━━━━━━━━━━━━━━━━━━━

C - Compose new email
R - Reply to email
D - Delete email
/ - Focus search
* - Star/ Unstar email
? - Show this help
                        `);
                    break;
                default:
                    break;
            }
        };

        // Add event listener
        window.addEventListener('keydown', handleKeypress);

        return () => {
            window.removeEventListener('keydown', handleKeypress);
        };
    }, [onCompose, onDelete, onReply, onSearch, onStar, selectedMail]);

    return null;
}

export default KeyboardShortcuts;