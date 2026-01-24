const express = require('express');
const connect = require('./config/DB-config');
const http = require('http');
const ApiRoutes = require('./routes/index');
const bodyParser = require('body-parser');
const initiateSocket = require('./sockets/socket');
const path = require('path');
const messageRepository = require('./repository/messageRepository');

const setupAndStartServer = () => {

    const app = express();
    app.use(express.static(path.join(__dirname, '../public')));

    const server = http.createServer(app); // wrap express
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api' , ApiRoutes);

    initiateSocket(server);
    
    const msgRepo = new messageRepository;
        
    server.listen(3000 , async () => {
        console.log("Server connected on PORT ",3000);
        await connect();
        console.log('Mongodb connected')
    })
};

setupAndStartServer();