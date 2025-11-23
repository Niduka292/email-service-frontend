import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import mailService from '../services/mailService';
import EmailList from '../components/EmailList';
import EmailViewer from '../components/EmailViewer';
import ComposeModal from '../components/ComposeModal';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import toast from 'react-hot-toast';
import { Plus } from 'lucide-react';
import './InboxPage.css';

const InboxPage = () => {
  const { user } = useAuth();
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const [currentFolder, setCurrentFolder] = useState('inbox');
  const [unreadCount, setUnreadCount] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Fetch emails when folder changes
  useEffect(() => {
    if (user && user.userId) {
      fetchEmails(currentFolder);
      fetchUnreadCount();
    }
  }, [currentFolder, user]);

  const fetchEmails = async (folder) => {
    try {
      setLoading(true);
      let response;

      switch (folder) {
        case 'inbox':
          response = await mailService.getInbox(user.userId);
          break;
        case 'sent':
          response = await mailService.getSentMails(user.userId);
          break;
        case 'trash':
          response = await mailService.getTrash(user.userId);
          break;
        case 'starred':
          // Filter starred from inbox for now
          response = await mailService.getInbox(user.userId);
          response.data = response.data.filter(email => email.isStarred);
          break;
        default:
          response = await mailService.getInbox(user.userId);
      }

      setEmails(response.data || []);
    } catch (error) {
      toast.error(`Failed to load ${folder}`);
      console.error(error);
      setEmails([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const response = await mailService.getUnreadCount(user.userId);
      setUnreadCount(response.data || 0);
    } catch (error) {
      console.error('Failed to fetch unread count:', error);
    }
  };

  const handleFolderChange = (folder) => {
    setCurrentFolder(folder);
    setSelectedEmail(null);
  };

  const handleSelectEmail = async (email) => {
    setSelectedEmail(email);
    
    if (!email.isRead && currentFolder === 'inbox') {
      try {
        await mailService.markAsRead(email.mailId, user.userId);
        setEmails(emails.map(e => 
          e.mailId === email.mailId ? { ...e, isRead: true } : e
        ));
        fetchUnreadCount();
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
      fetchUnreadCount();
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
      const payload = {
        recipientEmail: mailData.to,
        subject: mailData.subject,
        content: mailData.body,
      };
      
      await mailService.sendMail(user.userId, payload);
      
      toast.success('Email sent successfully!');
      setIsComposeOpen(false);
      setReplyTo(null);
      
      // Refresh if in sent folder
      if (currentFolder === 'sent') {
        fetchEmails('sent');
      }
    } catch (error) {
      toast.error('Failed to send email');
      throw error;
    }
  };

  const handleCloseCompose = () => {
    setIsComposeOpen(false);
    setReplyTo(null);
  };

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const getFolderTitle = () => {
    const titles = {
      inbox: 'Inbox',
      sent: 'Sent',
      trash: 'Trash',
      starred: 'Starred',
    };
    return titles[currentFolder] || 'Inbox';
  };

  return (
    <div className="inbox-page">
      <Header onMenuToggle={handleMenuToggle} />

      <div className="inbox-main">
        {sidebarOpen && (
          <Sidebar
            currentFolder={currentFolder}
            onFolderChange={handleFolderChange}
            unreadCount={unreadCount}
          />
        )}

        <div className="inbox-content-wrapper">
          {/* Compose Button */}
          <div className="content-header">
            <h2 className="folder-title">{getFolderTitle()}</h2>
            <button className="compose-fab" onClick={handleCompose}>
              <Plus size={24} />
              <span>Compose</span>
            </button>
          </div>

          {/* Email List and Viewer */}
          <div className="inbox-content">
            <div className="email-list-container">
              <EmailList
                emails={emails}
                onSelectEmail={handleSelectEmail}
                onStarEmail={handleStarEmail}
                onDeleteEmail={handleDeleteEmail}
                loading={loading}
              />
            </div>

            
            <div className="email-viewer-container">
                <EmailViewer
                  email={selectedEmail}
                  onClose={handleCloseViewer}
                  onStar={handleStarEmail}
                  onDelete={handleDeleteEmail}
                  onReply={handleReply}
                />
            </div>
          </div>
        </div>
      </div>

      {/* Compose Modal */}
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