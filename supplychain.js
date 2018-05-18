var log = console.log
// const bip39 = require('bip39')
const ChainModel = require('./chainModel')
const BigchainDB = require('bigchaindb-driver')
const API_PATH = 'https://test2.bigchaindb.com/api/v1/'
const conn = new BigchainDB.Connection(API_PATH, {
    app_id: '40921916',
    app_key: 'bc56ce9342c899c328d4e16b660e2901'
})

//----------------------------------------create product/first transaction--------------------------------------------
function createProduct(asset, metadeta, cb) {
    secret = new BigchainDB.Ed25519Keypair()
    log(metadeta)
    const txData = BigchainDB.Transaction.makeCreateTransaction(
        asset, metadeta, [BigchainDB.Transaction.makeOutput(
            BigchainDB.Transaction.makeEd25519Condition(secret.publicKey))],
        secret.publicKey
    )
    log("txData: ", JSON.stringify(txData))
    const txSigned = BigchainDB.Transaction.signTransaction(txData, secret.privateKey)
    log("txSigned: ", JSON.stringify(txSigned))
    conn.postTransaction(txSigned)
        .then((res) => {
            log("res:---------------------- ", res.id);
            ChainModel.create({
                    name: asset.name,
                    ruleId: res.id,
                    currentTx: res.id,
                    publickey: secret.publicKey,
                    privatekey: secret.privateKey
                })
                .then((success) => {
                    log("success:::::::::::::::::;", success)
                    return cb(null, res)
                })
        })
        .catch((unsuc) => {
            log("in createProduct:  ", unsuc)
        })
}
//----------------------------------------create product/first transaction--------------------------------------------
function status(chain_id, publicKey, cb) {
    ChainModel.findOne({
            _id: chain_id
        })
        .then((success) => {
            // log("success:::::::::::::::::;",success)
            readTransaction(success.currentTx, function(err, result) {
                if (err)
                    cb(err)
                else {
                    log("=>>>> ", result.metadata.data.approval)
                    if (result.metadata.data.approval == publicKey)
                        return ({
                            code: 400,
                            message: 'This package is not in your scope.'
                        })
                    else {
                        result.message = "txData"
                        return cb(null, result)
                    }
                }
            })
        })
        .catch((unsuc) => {
            log("in createProduct:  ", unsuc)
        })
}
//----------------------------------------update product/first transaction--------------------------------------------
function updateProduct(secret, txId, cb) {
    readTransaction(txId, function(err, result) {
        if (err)
            return (err, null);
        else {
            console.log("222222222222222222", result.metadata.data.approval)
            if (result.metadata.data.approval == secret.publicKey) {
                console.log("33333333333333333")

                function indexValue(element) {
                    return element.user.publicKey == secret.publicKey;
                }
                var index = result.asset.data.step.findIndex(indexValue);
                if (index < result.asset.data.step.length - 1)
                {
                    message = 'Read for scan'
                    result.metadata.data.approval = result.asset.data.step[index + 1].user.publicKey
                }
                else
                    message = null
                    result.metadata.data.approval = "scan"
                result.metadata.attached = "attachment"
                const txData = BigchainDB.Transaction.makeCreateTransaction(result.asset.data, result.metadata, [BigchainDB.Transaction.makeOutput(
                        BigchainDB.Transaction.makeEd25519Condition(secret.publicKey))],
                    secret.publicKey
                )
                const txSigned = BigchainDB.Transaction.signTransaction(txData, secret.privateKey)
                conn.postTransaction(txSigned)
                    .then((res) => {
                        // log("res--------------------",res)
                        ChainModel.findOneAndUpdate({currentTx: txId}, {currentTx: res.id,$push: {txId: res.id}}, {new: true})
                            .then((success) => {
                                if(message)
                                return cb(null, message)
                            else
                                return cb(null, success)
                            })
                            .catch((unsuccess) => {
                                return cb({
                                    message: unsuccess
                                })
                            })

                    })
                    .catch((unsuc) => {
                        log("in createProduct:  ", unsuc)
                    })
            } else
                return cb({
                    message: 'You can not make this transaction'
                })
        }
    })

}
//------------------------------------------Read transaction--------------------------------------------------------
function readTransaction(tx, cb) {
    conn.getTransaction(tx)
        .then((success) => {
            return cb(null, success)
        })
        .catch((unsucess) => {
            log("in readTransaction: ", unsucess)
        })
}


//-------------------------------------------Scan transaction-------------------------------------------------------
function scanTransaction(tx, newOwner, cb) {
    log("000000000")
    conn.getTransaction(tx)
        .then((success) => {
            log("1111111111111111")
            if (success.metadata.data.approval == "scan") {
                metadata = {
                    "metadata": {
                        "data": {
                            "approval": "transfer",
                            "isapproved": 0
                        }
                    }
                }
                 ChainModel.findOne({currentTx: tx})
                 .then((success)=>{
                    log("22222222222222222222")
                    if(success)
                transferOwnership(success.ruleId, newOwner, metadata, function(err, result) {
                    if (err) {
                        cb({message:err.message},null)
                    } else {

                    ChainModel.findOneAndUpdate({currentTx: txId}, {currentTx: result.id,$push: {txId: result.id}}, {new: true})
                            .then((success) => {
                                if(message)
                                return cb(null, message)
                            else
                                return cb(null, success)
                            })
                            .catch((unsuccess) => {
                                return cb({
                                    message: unsuccess
                                })
                            })
                    }
                })
            else
                cb({message:'No transaction found with this tx id.'},null)
                 })
                 .catch((unsuccess)=>{
                    cb({message:'Something went wrong'},null)
                 })

            } else {
                cb({
                    message: 'Sorry this product is still in verification process.'
                }, null)
            }
        })
        .catch((unsucess) => {
            log("in readTransaction: ", unsucess)
        })
}

//-----------------------------------------transfer transaction------------------------------------------------------
function transferOwnership(txCreatedID, newOwner, value,cb) {
    conn.getTransaction(txCreatedID)
        .then((txCreated) => {
            log("3333333333333333333",txCreated)
            const createTranfer = BigchainDB.Transaction.
            makeTransferTransaction(
                [{
                    tx: txCreated,
                    output_index: 0
                }], [BigchainDB.Transaction.makeOutput(
                    BigchainDB.Transaction.makeEd25519Condition(newOwner.publicKey)
                )],
                value
            )
            const signedTransfer = BigchainDB.Transaction
                .signTransaction(createTranfer, newOwner.privateKey)
            return conn.postTransactionCommit(signedTransfer)
        })
        .then(res => {
            log("4444444444",res)
            return cb(null, res)
            // log("Transfer Transaction created====>>>",res.id)
        })
        .catch((unsuccess)=>{
            log("5555555555555555",unsuccess)
            cb(unsuccess,null)
        })
}

module.exports = {
    createProduct: createProduct,
    status: status,
    updateProduct: updateProduct,
    scanTransaction: scanTransaction
}