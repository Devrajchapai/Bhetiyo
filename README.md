# 🔍 Bhetiyo — भेटियो

> **"Bhetiyo"** means **"Found"** in Nepali. A community-driven lost and found platform to help reunite people with their lost belongings.

---

## 📖 About

Bhetiyo is a full-stack web application where users can post lost or found items and connect with others in the community to recover them. Whether you've lost your wallet, a pet, or a cherished item — Bhetiyo makes it easy to report and search.

---

## ✨ Features

- 📋 **Post Lost Items** — Report something you've lost with details and location
- 📦 **Post Found Items** — Let the community know about something you've found
- 🔎 **Search & Browse** — Filter posts by category, location, or date
- 🔐 **Google OAuth** — Sign in securely with your Google account
- 💬 **Real-time Chat** — Socket.IO powered messaging between users
- 👤 **User Profiles** — Manage your account and posted items

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 + TypeScript | UI framework |
| Vite | Build tool & dev server |
| Tailwind CSS v4 | Styling |
| shadcn/ui + Radix UI | UI components |
| React Router v7 | Client-side routing |
| TanStack Query | Server state management |
| Zustand | Client state management |
| Axios | HTTP client |
| Lucide React | Icons |
| Sonner | Toast notifications |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | Web server |
| JavaScript (ESM) | Runtime language |
| MySQL + TypeORM | Database & ORM |
| Passport.js | Authentication |
| Google OAuth 2.0 | Social login |
| Socket.IO | Real-time communication |
| dotenv | Environment config |

---

## 📁 Project Structure

```
Bhetiyo/
├── backend/
│   ├── index.js                    # Entry point — bootstraps Express, Socket.IO, DB
│   ├── package.json
│   └── src/
│       ├── config/
│       │   ├── database.js         # TypeORM MySQL DataSource configuration
│       │   ├── middleware.js       # Express middleware setup (cors, session, etc.)
│       │   ├── passport.js         # Google OAuth 2.0 strategy
│       │   └── socketio.js         # Socket.IO server configuration
│       ├── controllers/            # Route handler logic (in progress)
│       ├── entities/
│       │   └── User.js             # TypeORM User entity
│       ├── middleware/             # Custom Express middleware (in progress)
│       └── routes/
│           ├── index.js            # Registers all route groups
│           └── auth.js             # Google OAuth routes (/auth/google)
│
├── frontend/
│   ├── index.html                  # HTML entry point
│   ├── vite.config.ts              # Vite configuration
│   ├── tsconfig.json
│   ├── components.json             # shadcn/ui config
│   ├── package.json
│   ├── public/
│   │   ├── founditems/             # Static assets for found item images
│   │   ├── lostitems/              # Static assets for lost item images
│   │   └── homepage/               # Static assets for homepage
│   └── src/
│       ├── main.tsx                # React app entry point
│       ├── App.tsx                 # Root component — sets up router
│       ├── index.css               # Global styles
│       ├── vite-env.d.ts
│       ├── api/
│       │   ├── client.ts           # Axios instance with base URL & interceptors
│       │   └── index.ts            # Exported API functions
│       ├── assets/                 # Images and static media
│       ├── components/
│       │   ├── NavigationBar.tsx   # Top navigation bar
│       │   ├── Footer.tsx          # Page footer
│       │   ├── Signup.tsx          # Sign up / login modal
│       │   ├── UserProfile.tsx     # User profile dropdown/page
│       │   └── ui/
│       │       └── button.tsx      # shadcn/ui Button component
│       ├── contexts/               # React Contexts (in progress)
│       ├── data/                   # Static / mock data (in progress)
│       ├── hooks/                  # Custom React hooks (in progress)
│       ├── lib/
│       │   └── utils.ts            # Tailwind class merge utility (cn)
│       ├── pages/
│       │   ├── Home.tsx            # Homepage
│       │   ├── NotFound.tsx        # 404 page (picks a random variant)
│       │   └── 404/                # 404 page design variants (Variant_0 – Variant_6)
│       ├── routes/
│       │   └── routes.tsx          # React Router route definitions
│       ├── store/
│       │   ├── data/               # Zustand data stores (in progress)
│       │   └── ui/
│       │       └── navigationBar.tsx   # Zustand store for nav bar state
│       ├── types/
│       │   └── ui/components/
│       │       └── navigation_bar.ts   # TypeScript types for NavigationBar
│       └── utils/                  # Helper/utility functions (in progress)
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or above
- MySQL database
- A Google Cloud project with OAuth 2.0 credentials

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Devrajchapai/Bhetiyo.git
   cd Bhetiyo
   ```

2. **Install dependencies**

   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the `backend/` directory:

   ```env
   PORT=5000
   HOST=localhost

   DB_HOSTNAME=localhost
   DB_PORT=3306
   DB_USERNAME=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=bhetiyo
   DB_SYNCHRONIZATON=true

   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SERECT=your_google_client_secret
   GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback

   FRONTEND_URL=http://localhost:5173

   SESSION_SECRET=your_session_secret
   ```

### Running the App

**Start the backend:**

```bash
cd backend
npm run dev
```

**Start the frontend:**

```bash
cd frontend
npm run dev
```

Open your browser at `http://localhost:5173`

---

## 📄 License

This project is open source. See the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Devraj Chapai**
- GitHub: [@Devrajchapai](https://github.com/Devrajchapai)

---

> *Helping the Nepali community reunite with what matters most.* 🇳🇵
