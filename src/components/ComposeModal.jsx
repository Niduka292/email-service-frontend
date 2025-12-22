import { useState, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import './ComposeModal.css';

const ComposeModal = ({ isOpen, onClose, onSend, replyTo = null }) => {
  console.log('ComposeModal render - isOpen:', isOpen, 'replyTo:', replyTo);
  
  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    body: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Update form data when replyTo changes or modal opens
  useEffect(() => {
    if (isOpen) {
      if (replyTo) {
        console.log('Setting reply data:', replyTo);
        const originalBody = replyTo.content || replyTo.body || '';
        const senderName = replyTo.senderName || 
          (replyTo.sender ? `${replyTo.sender.firstName} ${replyTo.sender.lastName}` : 'Unknown');
        
        setFormData({
          to: replyTo.senderEmail || replyTo.sender?.email || '',
          subject: `Re: ${replyTo.subject || ''}`,
          body: replyTo.aiBody || '',
        });
      } else {
        console.log('Setting empty form data');
        setFormData({
          to: '',
          subject: '',
          body: '',
        });
      }
      setErrors({});
    }
  }, [isOpen, replyTo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('Input changed:');
    console.log('  - Field name:', name);
    console.log('  - New value:', value);
    console.log('  - Value length:', value.length);
    
    const newFormData = {
        ...formData,
        [name]: value,
    };
    
    console.log('  - Updated formData:', newFormData);
    
    setFormData(newFormData);
    
    // Clear error for this field
    if (errors[name]) {
        setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.to.trim()) {
      newErrors.to = 'Recipient email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.to)) {
      newErrors.to = 'Invalid email format';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.body.trim()) {
      newErrors.body = 'Message body is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    if (!validate()) {
      console.log('Validation failed:', errors);
      return;
    }
    
    setLoading(true);
    
    try {
      await onSend(formData);
      // Reset form
      setFormData({ to: '', subject: '', body: '' });
      onClose();
    } catch (error) {
      console.error('Send failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (formData.to || formData.subject || formData.body) {
      if (window.confirm('Discard this draft?')) {
        setFormData({ to: '', subject: '', body: '' });
        setErrors({});
        onClose();
      }
    } else {
      onClose();
    }
  };

  const handleOverlayClick = (e) => {
    // Only close if clicking directly on overlay, not on modal content
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  console.log('Rendering compose modal with formData:', formData);

  return (
    <div className="compose-modal-overlay" onClick={handleOverlayClick}>
      <div className="compose-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="compose-header">
          <h3>{replyTo ? 'Reply' : 'New Message'}</h3>
          <button className="close-btn" onClick={handleClose} type="button">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* To Field */}
          <div className="compose-field">
            <label htmlFor="to-input">To:</label>
            <input
              id="to-input"
              type="text"
              name="to"
              value={formData.to}
              onChange={handleChange}
              placeholder="recipient@example.com"
              disabled={loading}
              autoComplete="off"
            />
            {errors.to && <span className="error-text">{errors.to}</span>}
          </div>

          {/* Subject Field */}
          <div className="compose-field">
            <label htmlFor="subject-input">Subject:</label>
            <input
              id="subject-input"
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Email subject"
              disabled={loading}
              autoComplete="off"
            />
            {errors.subject && <span className="error-text">{errors.subject}</span>}
          </div>

          {/* Body Field */}
          <div className="compose-field compose-body-field">
            <label htmlFor="body-input" style={{ display: 'none' }}>Message:</label>
            <textarea
              id="body-input"
              name="body"
              value={formData.body}
              onChange={handleChange}
              placeholder="Type your message here..."
              rows={12}
              disabled={loading}
            />
            {errors.body && <span className="error-text">{errors.body}</span>}
          </div>

          {/* Footer */}
          <div className="compose-footer">
            <button 
              type="submit" 
              className="send-btn"
              disabled={loading}
            >
              <Send size={18} />
              {loading ? 'Sending...' : 'Send'}
            </button>
            <button 
              type="button" 
              className="discard-btn"
              onClick={handleClose}
              disabled={loading}
            >
              Discard
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default ComposeModal;