const Message = require('../models/Message');
const User = require('../models/User');

class messageRepository {

    async createMessage(message) {
        try {
            console.log("message from : ",message.from);
            const fromUser = await User.findOne({username : message.from});
            if(!fromUser){
                throw new Error('Sender not found!');
            }
            const toUser = await User.findOne({username : message.to});
            if(!toUser){
                throw new Error('Receiver not found!');
            }
            
            const msg = await Message.create({
                to : toUser.id,
                from : fromUser.id,
                content : message.content,
                time : new Date()
            })
            return msg

        } catch (error) {
            console.log(error);
            throw new error ({
                message : 'Error in message Repository'
            })
        }
    }

    async getAllRelatedMessage(idOne , idTwo){
        try {
            const messages = await Message.find({
                $or : [
                    {from:idOne , to:idTwo},
                    {from:idTwo , to:idOne}
                ]
            }).sort({ time: 1 })
              .select('content time -_id')
              .populate('to','username -_id')
              .populate('from' , 'username -_id');
              
            console.log(messages);

            return messages;

        } catch (error) {
            console.log("Could not load all messages")
            throw new Error('Could not load all messages');
        }
    }

}

module.exports = messageRepository;