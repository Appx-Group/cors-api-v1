const Medias = require("../models/Medias")
// const Uploader = require("../utils/s3Uploader")
const Uploader = require("../utils/Uploader")
const Messages = require("../utils/Messages")
const Response = require("../utils/Response")
const fs = require('fs')



exports.uploadSingle = async (req, res) => {
	try{
        const image_name = "http://idp.bronme.uz/images/" + req.file.filename

		await Medias.add(image_name, req.user.user_id)

        return Response(res)(null, { image_name })
	} catch (error) {
        console.log(error)
        return Response(res)(error, null)
	}
}


// exports.uploadMultiple = async (req, res) => {
//     try{
//         const folder = req.params.folder
//         await Uploader.uploadMultiple(req, folder)
//         const data = req.s3_files

//         data.forEach(async (image, index) => {
//             data[index] = `https://${process.env.BUCKET_NAME}.s3.${process.env.BUCKET_REGION}.amazonaws.com/${image}`
//             await Medias.add(data[index], req.user.user_id)
//         })

//         return Response(res)(null, { images: data })
//     } catch (error) {
//         console.log(error)
//         return Response(res)(error, null)
//     }
// }


exports.remove = async (req, res) => {
	try{
		// const key = req.body.image?.split(`https://${process.env.BUCKET_NAME}.s3.${process.env.BUCKET_REGION}.amazonaws.com/`)[1]

        // if(key === undefined){
        //     return Response(res)({ message: Messages.imageCheck })
		// }

        // Uploader.deleteOne(key)
        
        const path = `./public/${req.body.image.split("images/")[1]}`


        try {
            await Medias.delete(req.body.image)
            fs.unlinkSync(path)
            return Response(res)(null, Messages.deleted)
            //file removed
        } catch(error) {    
            return Response(res)(null, {
                message: Messages.notExistsImage
            })
        }
	} catch (error) {
		console.log(error)
        return Response(res)(error, null)
	}
}


// exports.removeMultiple = async (req, res) => {
// 	try{
//         const images = req.body.images.split(',')

//         images.forEach(async image => {
//             const key = image?.split(`https://${process.env.BUCKET_NAME}.s3.${process.env.BUCKET_REGION}.amazonaws.com/`)[1]
    
//             if(key === undefined){
//                 return Response(res)({ message: Messages.imageCheck })
//             }
    
//             Uploader.deleteOne(key)
//             await Medias.delete(image)
//         })

//         return Response(res)(null, Messages.deleted)
// 	} catch (error) {
// 		console.log(error)
//         return Response(res)(error, null)
// 	}
// }