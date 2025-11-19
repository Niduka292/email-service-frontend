import { useState } from "react"
import EmailItem from "./EmailItem";
import './EmailList.css'

const EmailList = ({emails, onSelectEmail, onStarEmail, onDeleteEmail, loading}) => {
    const [selectedEmailId, setSelectedEmailId] = useState(null);
    
    const handleSelect = (e) => {
        setSelectedEmailId(email.mailId);
        onSelectEmail(email);
    }

    if(loading){
        return(
            <div className="email-list-loading">
                <p>Loading emails...</p>
            </div>
        );
    }

    if(!emails || emails.length === 0){
        return(
            <div className="email-list-empty">
                <p>No emails to display</p>
            </div>
        );
    }

    return(
        <div className="email-list">
        {emails.map((email) => (
            <EmailItem
            key={email.mailId}
            email={email}
            onSelect={handleSelect}
            onStar={onStarEmail}
            onDelete={onDeleteEmail}
            isSelected={selectedEmailId === email.mailId}
            />
        ))}
        </div>
    );
}

export default EmailList;