# 📧 Email App (Full-Stack Mail Client)

A modern, full-featured email client built with **React** (Frontend) and **Spring Boot/PostgreSQL** (Backend).

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-blue)](https://email-service-frontend-rho.vercel.app/inbox)



---

## ✨ Features

### 🚀 Core Functionality
* **User Authentication:** Secure **Login** and **User Registration** pages.
* **Compose Mail:** Easily create and send new emails.
* **Email Management:** **Reply** to emails and **Delete/Move to Trash** emails.
* **Folder View:** Separate views for **Inbox**, **Sent**, **Starred**, and **Trash** folders.
* **Starring:** Mark emails as starred for quick access.

### 🔎 Advanced Features
* **Search Functionality:** Powerful full-text search across email **Subject**, **Content**, **Sender Name**, and **Sender Email**.
* **Keyboard Shortcuts:** Navigate and perform actions quickly using shortcuts (e.g., `C` for Compose, `R` for Reply, `/` for Search Focus).

---

## ⚙️ Getting Started (Local Setup)

### 🌍 Live Demo

You can view the live application and test the features here:

**[https://email-service-frontend-rho.vercel.app/inbox](https://email-service-frontend-rho.vercel.app/inbox)**

### Prerequisites

* Node.js (LTS version)
* Java 17 or later
* Maven or Gradle (for the backend)
* PostgreSQL running locally (e.g., via Docker or a local installation)

### 1. Backend Setup (Spring Boot)

1.  **Clone the Repository:**
    ```bash
    git clone [YOUR-BACKEND-REPO-URL]
    cd email-service-backend
    ```

2.  **Configure Database:**
    * Ensure your local PostgreSQL instance is running.
    * Create a database named `email_system_db`.
    * Update `src/main/resources/application.properties` with your local PostgreSQL credentials:

    ```properties
    # ... other properties
    spring.datasource.url=jdbc:postgresql://localhost:5432/email_system_db
    spring.datasource.username=postgres # <--- CHANGE THIS
    spring.datasource.password=yourlocalpassword # <--- CHANGE THIS
    # ...
    ```

3.  **Run the Server:**
    ```bash
    ./mvnw spring-boot:run
    # OR (if using Gradle):
    ./gradlew bootRun
    ```
    The backend should start on `http://localhost:8080`.

### 2. Frontend Setup (React)

1.  **Navigate to the Frontend Directory:**
    ```bash
    cd ../email-app-frontend
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    # OR
    yarn install
    ```

3.  **Configure API Base URL:**
    * Create a file named **`.env.local`** in the root of the frontend directory.
    * Add your local backend API URL:

    ```
    REACT_APP_API_BASE_URL=http://localhost:8080/api
    ```

4.  **Run the Client:**
    ```bash
    npm start
    # OR
    yarn start
    ```
    The frontend should open automatically on `http://localhost:3000`.

---

## 🧪 Testing Credentials

You can use the following accounts to test the mail features on the **Live Demo** or your **Local Setup**. You can also register a new user using the sign-up page.

| Role | Username | Password |
| :--- | :--- | :--- |
| **Test User 1** | `george` | `george123` |
| **Test User 2** | `alice` | `alice123` |
| **New User** | *(Any choice)* | *(Any choice)* |

---

## ⌨️ Keyboard Shortcuts

| Key | Action | Notes |
| :--- | :--- | :--- |
| **C** | Compose | Opens the new email modal. |
| **R** | Reply | Replies to the currently selected email. |
| **D** | Delete | Moves the currently selected email to **Trash**. |
| **\*** | Star/Unstar | Toggles the star status of the selected email. |
| **/** | Focus Search | Moves the cursor to the Search input field. |
| **?** | Show Help | Toggles the Keyboard Shortcuts help menu. |