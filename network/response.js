exports.success = function (req,res,message,body,status){
    res.status(status||200).send({
        message,body
    })
}
exports.error = function (req,res,message,status){
    res.status(status||500).send({
        message: "ERROR",
        error: message
    })
}