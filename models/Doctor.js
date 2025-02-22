const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    firstName : {type : String, required : true},
    lastName : {type : String, required : true},
    patronymic : {type : String, required : true},
    specialty : {type : String, required : true},
    qualification : {type : String, required : true}
});

module.exports = mongoose.model("Doctor", doctorSchema);