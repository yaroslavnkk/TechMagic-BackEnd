const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    userFirstName : {
        type : String,
        required : true
    },
    userMiddleName : {
        type : String,
        required : true
    },
    userLastName : {
        type : String,
        required : true
    },
    userBirthDate : {
        type : Date,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    
    password : {
        type : String,
        required : true
    }

});

module.exports = mongoose.model('User', UserSchema);