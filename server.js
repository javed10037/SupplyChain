var buffer = require('buffer');
let multichain = require("multichain-node")({
    port: 1234,
    host: '127.0.0.1',
    user: "multichainrpc",
    pass: "FGnt9LYoVJ7TejcANr1saNT5qEDD2Psu5TJZm7f9n7KL"
});
 
// multichain.getInfo((err, info) => {
//     if(err){
//         throw err;
//     }
//     console.log("info:     ",info);
// })
//  multichain.listPermissions((err, info) => {
//     if(err){
//         throw err;
//     }
//     console.log("permissions:       ",info);
// })
// multichain.getAddresses((err, addresses) => {
//  console.log("address::   ",addresses)
//     multichain.createMultiSig({nrequired: 2, keys: addresses}, (err, wallet) => {
//         console.log("wallet:   ",wallet)
//     })
    
// })
// multichain.getNewAddress((err, addresses) => {
 
//  console.log("NEWWWWWWWWWWWWWWWWWWWW address::   ",addresses)
    
// })
// multichain.grant({'addresses':'1A6PqLtW1sxaw6PgKNiDKXAC4tuCM9nf8GZuPz','permissions':'send'},(err, permisssion) => {
//  console.log("permisssion granteed::   ",permisssion)   
// })
// multichain.create({'type':'stream','name':'penny','open':true},(err,stream)=>{
// 	console.log("stream: 	 ",stream,err)
// })
// multichain.createMultiSig({'nrequired':1,'keys':['1A6PqLtW1sxaw6PgKNiDKXAC4tuCM9nf8GZuPz',
// 	'1A6PqLtW1sxaw6PgKNiDKXAC4tuCM9nf8GZuPz']},(err,multiSig)=>{
// 	console.log("multiSig: 	 ",multiSig,err)
// })


function createRawTransactionFunction()
{
	 multichain.listPermissions((err, info) => {
    if(err){
        throw err;
    }
    console.log("permissions:       ",info);
    for(i=0;i<info.length;i++)
    {
    	if(info[i].type == 'issue')
    		issue = info[i]
    }
    if(i>=info.length)
    	console.log("here issue address: ",issue)
    // createrawsendfrom 1CHvLkdEdNLDJ4o87NoLS6sZ3Z57hiMqtzFmnN '{"1Kg3SB3GvJaFCGKa9sgJ2DrpySsBxJi7M8ZHQD":{"issue":{"raw":2000}},"1a3zF2dsHH4pZZaALnjfdJo4SdSEgkdAjJz2QU":{"issue":{"raw":3000}}}' '[{"create":"asset","name":"asset8","multiple":10,"open":true,"details":{"origin":"uk","stage":"one"}}]' send
// {"method":"createrawsendfrom","params":["1CHvLkdEdNLDJ4o87NoLS6sZ3Z57hiMqtzFmnN",{"1Kg3SB3GvJaFCGKa9sgJ2DrpySsBxJi7M8ZHQD":{"issue":{"raw":2000}},"1a3zF2dsHH4pZZaALnjfdJo4SdSEgkdAjJz2QU":{"issue":{"raw":3000}}},[{"create":"asset","name":"asset8","multiple":10,"open":true,"details":{"origin":"uk","stage":"one"}}],"send"],"id":1,"chain_name":"chain1"}
})
}







 // nrequired: 2,
 //            keys: [this.address1, this.address2]





// 1)create stream
// 2)grant permission
// 3)getNewAddress
// 4)getAddresses
// 5)listPermissions
// 6)getInfo
// 7)createRaw
// 8)createMultiSig = Creates a pay-to-scripthash (P2SH) multisig address. Funds sent to this address can only be spent by transactions signed by nrequired of the specified keys. Each key can be a full hexadecimal public key, or an address if the corresponding key is in the node’s wallet. Returns an object containing the P2SH address and corresponding redeem script.



// function rawTransection()
// {
// 	var data = [{"txid" : "01478996f31a479ab7730d09aa8507f2b8dcb8d0473b485c6d9db33aa5751704",
//         "vout" : 1,
// }]
// // {"address":'1A6PqLtW1sxaw6PgKNiDKXAC4tuCM9nf8GZuPz'}
// // var data = '[{"txid":"a1b2...","vout":#},{"txid":"a1b2...","vout":#}]'
// // var data2 = '{"1...":{"asset5":20,"asset6":30},"1...":{"asset5":30,"asset6":20}}'
// 	data = data.toString();
// 	data2 = ['1A6PqLtW1sxaw6PgKNiDKXAC4tuCM9nf8GZuPz'].toString();
// 	var hex = [{data:Buffer.from(data, 'utf8').toString('hex')}]
// 	var hex2 = [{data:Buffer.from(data2, 'utf8').toString('hex')}]
// 	multichain.createRawTransaction(hex,hex2,(err,response)=>{
// 		console.log("createRaw:  			",response,err)
// 	})
// }
// rawTransection();

// Buffer.from(str, 'utf8').toString('hex');

// createrawsendfrom 1... '{}' '[{"create":"stream","name":"stream8","open":false,"details":{"geo":"japan","origin":"BoJ"}}]' send


// ---------------------------------------------------------------------------------------------------------------------------------------
// multichain.issue({address: someAddress, asset: "zcoin", qty: 50000, units: 0.01, details: {hello: "world"}}, (err, res) => {
//     console.log(res)
// })
 
// multichain.sendAssetFrom({from: someAddress, to: someOtherAddress, asset: "zcoin", qty: 5}, (err, tx) => {
//     console.log(tx);
// })
 

 
// multichain.getRawTransaction({txid: someTxId}, (err, tx) => {
 
//     multichain.decodeRawTransaction({"hexstring": tx}, (err, dTx) => {
//         console.log(dTx)
//     })
// })


//---------------------------------------BIGCHAIN DB------------------------------------------------
