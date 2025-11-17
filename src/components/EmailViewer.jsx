import {X, Star, Trash2, Reply } from 'lucide-react';
import {format} from 'date-fns';
import './EmailViewer.css';

const EmailViewer = ({ email, onClose, onStar, onDelete, onReply }) => {
  if(!email){
    return null;
  } 

  const formatFullDate = (dateString) => {
    return format(new Date(dateString), 'PPpp'); // e.g., "Apr 29, 2023 at 3:45 PM"
  };

  return (
    <div className="email-viewer">
      <div className="email-viewer-header">
        <div className="email-viewer-actions">
          <button onClick={() => onStar(email.mailId)} title="Star">
            <Star size={20} fill={email.isStarred ? '#f4b400' : 'none'} />
          </button>
          <button onClick={() => onDelete(email.mailId)} title="Delete">
            <Trash2 size={20} />
          </button>
          <button onClick={() => onReply(email)} title="Reply">
            <Reply size={20} />
          </button>
        </div>
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>
      </div>

      <h2 className="email-viewer-subject">{email.subject || '(no subject)'}</h2>

      <div className="email-viewer-sender">
        <div className="sender-avatar">
          {email.sender?.firstName?.charAt(0)}{email.sender?.lastName?.charAt(0)}
        </div>
        <div className="sender-info">
          <div className="sender-name">
            {email.sender?.firstName} {email.sender?.lastName}
          </div>
          <div className="sender-email">
            &lt;{email.sender?.email}&gt;
          </div>
        </div>
        <div className="email-date">
          {formatFullDate(email.sentAt)}
        </div>
      </div>

      <div className="email-recipients">
        <span className="recipients-label">To:</span>
        <span className="recipients-list">
          {email.recipients?.map(r => `${r.firstName} ${r.lastName}`).join(', ')}
        </span>
      </div>

      <div className="email-viewer-body">
        {email.body}
      </div>
    </div>
  );
};

export default EmailViewer;