const aws = require("aws-sdk")
const Busboy = require("busboy")

const s3 = new aws.S3({
	region: process.env.BUCKET_REGION,
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

function single(request, folder) {
	return new Promise(async (resolve, reject) => {
		const headers = request.headers
		const busboy = Busboy({ headers })
		// you may need to add cleanup logic using 'busboy.on' events
		busboy.on("error", (err) => reject(err))
		busboy.on(
			"file",
			async function (
				fieldName,
				fileStream,
				fileName,
				encoding,
				mimeType
			) {
				console.log(mimeType)
				const keyName = `${folder}/${Date.now().toString()}_${fileName.filename}`
				const params = {
					Bucket: process.env.BUCKET_NAME,
					Key: keyName,
					Body: fileStream,
					ContentType: mimeType,
					ACL: "public-read",
				}
				s3.upload(params)
					.promise()
					.then((data) => resolve(data))
			}
		)
		busboy.on("field", function (fieldname, val) {
			request.body[fieldname] = val
		})
		request.pipe(busboy)
	})
}

function uploadMultiple(request, folder) {
	s3_files = []
	return new Promise(async (resolve, reject) => {
		const headers = request.headers
		const busboy = Busboy({ headers })
		// you may need to add cleanup logic using 'busboy.on' events
		busboy.on("error", (err) => reject(err))
		busboy.on(
			"file",
			async function (
				fieldName,
				fileStream,
				fileName,
				encoding,
				mimeType
			) {
				const keyName = `${folder}/${Date.now().toString()}_${fileName.filename}`
				s3_files.push(keyName)
				
				const params = {
					Bucket: process.env.BUCKET_NAME,
					Key: keyName,
					Body: fileStream,
					ContentType: mimeType,
					ACL: "public-read",
				}
				s3.upload(params)
					.promise()
					.then((data) => {
						request.s3_files.push(data)
					})
			}
		)

		busboy.on("field", function (fieldname, val) {
			request.body[fieldname] = val
		})
		busboy.on("finish", function () {
			request.s3_files = s3_files
			return resolve(request)
		})
		request.pipe(busboy)
	})
}

function deleteOne(key) {
	return s3.deleteObject(
		{
			Bucket: process.env.BUCKET_NAME,
			Key: `${key}`,
		},
		function (err, data) {}
	)
}

module.exports = {
	single,
	uploadMultiple,
	deleteOne,
}