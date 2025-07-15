const mongoose = require('mongoose');
const messageSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: Number,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    knownBy:{
        type: String,
        required: true
    },
    requestedServices:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    },
},
  { timestamps: true })
module.exports = mongoose.model('Message',messageSchema,'messages') 