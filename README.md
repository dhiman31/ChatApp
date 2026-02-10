# ChatApp

A Node.js based real-time chat backend built using **Express**, **MongoDB**, and **Socket.IO**.  
This project provides user management, messaging, and real-time communication capabilities.

---

## Features

- JWT-based user authentication
- Real-time messaging using Socket.IO
- MongoDB database integration
- Modular architecture (MVC + Service + Repository pattern)
- Versioned API routes
- Scalable project structure

---

## Project Structure

```bash
CHAT_APP
│
├── public/
├── src/
│   ├── config/
│   │   ├── DB-config.js
│   │   └── serverConfig.js
│   │
│   ├── controllers/
│   │   └── userController.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Message.js
│   │
│   ├── repository/
│   │   ├── userRepository.js
│   │   └── messageRepository.js
│   │
│   ├── routes/
│   │   └── v1/
│   │       └── index.js
│   │
│   ├── services/
│   │   └── userService.js
│   │
│   ├── sockets/
│   │   └── socket.js
│   │
│   └── index.js
│
├── .env
├── package.json
└── README.md
```

---

## Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd CHAT_APP
npm install
```

---

## Environment Variables

Create a `.env` file in the project root and add:

```env
JWT_KEY=your_secret_key
EXP_IN=token_expiry_time
MONGO_URL=your_mongodb_connection_string
```

---

## Database Configuration

Create the database configuration file:

**File:** `src/config/DB-config.js`

```js
const mongoose = require('mongoose');

const connect = async () => {
  await mongoose.connect(process.env.MONGO_URL);
};

module.exports = connect;
```

---

## Running the Application

Start the server:

```bash
npm start
```

---

## API Versioning

All API routes are grouped under:

```
/api/v1
```

This allows future updates without breaking existing APIs.

---

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- JWT

---

## Future Improvements

- Group chat support
- Message read receipts
- File/media sharing
- Deployment setup
- Unit and integration tests
