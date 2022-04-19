const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
	const authHeader = req.headers.authorization

	if (authHeader) {
		const token = authHeader.split(" ")[1]

		jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
			if (err) {
				return res.status(401).json({
					error: "Unanauthorized token",
				})
			}
			if (user) {
				req.user = user
				next()
			}
		})
	} else {
		return res.status(401).json({
			error: "Anauthorized",
		})
	}
}
