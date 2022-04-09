const getError = require('../utils/dbErrorHandler')

module.exports = {

    getDocumentbyId :  (model,populate,filter) => async (req,res,next) =>  {
        try{

            if(!res.locals.resourceId){
                res.results = {
                    err : true,
                    metadata : {
                        msg : "Id is not specified."
                    }
                }
                next()
            }

            let query = model.findOne({
				'_id' : res.locals.resourceId,
				...(filter || {})
			})

            if(req.query.fields){
                let selectStr = req.query.fields.split(',').join(' ');
                query = query.select(selectStr)
            }

            if(populate){
                query = query.populate(populate)
            }
            
            const result = await query

            res.results = {
                err : false,
                data : result
            }
        }
        catch(error){
            res.results = {
                err : true,
                metadata : {
                    msg : getError(error)
                }
            }
        }

        next()
    },

    getDocuments : (model,populate,filter,isRestricted) => async (req,res,next) => {
		
        try{
			
            let reqQuery = { 
				...req.query,
				...(filter || {}) 
			}

			if(res.locals.filterIds){
				reqQuery['_id'] = { $in : res.locals.filterIds }
			}
            
            const removeFields = ['fields', 'sort', 'page', 'limit']
            removeFields.forEach((param) => delete reqQuery[param])
            
            const comparisonFields = ['gt','gte','lt','lte','in']
            for(let key of Object.keys(reqQuery)){
                if(comparisonFields.includes(key)){
                    let temp = reqQuery[key]
                    delete reqQuery[key]
                    reqQuery[`$${key}`] = temp
                }else if(typeof reqQuery[key] === 'string' || reqQuery[key] instanceof String){
					reqQuery[key] = new RegExp(reqQuery[key],'i')
				}
            }

            let page = req.query.page? Math.max(Number(req.query.page),1) : 1
            let limit = Number(req.query.limit) || 10
            let startIndex = (page - 1) * limit;
            let endIndex = page * limit;
            let total = await model.countDocuments();
            
            let query = model.find(reqQuery).skip(startIndex).limit(limit)

            if(req.query.fields){
                let selectStr = req.query.fields.split(',').join(' ');
                query = query.select(selectStr)
            }

            if(req.query.sort){
                let sortStr = req.query.sort.split(',').join(' ');
                query = query.sort(sortStr)
            }else{
                query = query.sort("-updatedAt")
            }

            if(populate){
                query = query.populate(populate)
            }
            
            let results = await query

			if(isRestricted) results = results.filter(project => project.hasMember(req.user._id));

            res.results = {
                err : false,
                metadata : {
                    count: results.length,
                    pagination: {
                        page,
                        limit,
                        prev : startIndex > 0 ? page-1 : null,
                        next : total > endIndex ? page+1 : null
                    }
                },
                data : results
            }
        }
        catch(error){
            console.log(error)
            res.results = {
                err : true,
                metadata : {
                    msg : getError(error)
                }
            }
        }

        next()
    }

}