const express = require('express');
const connect = require('./config/DB-config');
const ApiRoutes = require('./routes/index');
const bodyParser = require('body-parser');
//const userRepository = require('./repository/userRepository');

const setupAndStartServer = () => {

    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api' , ApiRoutes);

        
    app.listen(3000 , async () => {
        console.log("Server connected on PORT ",3000);
        await connect();
        console.log('Mongodb connected')

        // const userRepo = new userRepository;
        // const user = await userRepo.findByUsername('dhiman31');
        // console.log(user);
        // console.log("\n\n",user.id);

        // const message = await Message.create({
        //     to : '69746f7484c61bd4ad202462',
        //     from : '697473aee1af1a751fef4589',
        //     content : 'Hi when are you coming to Delhi ?',
        //     Date : new Date()
        // })

        // const message = await Message.findById('697474042fc95cf52799aedb').populate('from','username -_id').populate('to','username -_id');
        // console.log(message);

    })
};

setupAndStartServer();