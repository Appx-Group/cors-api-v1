module.exports = require("knex")({
	client: "mysql2",
	connection: {
		host: process.env.DB_HOST,
		database: process.env.DB_DBNAME,
		user: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
	},
	pool: {
		min: 2,
		max: 10,
	},
})
