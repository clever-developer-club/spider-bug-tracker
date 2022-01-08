const Image = require('../models/Image')

module.exports = {
    
    uploadImages : (id,type,images) => {
        if(!images || images.length == 0) {
            return new Promise((resolve) => resolve([]))
        }
        let promises = []
        for (let i of images){
            const image = new Image()
            promises.push(image.upload(id,i,type)
            .then(async (id) => {
                if(id){
                    await image.save()
                }
                return id
            }))
        }
        return Promise.all(promises)
    },

    deleteImages : (images) => {
        if(!images || images.length == 0) {
            return new Promise((resolve) => resolve([]))
        }
        let promises = []
        for(let id of images){
            promises.push(Image.findById(id)
            .then(async (data) => {
                let id = null
                if(data){
                    id = data._id.toString()
                    await data.deleteOne()
                }
                return id
            }))
        }
        return Promise.all(promises)
    }
}