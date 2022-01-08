module.exports = {

	// @desc      Get Developers
    // @route     GET /api/v1/developers
    // @access    Private

    getDevelopers : async (req,res) => {
        if(res.results.err){
            return res.status(404).json(res.results)
        }else if(res.results.metadata.count == 0){
            return res.status(404).json({
                error : true,
                metadata : {
                    msg : "No Developers found."
                }
            })
        }else{
            return res.status(200).json(res.results)
        }
    }

}