import { Star, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import './EmailItem.css';

const EmailItem = ({ email, onSelect, onStar, onDelete, isSelected }) => {
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const today = new Date();
      const isToday = date.toDateString() === today.toDateString();
      
      return isToday 
        ? format(date, 'h:mm a') 
        : format(date, 'MMM d');
    } catch (error) {
      return '';
    }
  };

  const handleStarClick = (e) => {
    e.stopPropagation();
    onStar(email.mailId);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(email.mailId);
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

      {/* Sender Name - Updated to use senderName */}
      <div className="email-sender">
        {email.senderName || email.sender?.firstName + ' ' + email.sender?.lastName || 'Unknown'}
      </div>

      {/* Subject */}
      <div className="email-subject">
        {email.subject || '(no subject)'}
      </div>

      {/* Preview - Updated to use content */}
      <div className="email-preview">
        {(email.content || email.body || '')?.substring(0, 100)}
        {(email.content || email.body || '').length > 100 ? '...' : ''}
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
};

export default EmailItem;