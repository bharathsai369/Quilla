
---

# 📝 Quilla

**Quilla** is a **full-stack note-taking application** designed for simplicity and efficiency. Built with a modern tech stack, it offers a seamless experience for managing your notes, complete with robust backend services and a sleek, responsive user interface.

---

## ✨ Features

* ✅ **CRUD Operations:** Create, Read, Update, and Delete notes effortlessly.
* 🎨 **Intuitive UI:** Clean and responsive design using React, Tailwind CSS, and DaisyUI.
* 🧠 **Robust Backend:** Express.js and MongoDB ensure reliable and scalable performance.
* 🔐 **Rate Limiting:** Efficient API protection using Upstash Redis.
* 📣 **Real-time Toasts:** Instant feedback on actions using `react-hot-toast`.

---

## 🛠 Technologies Used

### 🔹 Frontend

* React
* Vite
* React Router v7
* Tailwind CSS
* DaisyUI
* Axios
* react-hot-toast

### 🔸 Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* Upstash Redis
* dotenv
* Nodemon
* CORS

---

## 🖼️ App Preview

<div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;">

  <img src="./assets/Quilla-1.png" alt="UI Demo 1" width="600"/>
  <img src="./assets/Quilla-2.png" alt="UI Demo 2" width="600"/>
  <img src="./assets/Quilla-3.png" alt="UI Demo 3" width="600"/>

</div>

---

## 📁 Project Structure

```
Quilla/
├── .github/
│   └── copilot-instructions.md
├── assets/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── upstash.js
│   │   ├── controllers/
│   │   │   └── notesController.js
│   │   ├── middleware/
│   │   │   └── rateLimiter.js
│   │   ├── models/
│   │   │   └── note.js
│   │   ├── routes/
│   │   │   └── notesRoute.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── libs/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   └── package.json
├── package.json
└── README.md
```

---

## 🚀 Getting Started

Get a local copy of the project up and running for development and testing.

### 📋 Prerequisites

* [Node.js](https://nodejs.org/) (LTS recommended)
* npm (comes with Node.js)
* [MongoDB Atlas](https://www.mongodb.com/atlas/database) account (or local MongoDB)
* [Upstash](https://upstash.com/) account (for Redis)

---

## 🔧 Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/bharathsai369/Quilla.git
   cd Quilla
   ```

2. **Install dependencies (frontend and backend):**

   ```bash
   npm install
   ```

---

## 🧪 Environment Setup

Create a `.env` file inside the `backend/` directory:

```env
# MongoDB
MONGO_URI=<your_mongodb_connection_string>

# Upstash Redis
UPSTASH_REDIS_REST_URL=<your_upstash_redis_rest_url>
UPSTASH_REDIS_REST_TOKEN=<your_upstash_redis_rest_token>

# Environment
NODE_ENV=development
```

> 🔐 Replace placeholders with your actual credentials.

---

## 🏃 Running the App Locally

### Start Backend (dev mode):

```bash
cd backend
npm run dev
```

➡️ Runs on: `http://localhost:5001`

### Start Frontend (dev mode):

```bash
cd frontend
npm run dev
```

➡️ Runs on: `http://localhost:5173`

---

## 📦 Building for Production

1. **Build frontend:**

   ```bash
   npm run build
   ```

   Generates static files in `frontend/dist`.

2. **Serve full-stack app:**

   ```bash
   npm start
   ```

➡️ This will serve the static frontend via Express and start the backend API.

---
