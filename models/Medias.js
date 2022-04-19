const { Model } = require("objection")
const knex = require("../config/db")
const Pagination = require("../utils/Pagination")

Model.knex(knex)

class Media extends Model {
	static get tableName() {
		return "media"
	}

	static get jsonSchema() {
		return {
			type: "object",
			properties: {
				image_name: { type: "string" },
				client_id: { type: "number" },
			},
		}
	}

	static async add(image_name, client_id) {
		try {
			const media = await this.query().insert({
				image_name,
				client_id,
			})
			return media
		} catch (error) {
			throw error
		}
	}

	static async delete(image_name) {
		try {
			const media = await this.query().where({ image_name }).del()
			return media
		} catch (error) {
			throw error
		}
	}
}

module.exports = Media
