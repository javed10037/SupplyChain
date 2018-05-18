var SupplyChain = require('./supplychain');
var log = console.log
const BigchainDB = require('bigchaindb-driver')
const bip39 = require('bip39')
var mongoose = require('mongoose')
const API_PATH = 'https://test.bigchaindb.com/api/v1/'
    const express = require("express");
    const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json({limit: "50mb"}));
app.use(function(req, res, next) {
console.log("allow ori............gin");  
res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, browser_id");
  next();
});
mongoose.connect("mongodb://127.0.0.1/supplychain");
console.log("------------------------------------supplychain started----------------------------------------")
	
	app.post('/createProduct',function(req,res)
	{
		{
		SupplyChain.createProduct(req.body.asset,req.body.metadata,function(err,result)
			{
				if(err)
					return res.json({responseCode:400,responseMessage:'Something went wrong'})
				else
					return res.json({responseCode:201,responseMessage:'You have successfully created your supply chain.',data:result})
			});
	}
	})
	app.post('/status',function(req,res)
	{
		SupplyChain.status(req.body.chain_id,req.body.publicKey,function(err,result)
		{
			if(err)
				return res.json({responseCode:400,responseMessage:err.message})
			else
				return res.json({responseCode:200,responseMessage:result.message,data:result})
		})
	})
	app.post('/updateProduct',function updateProduct(req,res)
	{
		if(!req.body.secret || !req.body.txId)
			return res.json({responseCode:400,responseMessage:'Something is missing.'})
		else
		{
		SupplyChain.updateProduct(req.body.secret,req.body.txId,function(err,result)
			{
				if(err)
					return res.json({responseCode:400,responseMessage:err.message})
				else
					res.json({responseCode:201,responseMessage:'You have successfully created your supply chain.',data:result})
			});
	}
	})
	app.post('/scanTransaction',function(req,res)
	{
		SupplyChain.scanTransaction(req.body.txId,req.body.secret,function(err,result)
		{
			if(err)
				return res.json({responseCode:400,responseMessage:err.message})
			else
				return res.json({responseCode:200,responseMessage:result.message,data:result})
		})
	})
	function getTransectionByPublicKey(req,res) {
		Request({url: 'https://test.bigchaindb.com/api/v1/outputs?public_key='+req.body.publicKey}, function (error, response, body) {
			if(error)
				return res.json({responseCode:400,responseMessage:'Something went wrong'})
			else
				res.json({responseCode:201,responseMessage:'Your transaction details.',data:body})
		 })
	}
	function readTransactionByTx(req,res)
	{
		SupplyChain.readTransaction(req.body.tx,function(err,result)
		{
			if(err)
				return res.json({responseCode:400,responseMessage:'Something went wrong'})
			else
				res.json({responseCode:201,responseMessage:'Your transaction details.',data:result})
		})
	}
	function scanTransaction(req,res)
	{
		SupplyChain.readTransaction(req.body.tx,function(err,result)
		{
			if(err)
				return res.json({responseCode:400,responseMessage:'Something went wrong'})
			else
				res.json({responseCode:201,responseMessage:'Your transaction details.',data:result})
		})
	}
	function transferProduct(req,res)
	{
		SupplyChain.transferOwnership(req.body.txID, req.body.newOwner,req.body.metadata,(err,res)=>{
			if(err)
				return res.json({responseCode:400,responseMessage:'Something went wrong'})
			else
				res.json({responseCode:200,responseMessage:'Your transfer transaction details.',data:res})
		})
	}

app.listen(5555,function(err,result)
{
	if(err)
		console.log("error in listening port")
	else
		console.log("server is listing on 5555")
})


// const driver = require('bigchaindb-driver')
 
// // BigchainDB server instance or IPDB (e.g. https://test.ipdb.io/api/v1/)
// // const API_PATH = 'https://test.ipdb.io/api/v1/'
 
// // Create a new keypair.
// const alice = new driver.Ed25519Keypair()
 
// // Construct a transaction payload
// const tx = driver.Transaction.makeCreateTransaction(
//     // Define the asset to store, in this example it is the current temperature
//     // (in Celsius) for the city of Berlin.
//     { city: 'Berlin, DE', temperature: 22, datetime: new Date().toString() },
 
//     // Metadata contains information about the transaction itself
//     // (can be `null` if not needed)
//     { what: 'My first BigchainDB transaction' },
 
//     // A transaction needs an output
//     [ driver.Transaction.makeOutput(
//             driver.Transaction.makeEd25519Condition(alice.publicKey))
//     ],
//     alice.publicKey
// )
 
// // Sign the transaction with private keys
// const txSigned = driver.Transaction.signTransaction(tx, alice.privateKey)
 
// // Send the transaction off to BigchainDB
// // const conn = new driver.Connection(API_PATH)
 
// conn.postTransaction(txSigned)
//     .then((succ) => console.log("hi",JSON.stringify(succ)))
//     .then(retrievedTx => console.log('Transaction', retrievedTx.id, 'successfully posted.'))