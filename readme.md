# Event Sphere

**Event Sphere** is a smart, interactive event management platform built with the MERN stack. Unlike standard event apps, Event Sphere not only lets users create and join events but also fosters real-time engagement through integrated chat. It provides a seamless experience for discovering, managing, and participating in events, making social planning and networking effortless.  

Whether you’re organizing a meetup, workshop, or social gathering, Event Sphere simplifies event management while keeping participants connected and engaged. Its intuitive interface, real-time updates, and responsive design ensure a smooth experience across devices.

## **Key Features**
- **User Authentication:** Secure signup and login with JWT.
- **Event Creation & Management:** Easily create, edit, and delete events.
- **Event Participation:** Join or leave events with a click.
- **My Events Dashboard:** View events created and joined in one place.
- **Real-time Chat:** Communicate with event participants instantly using Socket.IO.
- **Responsive Design:** Optimized for desktop and mobile use.
- **Modern UI:** Clean and visually appealing design using React, CSS Modules, Styled Components, and Bootstrap.

## **Tech Stack**
- **Frontend:** React.js, CSS Modules, Styled Components, Bootstrap
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Real-time Communication:** Socket.IO
- **Authentication:** JWT (JSON Web Tokens)

## **Project Structure**
event-sphere/ <- Root folder (place README.md here)
├── client/ <- React frontend
├── server/ <- Node.js + Express backend
└── README.md <- This file

bash
Copy code

## **Setup Instructions**

### **1. Clone the Repository**
```bash
git clone https://github.com/yourusername/event-sphere.git
cd event-sphere
2. Setup Backend
bash
Copy code
cd server
npm install
Create a .env file with the following:

ini
Copy code
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
Start the backend server:

bash
Copy code
npm run dev
3. Setup Frontend
bash
Copy code
cd ../client
npm install
Create a .env file (if needed for API URL):

bash
Copy code
REACT_APP_API_URL=http://localhost:5000/api
Start the frontend server:

bash
Copy code
npm start
4. Access the App
Open http://localhost:3000 in your browser.

Contributing
Fork the repository

Create your feature branch (git checkout -b feature/YourFeature)

Commit your changes (git commit -m 'Add some feature')

Push to the branch (git push origin feature/YourFeature)

Create a Pull Request

License
MIT License © 2025 Ayushi Singh