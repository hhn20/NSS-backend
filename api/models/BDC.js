const mongoose = require('mongoose');

const BDCSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type:String, required: true},
    ph_no: {type:String, required: true},
    email: {type:String, required: true}
});

module.exports = mongoose.model('BDClist',BDCSchema);