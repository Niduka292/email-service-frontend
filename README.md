# Email Service Frontend

A modern, full-featured email client built with React. Features include email management, advanced search, keyboard shortcuts, and a responsive UI.

## 🚀 Live Demo

<<<<<<< HEAD
**[https://email-service-frontend-rho.vercel.app](https://email-service-frontend-rho.vercel.app)**
=======
**[https://email-service-frontend-rho.vercel.app](https://email-service-frontend-rho.vercel.app)**
>>>>>>> 97ed5433d68c6dd3f15ed5040a7e83c2bc3a6031

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-blue)](https://email-service-frontend-rho.vercel.app/inbox)

## ✨ Features

### 🚀 Core Functionality
- **User Authentication**: Secure login and user registration
- **Compose Mail**: Create and send new emails with rich text editor
- **Email Management**: Reply to emails, delete/move to trash
- **Folder View**: Separate views for Inbox, Sent, Starred, and Trash
- **Starring**: Mark important emails with stars for quick access

### 🔎 Advanced Features
- **AI Summarization**: Instantly summarize long emails using a powerful AI model (via the Spring Boot backend) to quickly grasp key content.
- **Powerful Search**: Full-text search across subject, content, sender name, and sender email
- **Keyboard Shortcuts**: Navigate and perform actions quickly (C for Compose, R for Reply, / for Search)
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Real-time Updates**: Live notifications for new emails

## 🛠️ Technology Stack

- **React 18**
- **Vite** - Build tool and dev server
- **Axios** - HTTP client for API calls
- **React Router** - Client-side routing
- **LocalStorage** - Token and preference management

## 📦 Prerequisites

- Node.js 18+ (LTS version recommended)
- npm or yarn
- Git

## ⚙️ Local Development Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Niduka292/email-service-frontend.git
cd email-service-frontend
```

### 2. Install Dependencies
```bash
npm install
# OR
yarn install
```

### 3. Configure Environment Variables

Create a **`.env.local`** file in the root directory:
```env
# For local backend development
REACT_APP_API_BASE_URL=http://localhost:8080/api

# OR for production backend
# REACT_APP_API_BASE_URL=https://email-service-backend-production.up.railway.app/api
```

For Vite projects, use:
```env
VITE_API_BASE_URL=http://localhost:8080
```

### 4. Run the Development Server
```bash
npm start
# OR
npm run dev
# OR
yarn start
```

The app will open automatically at **`http://localhost:3000`** (Create React App) or **`http://localhost:5173`** (Vite).

### 5. Build for Production
```bash
npm run build
# OR
yarn build
```

### 6. Preview Production Build
```bash
npm run preview
# OR
yarn preview
```
🧠 AI/Gemini API Configuration
The AI Summarization feature requires a running Spring Boot backend with the Gemini API Key configured.

If running the backend locally, ensure you set the environment variable:

```bash

# In your backend environment (Terminal/IntelliJ Configuration)
export GEMINI_API_KEY="YOUR_API_KEY"
```

The key is consumed by the backend property gemini.api.key=${GEMINI_API_KEY}. The frontend only communicates with the backend's summarization endpoint.


## 📁 Project Structure
```
src/
├── assets/           # Images, icons, fonts
├── components/       # Reusable React components
│   ├── EmailList.jsx       # Email list display
│   ├── EmailList.css 
│   ├── ComposeModal.jsx   # Compose email modal
│   ├── ComposeModal.css 
│   ├── Header.jsx       # Header
│   ├── Header.css 
│   ├── EmailViewer.jsx 
│   ├── EmailViewer.css
│   ├── EmailItem.jsx 
│   ├── EmailItem.css  
│   ├── Sidebar.jsx         # Navigation sidebar
│   ├── Sidebar.css 
│   ├── ProtectedRoute.jsx 
│   ├── ShortcutsHelp.jsx 
│   ├── ShortcutsHelp.css       # Keyboard shortcuts Help
│   └── KeyboardShortcuts.jsx   # Keyboard shortcuts
├── services/          # Configuration files
│   ├── authService.js           
│   ├── userService.js        
│   ├── mailService.js          
│   └── api.js              # Axios instance and API config
├── context/          # Configuration files
│   ├── AuthContext.jsx 
├── pages/           # Page components
│   ├── LoginPage.jsx           # Login page
│   ├── SignupPage.jsx        # Sign up page
│   ├── InboxPage.jsx           # Inbox view
│   └── InboxPage.css           
├── utils/ 
├── App.jsx          # Main app component with routes
├── App.css
├── index.css
└── main.jsx         # Entry point
```

## 🧪 Testing Credentials

You can use these test accounts on the **Live Demo** or **Local Setup**:

| Username | Password | Email |
|----------|----------|-------|
| `george` | `george123` | `george@example.com` |
| `alice` | `alice123` | `alice@example.com` |

Or register a new user using the sign-up page.

## ⌨️ Keyboard Shortcuts

| Key | Action | Description |
|-----|--------|-------------|
| **C** | Compose | Opens the new email modal |
| **R** | Reply | Replies to the currently selected email |
| **D** | Delete | Moves selected email to Trash |
| **\*** | Star/Unstar | Toggles star status of selected email |
| **/** | Focus Search | Moves cursor to the Search input field |
| **?** | Show Help | Toggles the Keyboard Shortcuts help menu |

### Customizing Shortcuts

1. Press **?** to open shortcuts help
2. Click "Customize" (if implemented)
3. Click on a shortcut to change it
4. Press the new key combination
5. Save changes

## 🔍 Search Functionality

### Basic Search
- Type in the search bar to search emails in real-time
- Search across subject, content, sender name, and sender email
- Highlights matching text in results

### Advanced Search Features
- **By Sender**: Filter emails from specific senders
- **By Keyword**: Search in subject and content
- **Combined Filters**: Use multiple filters simultaneously

### Search Tips
```
meeting                    # Search for "meeting" in all fields
from:john@example.com      # Search by sender email
subject:report             # Search in subject only
```

## 🎯 Switching Between Backends

### Use Local Backend
```bash
# .env.local
REACT_APP_API_BASE_URL=http://localhost:8080/api
```

Then run:
```bash
npm start
```

### Use Production Backend
```bash
# .env.local
REACT_APP_API_BASE_URL=https://email-service-backend-production.up.railway.app/api
```

Then run:
```bash
npm start
```

## 🚀 Deployment

### Vercel Deployment

1. **Push to GitHub** (if not already)

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. **Configure Environment Variables**:
   - Add `REACT_APP_API_BASE_URL` or `VITE_API_BASE_URL`
   - Value: `https://email-service-backend-production.up.railway.app/api`

4. **Deploy** - Vercel will auto-deploy on push to main

### Netlify Deployment

1. **Build the project**:
```bash
   npm run build
```

2. **Deploy**:
   - Drag and drop `build` or `dist` folder to Netlify
   - Or use CLI: `netlify deploy --prod`

3. **Set Environment Variables** in Netlify dashboard

## 🧪 Local Development Workflow

### Test with Local Backend
```bash
# Terminal 1 - Start Backend
cd ../email-service-backend
./mvnw spring-boot:run

# Terminal 2 - Start Frontend
cd email-service-frontend
npm start
```

Open **`http://localhost:3000`** in your browser

### Test with Production Backend

Update `.env.local` to use production API URL, then:
```bash
npm start
```

## 🐛 Troubleshooting

### CORS Errors
- Ensure backend CORS is configured for `http://localhost:3000` or `http://localhost:5173`
- Check browser console for specific CORS errors
- Verify backend is running and accessible

### API Connection Issues
- Check `REACT_APP_API_BASE_URL` or `VITE_API_BASE_URL` is correct
- Verify backend is running (local or production)
- Check Network tab in browser DevTools
- Ensure JWT token is valid and not expired

### Keyboard Shortcuts Not Working
- Ensure no browser extensions are conflicting
- Try different key combinations
- Check if focus is on correct element
- Review console for errors

### Search Not Returning Results
- Verify backend search endpoint is working
- Check API response in Network tab
- Ensure search query format is correct
- Check if emails exist in database

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules
rm package-lock.json
npm install

# Clear build folder
rm -rf build  # or dist for Vite
npm run build
```

### Port Already in Use
```bash
# Change port in package.json (Create React App)
PORT=3001 npm start

# Or in vite.config.js (Vite)
export default defineConfig({
  server: { port: 3001 }
})
```

## 📝 Development Workflow

1. **Create feature branch**:
```bash
   git checkout -b feature/your-feature-name
```

2. **Develop with local backend**:
   - Configure `.env.local` for localhost
   - Start both frontend and backend
   - Test functionality

3. **Test with production backend**:
   - Update `.env.local` to production URL
   - Verify everything works

4. **Commit and push**:
```bash
   git add .
   git commit -m "Add feature description"
   git push origin feature/your-feature-name
```

5. **Create Pull Request** and merge to main

6. **Vercel auto-deploys** from main branch

## 🎨 Customization

### Update Theme Colors
```css
/* src/index.css */
:root {
  --primary-color: #4f46e5;
  --secondary-color: #06b6d4;
  --accent-color: #f59e0b;
  --text-color: #1f2937;
  --background-color: #ffffff;
}
```

### Change API Base URL

Edit `src/config/api.js`:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';
```

### Add Custom Shortcuts

Edit `src/hooks/useKeyboardShortcuts.js`:
```javascript
const shortcuts = {
  'c': () => openCompose(),
  'r': () => replyToEmail(),
  // Add your custom shortcut
  'e': () => yourCustomFunction(),
};
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- **Niduka** - [GitHub](https://github.com/Niduka292)

## 🔗 Related Links

- **Live Demo**: https://email-service-frontend-rho.vercel.app/inbox
- **Backend Repository**: https://github.com/Niduka292/email-service-backend.git
- **Backend API**: https://email-service-backend-production.up.railway.app
- **Full-Stack Repository**: [Link if separate]

## 🙏 Acknowledgments

- Inspired by modern email clients like Gmail and Outlook
- Thanks to the React and open-source communities

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check documentation and examples
- Review troubleshooting section

---

**Built using React and Vite**