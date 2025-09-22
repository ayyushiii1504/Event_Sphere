# Event Sphere

**Event Sphere** is a modern MERN stack event management platform that lets users create, join, and explore events with ease. It also features real-time chat for participant engagement, making event organization and participation seamless.  

With an intuitive interface and responsive design, Event Sphere ensures a smooth experience across devices, simplifying social planning and networking.

## Key Features
- **User Authentication:** Secure signup and login with JWT
- **Event Creation & Management:** Create and delete events
- **Event Participation:** Join or leave events
- **My Events Dashboard:** View events created and joined
- **Real-time Chat:** Communicate instantly using Socket.IO
- **Responsive Design:** Optimized for desktop and mobile
- **Modern UI:** Clean design with React, Styled Components, and Tailwind CSS

## Tech Stack
- Frontend: React.js, Tailwind, Styled Components
- Backend: Node.js, Express.js
- Database: MongoDB
- Real-time Communication: Socket.IO
- Authentication: JWT (JSON Web Tokens)


## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/event-sphere.git
cd event-sphere
```

### 2.Setup Backend 
```bash
cd server
npm install
```
Create a .env file in the server folder:

```bash 
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```
Start backend server:
```bash
npm run dev
```
### 3. Setup Frontend

```bash
cd ../client
npm install
```
Create a .env file in the client folder if needed:
```bash
REACT_APP_API_URL=http://localhost:5000/api
```

Start the frontend server:
```bash
npm run dev
```

## Author

Made by Ayushi Singh