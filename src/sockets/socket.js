const User = require('../models/User');
const messageRepository = require('../repository/messageRepository');
const {Server} = require('socket.io');
const jwt = require("jsonwebtoken");

const initiateSocket = (server) => {
  io = new Server(server, {
    cors: { origin: '*' }
  });

  io.use((socket, next) => {
        try {
          const token = socket.handshake.auth.token;

          if (!token) {
            return next(new Error("No token provided"));
          }

          const decoded = jwt.verify(token, process.env.JWT_KEY);

          socket.user = decoded;
          socket.username = decoded.username;

          console.log("Authenticated socket:", decoded.username);
          next(); // allow connection
        } catch (err) {
          next(new Error("Authentication failed"));
        }
  });

  const onlineUsers = new Map();

  io.on('connection', (socket) => {

    onlineUsers.set(socket.username, socket.id);
    console.log(socket.username, "is online");

    socket.on('send', async (message) => {  // message object contains to(username) , from(username) , and content 
        try {
            const msgRepo = new messageRepository;
            const toUsername = message.to;
            const msg = await msgRepo.createMessage({
              from : socket.username,
              to : message.to,
              content : message.content,
              time : new Date()
            });

            if(onlineUsers.has(toUsername)){  // user is online
                io.to(onlineUsers.get(toUsername)).emit('receive-message', {
                  from : socket.username,
                  to : message.to,
                  content : message.content,
                  time : new Date()
                });
            }
        } catch (error) {
            socket.emit('could not send')
        }
    })

    socket.on('history' , async (withUsername) => {
        try {
          const secondUser = await User.findOne({username : withUsername});
          const firstUser = await User.findOne({username : socket.username});
          if(!secondUser){
            throw new Error('no user found');
          }
          if(!firstUser){
            throw new Error('no user found');
          }
          
          const msgRepo = new messageRepository;
          const messages = await msgRepo.getAllRelatedMessage(firstUser.id , secondUser.id);
          socket.emit('chat_history' , messages);
        } catch (error) {
          socket.emit('could not find history')
        }
    })

    socket.on('disconnect' , () => {
        if (socket.username) {
            onlineUsers.delete(socket.username);
            console.log(socket.username," went offline");
        }
    })

  });
};

module.exports = initiateSocket;