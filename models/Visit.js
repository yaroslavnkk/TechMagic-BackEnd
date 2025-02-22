const mongoose = require('mongoose');

const visitSchema = new mongoose.model({
    doctor : { type: mongoose.Schema.Types.ObjectId, ref : "Doctor", required : true },
    user : { type: mongoose.Schema.Types.ObjectId, ref: "User", required : true },
    date : {type : Date, required : true},
    diagnosis : { type : String, required: true },
    treatmentCost : {type : Number, required : true},
    finalCost : { type : Number, required : true}
});

module.exports = mongoose.model('Visit', visitSchema);