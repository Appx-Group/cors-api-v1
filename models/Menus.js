const { Model } = require("objection");
const knex = require("../config/db");

Model.knex(knex);

class Menu extends Model {
  static get tableName() {
    return "menu";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title"],
      properties: {
        title: { type: "string", minLength: 1, maxLength: 255 },
        title_ru: { type: "string", minLength: 1, maxLength: 255 },
        title_uz: { type: "string", minLength: 1, maxLength: 255 },
        parent_id: { type: "number" },
      },
    };
  }

  // Get menu by slug
  static async getBySlug(slug) {
    try {
      const menu = this.query().select("*").findOne({ slug });
      return menu;
    } catch (error) {
      throw error;
    }
  }

  // Get menu by id
  static async getById(id) {
    try {
      const menu = this.query().select("*").findOne({ id });
      return menu;
    } catch (error) {
      throw error;
    }
  }

  // Get menu all
  static async getAll() {
    try {
      const menu = await this.query()
        .select("menu.*", "pages.slug")
        .leftJoin("pages", "menu.id", "pages.menu_id")
        .orderBy([
          { column: "parent_id", order: "asc" },
          { column: "position", order: "asc" },
        ]);
      return menu;
    } catch (error) {
      throw error;
    }
  }

  // Create menu
  static async create(body) {
    try {
      const count = await this.query().count("*").where({
        parent_id: 0
      })

      const menu = await this.query().insert({
        ...body,
        position: count[0]["count(*)"] + 1
      });

      return menu;
    } catch (error) {
      throw error;
    }
  }

  // Update menu
  static async update(id, body) {
    try {
      const menu = await this.query().patch(body).where({ id });
      
      return menu;
    } catch (error) {
      throw error;
    }
  }


  // Delete menu
  static async delete(id) {
    try {
      const oneMenu = await this.query().findOne({ id })

      const changing = await this.query().decrement({
        position: 1
      }).where("position", "<", oneMenu.position)

      if(!changing){
        return false
      }

      const menu = await this.query()
        .where({
          id,
        })
        .andWhere({
          parent_id: id,
        })
        .del();
      return menu;
    } catch (error) {
      throw error;
    }
  }

  static async getMenuById(id) {
    try {
      const menu = await this.query().findOne({ id });
      return menu;
    } catch (error) {
      throw error;
    }
  }

  static async changePosition(body) {
    try {
      const { id, parent_id, position } = body

      const menu = await this.query().findOne({ id })

      if(!menu){
        return false
      }
      
      const menus = await this.query().where({
        parent_id
      })
      
      if(parent_id !== menu.parent_id){
          const count = await this.query().count("*").where({
            parent_id
          })

          await this.query().where({ parent_id: menu.parent_id }).andWhere("position", ">", menu.position).decrement("position", 1)
          
          const changing = await this.query().patch({
            parent_id,
            position: count[0]["count(*)"] + 1
          }).where({
            id
          })
          
          if(!changing){
            return false
          }

          return changing
      }

      if(position > menus.length || position < 1){
        return "positionError"
      }

      if(position < menu.position){
        await this.query().where({ parent_id: menu.parent_id }).andWhere("position", "<=", menu.position).andWhere("position", ">=", position).increment("position", 1)
      } else {
        await this.query().where({ parent_id: menu.parent_id }).andWhere("position", ">=", menu.position).andWhere("position", "<=", position).decrement("position", 1)
      }

      const changing = await this.query().patch({
        parent_id,
        position
      }).where({
        id
      })
      
      if(!changing){
        return false
      }

      return changing;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Menu;
