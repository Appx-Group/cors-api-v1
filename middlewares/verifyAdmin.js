const jwt = require("jsonwebtoken")

module.exports.verify_admin = (req, res, next) => {
	const authHeader = req.headers.authorization

	if (authHeader) {
		const token = authHeader.split(" ")[1]

		jwt.veirfy(token, process.env.ACCESS_TOKEN, (err, admin) => {
			if (err) {
				res.status(401).json({
					error: "Unanauthorized token",
				})
			}
			req.admin = admin
			next()
		})
	} else {
		res.status(401).json({
			error: "Anauthorized",
		})
	}
}
