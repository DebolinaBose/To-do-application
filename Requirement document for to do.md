
# Technical Requirement Document (TRD)

## Project: Simple To-Do Application

### 1. Project Overview

The To-Do Application is a web-based system that allows users to manage daily tasks.
Users can create, view, update, and delete tasks. The application will use a **React frontend**, a **Node.js backend**, and **PostgreSQL** for storing data, with **Knex.js** for database migration and seeding.

---

# 2. Technology Stack

### Frontend

* Framework: React
* Language: JavaScript
* Styling: CSS / Tailwind (optional)
* HTTP Client: Axios or Fetch API

### Backend

* Runtime: Activepieces Workflow Engine
* Framework: ActivePieces Flow Builder
* Automation Type: Workflow Automation

### Database

* Database: PostgreSQL
* Query Builder & Migration Tool: Knex.js

---

# 3. System Architecture

```
Frontend (React)
       |
       |  HTTP Requests (REST API)
       |
Backend (Node.js + Express)
       |
       |  Knex.js
       |
Database (PostgreSQL)
```

Flow:

1. User interacts with React UI.
2. React sends API request to backend.
3. Backend processes request.
4. Knex executes queries in PostgreSQL.
5. Response is returned to frontend.

---

# 4. Functional Requirements

### 4.1 User Features

The user should be able to:

1. Add a new task.
2. View all tasks.
3. Mark task as completed.
4. Edit a task.
5. Delete a task.

---

# 5. Non-Functional Requirements

* System should respond within **2 seconds**.
* Application should support **multiple users**.
* API should follow **REST standards**.
* Code should be modular and maintainable.

---

# 6. Project Folder Structure

### Frontend (React)

```
client/
 ├── src/
 │   ├── components/
 │   │   ├── TodoForm.js
 │   │   ├── TodoList.js
 │   │   └── TodoItem.js
 │   ├── pages/
 │   │   └── Home.js
 │   ├── services/
 │   │   └── api.js
 │   └── App.js
```

### Backend (Node.js)

```
server/
 ├── controllers/
 │   └── todoController.js
 ├── routes/
 │   └── todoRoutes.js
 ├── models/
 │   └── db.js
 ├── migrations/
 ├── seeds/
 ├── knexfile.js
 └── server.js
```

---

# 7. Database Design

### Table: todos

| Column Name | Data Type    | Description      |
| ----------- | ------------ | ---------------- |
| id          | Integer (PK) | Unique task ID   |
| title       | String       | Task title       |
| description | Text         | Task details     |
| status      | Boolean      | Completed or not |
| created_at  | Timestamp    | Created date     |

---

# 8. Migration Script (Knex Example)

Example migration file:

```js
exports.up = function(knex) {
  return knex.schema.createTable('todos', function(table) {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.text('description');
    table.boolean('status').defaultTo(false);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('todos');
};
```

---

# 9. Seed File Example

Initial sample data:

```js
exports.seed = function(knex) {
  return knex('todos').del()
    .then(function () {
      return knex('todos').insert([
        { title: 'Learn React', description: 'Study components', status: false },
        { title: 'Build ToDo App', description: 'Practice full stack', status: false }
      ]);
    });
};
```

---

# 10. API Design

### Base URL

```
/api/todos
```

### Endpoints

#### Get All Tasks

```
GET /api/todos
```

#### Create Task

```
POST /api/todos
```

Body:

```json
{
  "title": "Complete project",
  "description": "Finish ToDo app"
}
```

#### Update Task

```
PUT /api/todos/:id
```

#### Delete Task

```
DELETE /api/todos/:id
```

---

# 11. Backend Setup Commands

Install dependencies:

```bash
npm install express knex pg cors
```

Initialize Knex:

```bash
npx knex init
```

Run migrations:

```bash
npx knex migrate:latest
```

Run seed data:

```bash
npx knex seed:run
```

Start server:

```bash
npm start
```

---

# 12. Frontend Setup Commands

Create React app:

```bash
npx create-react-app client
```

Install dependencies:

```bash
npm install axios
```

Run frontend:

```bash
npm start
```

---

# 13. Environment Variables

Create `.env` file:

```
PORT=5000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=todo_db
DB_PORT=5432
```

---

# 14. Basic Workflow

1. User opens the To-Do app.
2. React loads tasks from backend.
3. Backend fetches tasks from PostgreSQL.
4. User creates or updates tasks.
5. Changes are stored in database.
6. UI updates instantly.

---

# 15. Future Enhancements

* User authentication (Login/Signup)
* Task deadlines
* Notifications
* Search and filter tasks
* Mobile responsive design


