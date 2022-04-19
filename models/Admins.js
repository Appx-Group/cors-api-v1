const { Model } = require("objection")
const knex = require("../config/db")
Model.knex(knex)

class Admins extends Model {
	static get tableName() {
		return "admins"
	}

	static get jsonSchema() {
		return {
			type: "object",
			required: ["username", "pwd"],

			properties: {
				username: { type: "string", minLength: 1, maxLength: 255 },
				pwd: { type: "string", minLength: 1, maxLength: 255 },
				role: { type: "string", minLength: 1, maxLength: 255 },
				status: { type: "number", minLength: 1, maxLength: 1 },
			},
		}
	}
	static async getByUsername(username) {
		try {
			return await this.query().where({ username }).first()
		} catch (error) {
			throw error
		}
	}

	static async insertUser(username, pwd, role, status) {
		try {
			return await this.query().insert({
				username,
				pwd,
				role,
				status,
			})
		} catch (error) {
			throw error
		}
	}
}

module.exports = Admins
