````markdown
# 🔍 Bhetiyo — भेटियो

> **"Bhetiyo"** means **"Found"** in Nepali.  
> A modern community-driven Lost & Found platform that helps reunite people with their lost belongings.

---

## 📖 About

**Bhetiyo** is a full-stack web application that provides a centralized platform for reporting, discovering, and recovering lost belongings.

Instead of relying on scattered Facebook posts, messaging groups, or physical notice boards, Bhetiyo allows users to create detailed reports for lost and found items, browse community submissions, and securely communicate with one another in real time.

The project was built to solve a real-world problem while showcasing modern full-stack development practices using React, Express, MySQL, TypeORM, and Socket.IO.

---

## 🌟 Why Bhetiyo?

Every day, valuable belongings are lost because there is no centralized place where people can report and search for them.

Bhetiyo aims to bridge this gap by providing a community-powered platform where people can easily report lost items, publish found items, search intelligently, and communicate securely.

Whether it's a wallet, phone, laptop, pet, important document, or any cherished belonging—every successful recovery begins with someone reporting it.

---

## ✨ Features

### 📋 Lost Item Reporting

Create detailed reports including:

- Item title
- Description
- Category
- Date & Time
- Last known location
- Images

---

### 📦 Found Item Reporting

Help others by publishing items you've found with detailed information and photographs.

---

### 🔎 Smart Search & Filtering

Quickly discover posts using filters such as:

- Categories
- Keywords
- Locations
- Lost / Found Status
- Date

---

### 💬 Real-time Messaging

Communicate instantly with other users through a built-in chat system powered by **Socket.IO** to coordinate item recovery.

---

### 🔐 Secure Authentication

Sign in securely using your Google account with OAuth 2.0.

---

### 👤 User Dashboard

Manage:

- Your profile
- Posted items
- Conversations
- Account information

---

### ⚡ Responsive Design

Designed to work seamlessly across desktop, tablet, and mobile devices.

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| React 19 + TypeScript | UI Framework |
| Vite | Build Tool |
| Tailwind CSS v4 | Styling |
| shadcn/ui + Radix UI | UI Components |
| React Router v7 | Client-side Routing |
| TanStack Query | Server State Management |
| Zustand | Client State Management |
| Axios | HTTP Client |
| Lucide React | Icons |
| Sonner | Toast Notifications |

---

### Backend

| Technology | Purpose |
|------------|---------|
| Node.js + Express 5 | Web Server |
| JavaScript (ESM) | Runtime |
| MySQL | Database |
| TypeORM | ORM |
| Passport.js | Authentication |
| Google OAuth 2.0 | Social Login |
| Socket.IO | Real-time Communication |
| dotenv | Environment Configuration |

---

## 🏗️ System Architecture

```text
                    React + Vite
                          │
                 React Router + Zustand
                          │
                  TanStack Query
                          │
                     Axios REST API
                          │
                 Express.js Backend
        ┌──────────────┼──────────────┐
        │              │              │
 Authentication   Socket.IO      Controllers
        │              │              │
        └──────────────┼──────────────┘
                    TypeORM
                       │
                    MySQL
```

---

## 📁 Project Structure

```text
Bhetiyo/
├── backend/
│   ├── index.js
│   ├── package.json
│   └── src/
│       ├── config/
│       │   ├── database.js
│       │   ├── middleware.js
│       │   ├── passport.js
│       │   └── socketio.js
│       ├── controllers/
│       ├── entities/
│       │   └── User.js
│       ├── middleware/
│       └── routes/
│           ├── index.js
│           └── auth.js
│
├── frontend/
│   ├── package.json
│   ├── public/
│   └── src/
│       ├── api/
│       ├── assets/
│       ├── components/
│       ├── contexts/
│       ├── data/
│       ├── hooks/
│       ├── lib/
│       ├── pages/
│       ├── routes/
│       ├── store/
│       ├── types/
│       └── utils/
│
└── README.md
```

---

## 📸 Screenshots

> Add screenshots of your application here.

Example:

```
docs/
├── home.png
├── dashboard.png
├── lost-items.png
├── found-items.png
├── item-details.png
└── chat.png
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MySQL
- Google Cloud OAuth Credentials

---

### Clone the Repository

```bash
git clone https://github.com/Devrajchapai/Bhetiyo.git

cd Bhetiyo
```

---

### Install Dependencies

Frontend

```bash
cd frontend

npm install
```

Backend

```bash
cd backend

npm install
```

---

### Configure Environment Variables

Create a `.env` file inside the **backend** directory.

```env
PORT=5000
HOST=localhost

DB_HOSTNAME=localhost
DB_PORT=3306
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=bhetiyo
DB_SYNCHRONIZATION=true

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback

FRONTEND_URL=http://localhost:5173

SESSION_SECRET=your_session_secret
```

---

### Run the Backend

```bash
cd backend

npm run dev
```

---

### Run the Frontend

```bash
cd frontend

npm run dev
```

Open your browser:

```
http://localhost:5173
```

---

## 🤝 Contributing

Contributions are always welcome!

1. Fork the repository
2. Create a new feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push your branch

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

## 🌐 Live Demo

**Visit Bhetiyo:**

https://bhetiyo-seven.vercel.app/

---

## 👨‍💻 Author

**Devraj Chapai**

GitHub: https://github.com/Devrajchapai

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

Your support motivates future improvements and helps more developers discover the project.

---

## 📄 License

This project is open source and available under the MIT License.

---

> **Helping communities reunite with what matters most. 🇳🇵**
````
