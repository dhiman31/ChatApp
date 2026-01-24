const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    from : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    to : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    content : {
        type : String,
        required : true
    },
    time : {
        type : Date
    }
});

const Message = mongoose.model('Message' , messageSchema);
module.exports = Message;