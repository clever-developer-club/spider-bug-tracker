module.exports = {

    addUserIDtoOrder : async (req,res,next) => {
        req.query.userId = req.user._id;
        next()
    }

}