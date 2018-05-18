const mongoose = require('mongoose');
const Schema  = mongoose.Schema;
const chainModle = new Schema({
	name:{type:String},
	ruleId:{type:String},
	txId:[String],
	currentTx:{type:String},
	publickey:{type:String},
	privatekey:{type:String}
})

module.exports = mongoose.model('chainModle',chainModle);