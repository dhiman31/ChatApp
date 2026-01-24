const mongoose = require('mongoose');

const connect = async ()=> {
    await mongoose.connect('mongodb://localhost/chatAppDB');
}

module.exports = connect;