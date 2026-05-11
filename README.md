# EventSphere

> *Where Moments Become Movements*

EventSphere is a full-stack event management platform built on the MERN stack. Discover events happening around you, create your own, connect with attendees through real-time chat, and manage everything from a clean, elegant dashboard.

---

## Features

- **Authentication** — Secure signup and login with JWT-based session management
- **Event Creation & Management** — Create, update, and delete events with full organiser control
- **Event Discovery** — Browse events by city, category, or keyword with live filtering
- **Join & Leave Events** — One-click participation with a live attendee list
- **Real-Time Chat** — Per-event chat rooms powered by Socket.IO, with persistent message history
- **My Events Dashboard** — A dedicated space to manage all events you've created
- **Profile Page** — View your profile details and a history of events you've joined
- **Responsive Design** — Fully optimised for desktop and mobile

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Real-Time | Socket.IO |
| Authentication | JWT (JSON Web Tokens) |

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- npm

---

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/eventsphere.git
cd eventsphere
```

---

### 2. Set Up the Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Start the backend server:

```bash
npm run dev
```

---

### 3. Set Up the Frontend

```bash
cd ../client
npm install
```

Create a `.env` file inside the `client` folder:

```env
VITE_BACKEND_URL=http://localhost:5000/api
VITE_BACKEND_SOCKET_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

The app will be running at `http://localhost:5173`

---

## Author

Made by **Ayushi Singh**
