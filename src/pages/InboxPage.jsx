import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"
import mailService from "../services/mailService";
import EmailList from '../components/EmailList';
import EmailViewer from '../components/EmailViewer';
import toast from "react-hot-toast";
import './InboxPage.css';

const InboxPage = () => {
    const {user, logout} = useAuth();
    const [emails, setEmails] = useState([]);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInbox();
    }, []);

    const fetchInbox = async () => {
        try{
            setLoading(true);
            const response = mailService.getInbox(user.userId);
            setEmails(response.data || []);
        }catch(error){
            toast.error('Failed to load inbox');
            console.error(error);
        }finally{
            setLoading(false);
        }
    };

    const handleSelectEmail = async (email) => {
        setSelectedEmail(email);

        // Mark as read if not
        if(!email.isRead){
            try{
                await mailService.markAsRead(email.mailId, user.userId);

                setEmails(emails.map(e => 
                    e.mailId === email.mailId ? {...e, isRead: true} : e
                ));
            }catch(error){
                console.error('Failed to mark as read ',error);
                
            }
        }
    };

    const handleStarEmail = async (mailId) => {

        try{
            await mailService.toggleStar(mailId, user.userId);
            setEmails(emails.map(e => 
                e.mailId === mailId ? {...e, isStarred: !e.isStarred} : e
            ));
            if(selectedEmail?.mailId === mailId){
                setSelectedEmail({...selectedEmail, isStarred: !selectedEmail.isStarred});
            }

            toast.success('Updated');
        }catch(error){
            toast.error('Failed to update');
        }
    };

    const handleDeleteEmail = async (mailId) => {
        try{
            await mailService.deleteMail(mailId, user.userId);
            setEmails(emails.filter(e => e.mailId !== mailId));
            if(selectedEmail?.mailId === mailId){
                selectedEmail(null);
            }
            toast.success('Moved to trash');
        }catch(error){
            toast.error('Failed to delete');
        }
    };

    const handleCloseViewer = () => {
        setSelectedEmail(null);
    };

    const handleReply = (email) => {
        // TODO: Open compose modal with reply context
    }

    return (
        <div className="inbox-page">
            <div className="inbox-header">
                <h1>Inbox</h1>
                <div>
                <span>Welcome, {user?.username}</span>
                <button onClick={logout} style={{ marginLeft: '15px' }}>Logout</button>
                </div>
            </div>

            {/* Main content */}
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
        </div>
    );
}

export default InboxPage;