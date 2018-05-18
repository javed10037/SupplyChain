const mongoose = require('mongoose');
const Schema  = mongoose.Schema;
const user = new Schema({
	name:{type:String},
	password:{type:String},
	email:{type:String},
	publickey:{type:String},
	privatekey:{type:String},
	deviceId:{type:String},
	phone:{type:String},
	otp:{type:String},
	status:{type:String}
})

module.exports = mongoose.model('user',user);