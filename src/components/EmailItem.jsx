import { format } from "date-fns";
import {Star, Trash2} from 'lucide-react';
import './EmailItem.css';

const EmialItem = ({email, onSelect, onStar, onDelete, isSelected}) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        const isToday = today.toDateString() === date.toDateString();

        return isToday? format(date, 'h: mm a') : format(date, 'MMM d');

    };

    const handleStarClick = (e) => {
        e.stopPropagation(); // Don't trigger email selection
        onStar(email.maiilId);
    }

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        onDelete(email.maiilId);
    };

    return (
        <div 
      className={`email-item ${!email.isRead ? 'unread' : ''} ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(email)}
        >
        {/* Star Icon */}
            <button 
                className={`star-btn ${email.isStarred ? 'starred' : ''}`}
                onClick={handleStarClick}
            >
                <Star size={18} fill={email.isStarred ? '#f4b400' : 'none'} />
            </button>

            {/* Sender Name */}
            <div className="email-sender">
                {email.sender?.firstName} {email.sender?.lastName}
            </div>

            {/* Subject */}
            <div className="email-subject">
                {email.subject || '(no subject)'}
            </div>

            {/* Preview */}
            <div className="email-preview">
                {email.body?.substring(0, 100)}...
            </div>

            {/* Date */}
            <div className="email-date">
                {formatDate(email.sentAt)}
            </div>

            {/* Delete Button */}
            <button 
                className="delete-btn"
                onClick={handleDeleteClick}
            >
                <Trash2 size={18} />
            </button>
        </div>
    );

}

export default EmialItem;