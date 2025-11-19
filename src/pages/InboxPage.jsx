import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import mailService from '../services/mailService';
import EmailList from '../components/EmailList';
import EmailViewer from '../components/EmailViewer';
import ComposeModal from '../components/ComposeModal';
import toast from 'react-hot-toast';
import { Plus } from 'lucide-react';
import './InboxPage.css';

const InboxPage = () => {
  console.log('InboxPage component is rendering!');
  
  const { user, logout } = useAuth();
  
  console.log('👤 User from context:', user);
  
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [replyTo, setReplyTo] = useState(null);

  // Fetch inbox on mount
  useEffect(() => {
    console.log('User in useEffect:', user);
    
    if (user && user.userId) {
      console.log('User exists, fetching inbox for userId:', user.userId);
      fetchInbox();
    } else {
      console.error('No user or userId found:', user);
      setLoading(false);
    }
  }, [user]);

  const fetchInbox = async () => {
    console.log('fetchInbox called');
    try {
      setLoading(true);
      console.log('Making API call to getInbox...');
      
      const response = await mailService.getInbox(user.userId);
      
      console.log('API Response received:', response);
      console.log('Response.data:', response.data);
      console.log('Type of response.data:', typeof response.data);
      console.log('Is Array?:', Array.isArray(response.data));
      
      if (response.data && Array.isArray(response.data)) {
        console.log('Setting emails, count:', response.data.length);
        setEmails(response.data);
        console.log('setEmails called with:', response.data);
      } else {
        console.warn('Response data is not an array:', response.data);
        setEmails([]);
      }
    } catch (error) {
      console.error('Error in fetchInbox:', error);
      console.error('Error response:', error.response);
      toast.error('Failed to load inbox');
      setEmails([]);
    } finally {
      setLoading(false);
      console.log('Loading set to false');
    }
  };

  const handleSelectEmail = async (email) => {
    console.log('Email selected:', email);
    setSelectedEmail(email);
    
    if (!email.isRead) {
      try {
        await mailService.markAsRead(email.mailId, user.userId);
        setEmails(emails.map(e => 
          e.mailId === email.mailId ? { ...e, isRead: true } : e
        ));
      } catch (error) {
        console.error('Failed to mark as read', error);
      }
    }
  };

  const handleStarEmail = async (mailId) => {
    try {
      await mailService.toggleStar(mailId, user.userId);
      setEmails(emails.map(e => 
        e.mailId === mailId ? { ...e, isStarred: !e.isStarred } : e
      ));
      if (selectedEmail?.mailId === mailId) {
        setSelectedEmail({ ...selectedEmail, isStarred: !selectedEmail.isStarred });
      }
      toast.success('Updated');
    } catch (error) {
      toast.error('Failed to update');
    }
  };

  const handleDeleteEmail = async (mailId) => {
    try {
      await mailService.deleteMail(mailId, user.userId);
      setEmails(emails.filter(e => e.mailId !== mailId));
      if (selectedEmail?.mailId === mailId) {
        setSelectedEmail(null);
      }
      toast.success('Moved to trash');
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const handleCloseViewer = () => {
    setSelectedEmail(null);
  };

  const handleCompose = () => {
    setReplyTo(null);
    setIsComposeOpen(true);
  };

  const handleReply = (email) => {
    setReplyTo(email);
    setIsComposeOpen(true);
  };

  const handleSendEmail = async (mailData) => {
    try {
      await mailService.sendMail(user.userId, {
        recipientEmail: mailData.to,
        subject: mailData.subject,
        body: mailData.body,
      });
      
      toast.success('Email sent successfully!');
      setIsComposeOpen(false);
      setReplyTo(null);
    } catch (error) {
      toast.error('Failed to send email');
      throw error;
    }
  };

  const handleCloseCompose = () => {
    setIsComposeOpen(false);
    setReplyTo(null);
  };

  console.log('🎨 About to render. Emails:', emails, 'Length:', emails.length, 'Loading:', loading);

  return (
    <div className="inbox-page">
      <div className="inbox-header">
        <h1>Inbox</h1>
        <div className="inbox-header-actions">
          <button className="compose-btn" onClick={handleCompose}>
            <Plus size={20} />
            Compose
          </button>
          <span>Welcome, {user?.username}</span>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </div>

      
      <div className="inbox-content">
        <div className="email-list-container">
          {console.log('Passing to EmailList - emails:', emails, 'loading:', loading)}
          <EmailList
            emails={emails}
            onSelectEmail={handleSelectEmail}
            onStarEmail={handleStarEmail}
            onDeleteEmail={handleDeleteEmail}
            loading={loading}
          />
        </div>

        {selectedEmail && (
          <div className="email-viewer-container">
            <EmailViewer
              email={selectedEmail}
              onClose={handleCloseViewer}
              onStar={handleStarEmail}
              onDelete={handleDeleteEmail}
              onReply={handleReply}
            />
          </div>
        )}
      </div>

      <ComposeModal
        isOpen={isComposeOpen}
        onClose={handleCloseCompose}
        onSend={handleSendEmail}
        replyTo={replyTo}
      />
    </div>
  );
};

export default InboxPage;