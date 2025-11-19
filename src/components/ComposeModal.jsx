import { useState } from "react";
import { X, Send } from 'lucide-react';
import './ComposeModal.css';

const ComposeModal = ({ isOpen, onClose, onSend, replyTo = null }) => {
  const [formData, setFormData] = useState({
    to: replyTo?.senderEmail || replyTo?.sender?.email || '',
    subject: replyTo ? `Re: ${replyTo.subject}` : '',
    body: replyTo 
      ? `\n\n--- Original Message ---\nFrom: ${replyTo.senderName || replyTo.sender?.firstName + ' ' + replyTo.sender?.lastName}\nDate: ${new Date(replyTo.sentAt).toLocaleString()}\n\n${replyTo.content || replyTo.body}` 
      : '',
  });

    const [loading,setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const {mame, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if(errors[name]){
            setErrors({ ...errors, [name]: ''});
        }
    };

    const validate = () => {
        const newErrors = {};

        if(!formData.to.trim()){
            newErrors.to = 'Recipient is required';
        }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.to)){
            newErrors.to = 'Invalid email format';
        }

        if(!formData.subject.trim()){
            newErrors.subject = 'Subject is required';
        }

        if(!formData.body.trim()){
            newErrors.body = 'Message body is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors). length === 0
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!validate){
            return;
        }

        setLoading(true);

        try{
            await onSend(formData);

            setFormData({to: '', subject: '', body: ''});
            onClose();


        }catch(error){
            console.error('Failed to send: ',error);
        }finally{
            setLoading(false);
        }
    };

    const handleClose = () => {
        if(window.confirm('Discard this draft?')){
            setFormData({to: '', subject: '', body: ''});
            setErrors({});
            onClose();
        }
    };

    if (!isOpen) return null;

    return(
        <div className="compose-modal-overlay" onClick={handleClose}>
            <div className="compose-modal" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="compose-header">
                <h3>{replyTo ? 'Reply' : 'New Message'}</h3>
                <button className="close-btn" onClick={handleClose}>
                    <X size={20} />
                </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                {/* To Field */}
                <div className="compose-field">
                    <label>To:</label>
                    <input
                    type="text"
                    name="to"
                    value={formData.to}
                    onChange={handleChange}
                    placeholder="recipient@example.com"
                    disabled={loading}
                    />
                    {errors.to && <span className="error-text">{errors.to}</span>}
                </div>

                {/* Subject Field */}
                <div className="compose-field">
                    <label>Subject:</label>
                    <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Email subject"
                    disabled={loading}
                    />
                    {errors.subject && <span className="error-text">{errors.subject}</span>}
                </div>

                {/* Body Field */}
                <div className="compose-field">
                    <textarea
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
}

export default ComposeModal;