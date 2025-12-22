import { X, Star, Trash2, Reply } from 'lucide-react';
import { format } from 'date-fns';
import './EmailViewer.css';

const EmailViewer = ({ email, onClose, onStar, onDelete, onReply, summary, summaryLoading, suggestionsLoading, suggestions }) => {
  if (!email) return null;

  const formatFullDate = (dateString) => {
    try {
      return format(new Date(dateString), 'PPpp');
    } catch (error) {
      return dateString;
    }
  };

  // Get sender info - handle both formats
  const senderName = email.senderName ||
    (email.sender ? `${email.sender.firstName} ${email.sender.lastName}` : 'Unknown');

  const senderEmail = email.senderEmail || email.sender?.email || '';

  // Get sender initials for avatar
  const getInitials = () => {
    if (email.senderName) {
      const parts = email.senderName.split(' ');
      return parts.length >= 2
        ? parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
        : parts[0].charAt(0);
    }
    if (email.sender) {
      return (email.sender.firstName?.charAt(0) || '') + (email.sender.lastName?.charAt(0) || '');
    }
    return 'U';
  };

  // Get email body - handle both 'content' and 'body' fields
  const emailBody = email.content || email.body || '';

  return (
    <div className="email-viewer">
      {/* Header */}
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

      {/* Subject */}
      <h2 className="email-viewer-subject">{email.subject || '(no subject)'}</h2>

      {/* Sender Info */}
      <div className="email-viewer-sender">
        <div className="sender-avatar">
          {getInitials()}
        </div>
        <div className="sender-info">
          <div className="sender-name">
            {senderName}
          </div>
          <div className="sender-email">
            &lt;{senderEmail}&gt;
          </div>
        </div>
        <div className="email-date">
          {formatFullDate(email.sentAt)}
        </div>
      </div>

      {/* Recipients - Only show if available */}
      {email.recipients && email.recipients.length > 0 && (
        <div className="email-recipients">
          <span className="recipients-label">To:</span>
          <span className="recipients-list">
            {email.recipients.map(r => `${r.firstName} ${r.lastName}`).join(', ')}
          </span>
        </div>
      )}

      {/* AI Summary Display*/}
      {(summaryLoading || summary) && (
        <div className="ai-summary-box">
          {summaryLoading ? (
            <p className="loading-text">Generating AI Summary...</p>
          ) : (
            <>
              <p className="summary-label">
                🧠AI Summary:
              </p>
              <div className="summary-content">
                {summary}
              </div>
            </>
          )}
        </div>
      )}

      <div className="smart-replies-container">
        {suggestionsLoading ? (
          <span className="loading-dots">Finding replies...</span>
        ) : (
          suggestions?.map((text, index) => (
            <button
              key={index}
              className="reply-chip"
              onClick={() => onReply(email, text)} // Pass text to reply function
            >
              {text}
            </button>
          ))
        )}
      </div>

      {/* Body */}
      <div className="email-viewer-body">
        {emailBody}
      </div>
    </div>
  );
};

export default EmailViewer;