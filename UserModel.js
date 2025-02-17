const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for User
let User = new Schema({
    name : {
        type: String
    },
    email : {
        type: String
    },
    age : {     
        type: Number
    },
})

module.exports = mongoose.model('User', User);
