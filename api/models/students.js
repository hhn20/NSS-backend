const mongoose = require('mongoose');

const nssSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type:String, required: true},
    usn: {type:String, required: true,unique: true},
    BDC: {type:Number, required: true},
    specialCamp: {type:Number, required: true},
    emergencyDonor: {type:Boolean, required: true},
    role: {type:String, required: true},
    team: {type:String, required: true},
    ph_no: {type:String, required: true}
});

module.exports = mongoose.model('Student',nssSchema);