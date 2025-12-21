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
import KeyboardShortcuts from '../components/KeyboardShortcuts';
import ShortcutsHelp from '../components/ShortcutsHelp';

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
  const [filteredEmails, setFilteredEmails] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false);
  const [summaryData, setSummaryData] = useState(null);
  const [summaryDataLoading, setSummaryDataLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(null);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);

  // Fetch emails when folder changes
  useEffect(() => {
    if (user && user.userId) {
      fetchEmails(currentFolder);
      fetchUnreadCount();
    }
  }, [currentFolder, user]);

  // Filter emails when searchQuery changes
  useEffect(() => {
    if((searchQuery || '').trim() === ''){
      setFilteredEmails(emails);
    }else{
      const query = searchQuery.toLowerCase();
      const filtered = emails.filter(email => {
        const subject = (email.subject || '').toLowerCase();
        const body = (email.content || email.body || '').toLowerCase();
        const senderName = (email.senderName || '').toLowerCase();
        const senderEmail = (email.senderEmail || '').toLowerCase();


        return subject.includes(query) ||
          body.includes(query) ||
          senderName.includes(query) ||
          senderEmail.includes(query);
      });
      setFilteredEmails(filtered);
    }
  }, [searchQuery, emails]);

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
      setFilteredEmails(response.data || []);
    } catch (error) {
      toast.error(`Failed to load ${folder}`);
      console.error(error);
      setEmails([]);
      setFilteredEmails([]);
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
    setSearchQuery('');
  };

  const handleSelectEmail = async (email) => {
    setSelectedEmail(email);

    const markAsReadPromise = (async () => {
      if(!email.isRead && currentFolder === 'inbox'){
        try{
          await mailService.markAsRead(email.mailId, user.userId);
          setEmails(emails.map(e => 
            e.mailId === email.mailId ? { ...e, isRead: true } : e
          ));
          fetchUnreadCount();
        }catch(error) {
          console.error('Failed to mark as read', error);
        }
      }
    })();

    const summaryPromise = fetchSummary(email.mailId);
    const suggestionsPromise = fetchSuggestions(email.mailId);

    try{
      await Promise.all([markAsReadPromise, summaryPromise, suggestionsPromise]);
    }catch(error){
      console.error("An issue occurred during email processing, summarization or AI reply generation.", error);
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

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFocusSearch = () => {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
      searchInput.focus();
    }
  };

  const fetchSummary = async (mailId) => {
    if(!mailId){
      return;
    }

    try{
      setSummaryDataLoading(true);
      setSummaryData(null); // Clear any previous summary

      const summaryText = await mailService.getSummary(mailId);
      setSummaryData(summaryText);
    }catch(error){
      console.error("AI summary error: ",error);
      setSummaryData("AI summary unavailable.");
    }finally{
      setSummaryDataLoading(false);
    }
  };

  const fetchSuggestions = async (mailId) => {
    setSuggestionsLoading(true);
    try{
      const data =  await mailService.getSuggestions(mailId);
      setSuggestions(data);
    }catch(error){
      setSuggestions([]);
    }finally{
      setSuggestionsLoading(false);
    }
  };

  return (
    <div className="inbox-page">
      <Header onMenuToggle={handleMenuToggle}
        onSearch={handleSearch}
        searchQuery={searchQuery}
      />

      <KeyboardShortcuts
        onCompose={handleCompose}
        onReply={handleReply}
        onDelete={handleDeleteEmail}
        onSearch={handleFocusSearch}
        onStar={handleStarEmail}
        selectedMail={selectedEmail}
        onShowHelp={() => setShowShortcutsHelp(true)}
      />

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
                emails={filteredEmails}
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
                  summary={summaryData}
                  summaryLoading={summaryDataLoading}
                />
              </div>
            )}
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
      <ShortcutsHelp
        isOpen={showShortcutsHelp}
        onClose={() => setShowShortcutsHelp(false)}
      />
    </div>
  );
};

export default InboxPage;