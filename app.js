const driver = require('bigchaindb-driver')
const Request = require('request');
// const Async = require('async')
 let bdb = new driver.Connection('https://test.bigchaindb.com/api/v1/', {
   app_id: '158096df',
   app_key: '22bd99ee2b2ac9dc1df35440e1a4c4ec'
})
// function getTransection(tx,callback)
// {
//     Request({url: 'https://test.bigchaindb.com/api/v1/transactions/'+tx}, function (error, response, body) {
//         // console.log("body:::::: ",body)
//         return callback(body);
// });
// }
// // getTransection(); 

// function step(address)
// {
//     counter = 0;
// getTransection('a89c0eaa7c2587a004733dbadcfb0e6485f89bcc41d105a78babcbb055e26938',function(data)
//     {
//         console.log("data in stepOne: ",data );
//         data = JSON.parse(data)
//         Async.forEachLimit(data.asset.data.step,1,function(phase,next)
//         {
//             if(phase.user.publicKey == address)
//             console.log("you having the permission of: ",phase.user."permisssion")
//         else
//         {
//             counter++;
//             if(counter<data.asset.data.step.length)
//                 next();
//             else
//                 console.log("sorry you are not in the cycle")
//         }
//         })
//         // if(data.asset.data.step1.user.publicKey == 'AuSa7SWd9cLA6CjLnHMXY8da1xhBrEDayHGNy8rezGtu')
//         //     console.log("you are elligible to READ this meta data",data.metadata);
//         // else
//         //     console.log("You are not a valid user")
//     });
// }
// bdb.getTransaction('a89c0eaa7c2587a004733dbadcfb0e6485f89bcc41d105a78babcbb055e26938',function(err,response)
// {
//     console.log("errrrrrrrr,responsesssssssss",err,response)
// })




//  step('Dh2Tfpyh9ZxVwdtPSb1wapGbkVwzyZq7bjDb7YHKNcyD')
const alice = new driver.Ed25519Keypair()
 console.log('alice:   ',alice)


 var asset = {
    "step": [{
        "user":{
            "publicKey": "AuSa7SWd9cLA6CjLnHMXY8da1xhBrEDayHGNy8rezGtu",
            "privateKey": "4LekhrsYoaWW7TP6kaqNbKzSPUR3pnKjjv4ZzGYykuKJ",
            "permisssion":"read"
        }
    },{
         "user":{
            "publicKey": "5c166qF17XNtEWKTnYc4osq9NYvn3gWVzY24gcR9LpEM",
              "privateKey": "4npDNftWfCbZAj6dDHH5uZzPMMiS5iF4xuPBCaXb8rLu",
            "permisssion":"write"
        }
    },{
         "user":{
            "publicKey": "Dh2Tfpyh9ZxVwdtPSb1wapGbkVwzyZq7bjDb7YHKNcyD",
            "privateKey": "DjaNxipCcNk2cyWr1Ev4FATJUKwHxsyoihaYuSLmxAUS",
            "permisssion":"update"
        }
    },{
         "user":{
            "publicKey": "D7bSmd9sVodHhgrvaTAduNFdjchg4acpCC2eZxzkJ4pQ",
            "privateKey": "BBfP8fARueM5Xtvfqfndn8QSyv64gVLBgKMee7xVoM6Y",
            "permisssion":"aprrove"
        }
    }],
    datetime: new Date().toString()
 }
 var metadata = {
    "phase1":'admin steps'
 }
// Construct a transaction payload
const tx = driver.Transaction.makeCreateTransaction(
    // Define the asset to store, in this example it is the current temperature
    // (in Celsius) for the city of Berlin.
    asset,
 
    // Metadata contains information about the transaction itself
    // (can be `null` if not needed)
    metadata,
    // A transaction needs an output
    [ driver.Transaction.makeOutput(
            driver.Transaction.makeEd25519Condition(alice.publicKey))
    ],
    alice.publicKey
)
 // console.log("tx:  ",tx);
// Sign the transaction with private keys
const txSigned = driver.Transaction.signTransaction(tx, alice.privateKey)
 // console.log("txSigned:  ",txSigned);
// Send the transaction off to BigchainDB
// const conn = new driver.Connection(bdb)
 
bdb.postTransaction(txSigned)
    // .then(() => bdb.pollStatusAndFetchTransaction(txSigned.id))
    .then(retrievedTx => console.log('Transaction', retrievedTx.id, 'successfully posted.'))
    .catch((unsuccess)=>console.log("unsuccess:   ",unsuccess))





// var log = console.log
// const BigchainDB = require('bigchaindb-driver')
// const bip39 = require('bip39')

// const API_PATH = 'http://localhost:9984/api/v1/'
// const conn = new BigchainDB.Connection(API_PATH, {
//     app_id: '158096df',
//     app_key: '22bd99ee2b2ac9dc1df35440e1a4c4ec'
// })

// const alice = new BigchainDB.Ed25519Keypair(bip39.mnemonicToSeed('seedPhrase').slice(0,32))
// log("alice==>>",alice)

// const painting = {
//     name: 'Meninas',
//     author: 'Diego Rodríguez de Silva y Velázquez',
//     place: 'Madrid',
//     year: '1656'
// }
// function createPaint() {
//     // Construct a transaction payload
//     const txCreatePaint = BigchainDB.Transaction.makeCreateTransaction(
//         // Asset field
//         {
//             painting,
//         },
//         // Metadata field, contains information about the transaction itself
//         // (can be `null` if not needed)
//         {
//             datetime: new Date().toString(),
//             location: 'Madrid',
//             value: {
//                 value_eur: '25000000€',
//                 value_btc: '2200',
//             }
//         },
//         // Output. For this case we create a simple Ed25519 condition
//         [BigchainDB.Transaction.makeOutput(
//             BigchainDB.Transaction.makeEd25519Condition(alice.publicKey))],
//         // Issuers
//         alice.publicKey
//     )
//     // The owner of the painting signs the transaction
//     const txSigned = BigchainDB.Transaction.signTransaction(txCreatePaint,
//         alice.privateKey)

//     // Send the transaction off to BigchainDB
//     conn.postTransactionCommit(txSigned)
//         .then(res => {
//             log("Transaction created===>>>",txSigned.id)
//             // document.body.innerHTML += '<h3>Transaction created</h3>';
//             // document.body.innerHTML += txSigned.id
//             // txSigned.id corresponds to the asset id of the painting
//         })
// }
// createPaint();
// function transferOwnership(txCreatedID, newOwner) {
//     const newUser = new BigchainDB.Ed25519Keypair()
//     // Get transaction payload by ID
//     conn.getTransaction(txCreatedID)
//         .then((txCreated) => {
//             log("txCreated",txCreated)
//             const createTranfer = BigchainDB.Transaction.
//             makeTransferTransaction(
//                 // The output index 0 is the one that is being spent
//                 [{
//                     tx: txCreated,
//                     output_index: 0
//                 }],
//                 [BigchainDB.Transaction.makeOutput(
//                     BigchainDB.Transaction.makeEd25519Condition(newOwner)
//                     )],
//                 {
//                     datetime: new Date().toString(),
//                     value: {
//                         value_eur: '30000000€',
//                         value_btc: '2100',
//                     }
//                 }
//             )
//             // Sign with the key of the owner of the painting (Alice)
//             const signedTransfer = BigchainDB.Transaction
//                 .signTransaction(createTranfer, alice.privateKey)
//             return conn.postTransactionCommit(signedTransfer)
//         })
//         .then(res => {
//             // document.body.innerHTML += '<h3>Transfer Transaction created</h3>'
//             // document.body.innerHTML += res.id
//             log("Transfer Transaction created====>>>",res.id)
//         })
// }
// // transferOwnership(txCreatedID, newOwner);



// // import Orm from 'bigchaindb-orm'
// // console.log("ORM::::::::::::::: ",JSON.stringify(Orm))
// // const bdbOrm = new Orm(
// //     "https://test.bigchaindb.com/api/v1/",
// //     {
// //          app_id: '158096df',
// //          app_key: '22bd99ee2b2ac9dc1df35440e1a4c4ec'
// //     }
// // )

// // console.log("BD ORM::::::::::::::: ",JSON.stringify(bdbOrm))
// // class DID extends Orm {
// //     constructor(entity) {
// //         super(
// //             API_PATH, {
// //                 app_id: '158096df',
//                 app_key: '22bd99ee2b2ac9dc1df35440e1a4c4ec'
//             }
//         )
//         this.entity = entity
//     }
// }
// const car = new BigchainDB.Ed25519Keypair()
// const sensorGPS = new BigchainDB.Ed25519Keypair()

// const userDID = new DID(alice.publicKey)
// const carDID = new DID(car.publicKey)
// const gpsDID = new DID(sensorGPS.publicKey)
// // log("userDID==>",userDID)

// userDID.define("myModel", "https://schema.org/v1/myModel")
// carDID.define("myModel", "https://schema.org/v1/myModel")
// gpsDID.define("myModel", "https://schema.org/v1/myModel")

// userDID.myModel.create({
//         keypair: alice,
//         data: {
//             name: 'Alice',
//             bithday: '03/08/1910'
//         }
//     }).then(asset => {
//         userDID.id = 'did:' + asset.id
//         // document.body.innerHTML +='<h3>Transaction created</h3>'
//         // document.body.innerHTML +=asset.id
//         log(' userDID.id Transaction created==>',asset)
//          updateMileage(asset);
//     })

//   const vehicle = {
//   value: '6sd8f68sd67',
//   power: {
//     engine: '2.5',
//     hp: '220 hp',
//   },
//   consumption: '10.8 l',
// }
// carDID.myModel.create({
//         keypair: alice,
//         data: {
//             vehicle
//         }
//     }).then(asset => {
//         carDID.id = 'did:' + asset.id
//         // document.body.innerHTML +='<h3>Transaction created</h3>'
//         // document.body.innerHTML +=txTelemetrySigned.id
//         log("carDID.id Transaction created ",txTelemetrySigned.id)
//     })
//   gpsDID.myModel.create({
//         keypair: car,
//         data: {
//             gps_identifier: 'a32bc2440da012'
//         }
//     }).then(asset => {
//         gpsDID.id =  'did:' + asset.id
//         // document.body.innerHTML +='<h3>Transaction created</h3>'
//         // document.body.innerHTML +=txTelemetrySigned.id
//           log("gpsDID.id Transaction created ",txTelemetrySigned.id)

//     })    

// function updateMileage(did, newMileage){
//  log("did==>",did)
//     userDID.myModel
//     .retrieve(did.id)
//     .then(assets => {
//         // assets is an array of myModel
//         // the retrieve asset contains the last (unspent) state
//         // of the asset
//         return assets[0].append({
//             toPublicKey: 'GEkKQDKFf5qzi7WwY2VzwBd3VyLhCu1aSaWjSAU7dCpo',
//             keypair: {
//   publicKey: 'GEkKQDKFf5qzi7WwY2VzwBd3VyLhCu1aSaWjSAU7dCpo',
//   privateKey: '7jWaeDMRTdTx6YZkpiRHEBhgoHWURrAAn31n5cuepVRL' },
//             data: { gps_identifier: 'a32bc2440da012' }
//         })
//     })
//     .then(updatedAsset => {
//         did.mileage =  updatedAsset.data.newMileage
//         // document.body.innerHTML +='<h3>Append transaction created</h3>'
//         // document.body.innerHTML +=txTelemetrySigned.id
//         log(' Append transaction created==>',txTelemetrySigned)
//         return updatedAsset
//     })
// }

