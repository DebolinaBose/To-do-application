# Premium To-Do Application

A full-stack To-Do Application built with React, Node.js, Express, and PostgreSQL.

## 🚀 How to Run the Application

Follow these steps to get the application running on your local machine.

### 1. Prerequisites
*   **PostgreSQL** installed and running.
*   **Node.js** installed.

### 2. Database Setup
1.  Create a database named `todo_db` in your PostgreSQL instance.
2.  Navigate to the `server` directory and open the `.env` file.
3.  Update the `DB_USER` and `DB_PASSWORD` to match your PostgreSQL account.

### 3. Backend Setup
Open a terminal in the `server` directory and run:
```bash
npm install
npm run migrate  # Run database migrations to create the 'todos' table
npm run seed     # (Optional) Seed the database with sample tasks
npm run dev      # Start the backend server with nodemon
```
*The backend runs on http://localhost:5000``.*

### 4. Frontend Setup
Open a **new terminal** in the `client` directory and run:
```bash
npm install
npm start        # Start the React development server
```
*The frontend runs on `http://localhost:3000`.*

---

## 🛠 Technology Stack
*   **Frontend**: React.js, Axios, Vanilla CSS (Premium Styling)
*   **Backend**: Node.js, Express.js
*   **Database**: PostgreSQL
*   **Query Builder**: Knex.js

## ✨ Features
*   **Create Tasks**: Add new tasks with titles and descriptions.
*   **View Tasks**: All tasks are fetched from the database and displayed.
*   **Update Tasks**: Toggle task completion status or edit title/description.
*   **Delete Tasks**: Remove tasks permanently.
*   **Premium UI**: Modern, clean, and responsive design.
