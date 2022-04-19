// Import Packages
const jwt = require("jsonwebtoken")
const Response = require("../utils/Response")
const ADMIN = require("../models/Admins")
const bcypt = require("bcrypt")
const Messages = require("../utils/Messages")

const login = async (req, res) => {
	try {
		const { username, password } = req.body

		if (!username || !password) {
			return Response(res)("Please, provide all the details!", null)
		}

		const admin = await ADMIN.getByUsername(username)

		if (!admin) {
			return Response(res)("Not found such user!", null)
		}

		const isMatch = await bcypt.compare(password, admin.pwd)
		if (!isMatch) {
			return Response(res)("Wrong password!", null)
		}

		// access token
		const accessToken = jwt.sign(
			{
				user_id: admin.id,
				role: admin.role,
				username: admin.username,
			},
			process.env.ACCESS_TOKEN,
			{
				expiresIn: "24h",
			}
		)

		// refresh token
		const refreshToken = jwt.sign(
			{
				user_id: admin.id,
				role: admin.role,
				username: admin.username
			},
			process.env.REFRESH_TOKEN
		)

		const user = {
			user_id: admin.id,
			username: admin.username,
			accessToken,
			refreshToken
		}

		return Response(res)(null, { user })
	} catch (error) {
		console.log(error)
		return Response(res)(error, null)
	}
}

const generate = async (req, res) => {
	try {
		const { username, password } = req.body

		if (!username || !password) {
			return Response(res)("Please, provide all the details!", null)
		}

		const admin = await ADMIN.getByUsername(username)

		if (admin) {
			return Response(res)("This user already exists!", null)
		}

		const hash = await bcypt.hash(password, 10)

		const newAdmin = await ADMIN.insertUser(username, hash, "admin", 1)

		return Response(res)(null, newAdmin)
	} catch (error) {
		return Response(res)(error, null)
	}
}

const refresh = async (req, res) => {
	try{
		const { refreshToken } = req.body

		jwt.verify(refreshToken, process.env.REFRESH_TOKEN, async (error, result) => {
			if(error){
				return Response(res)(null, { message: Messages.refresh })
			}

			const admin = await ADMIN.getByUsername(result.username)

			if(!admin){
				return Response(res)(null, { message: Messages.adminNotFound })
			}

			// access token
			const accessToken = jwt.sign(
				{
					user_id: admin.id,
					role: admin.role,
					username: admin.username,
				},
				process.env.ACCESS_TOKEN,
				{
					expiresIn: "24h",
				}
			)

			return Response(res)(null, {
				user_id: admin.id,
				username: admin.username,
				accessToken,
			})
		})

	} catch(error){
		return Response(res)(error, null)
	}
}

module.exports = {
	login,
	generate,
	refresh
}
