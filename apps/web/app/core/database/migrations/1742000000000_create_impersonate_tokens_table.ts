import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'impersonate_tokens'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('uuid').primary()
      table
        .uuid('original_user_uuid')
        .notNullable()
        .references('uuid')
        .inTable('users')
        .onDelete('CASCADE')
      table
        .uuid('impersonated_user_uuid')
        .notNullable()
        .references('uuid')
        .inTable('users')
        .onDelete('CASCADE')
      table.string('token_hash', 64).notNullable().unique()
      table.timestamp('expires_at').notNullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()

      table.index(['token_hash'])
      table.index(['original_user_uuid'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
