import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'bans'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('uuid').primary()
      table.string('reason').notNullable().defaultTo("Aucune raison spécifiée")
      table
        .uuid('banned_by_uuid')
        .notNullable()
        .references('uuid')
        .inTable('users')
        .onDelete('CASCADE')
      table
        .uuid('user_uuid')
        .notNullable()
        .references('uuid')
        .inTable('users')
        .onDelete('CASCADE')
      table.timestamp('expires_at').nullable()

      table.boolean('is_active').notNullable().defaultTo(true)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
