import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import User from '#users/models/user'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Ban extends BaseModel {
  @column({ isPrimary: true })
  declare uuid: string

  @column()
  declare reason: string

  @column()
  declare bannedByUuid: string

  @belongsTo(() => User)
  declare bannedBy: BelongsTo<typeof User>

  @column()
  declare userUuid: string

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column()
  declare expiresAt: DateTime | null

  @column()
  declare isActive: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(ban: Ban) {
    ban.uuid = crypto.randomUUID()
  }
}
