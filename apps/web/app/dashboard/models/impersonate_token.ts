import { createHash } from 'node:crypto'
import { beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import BaseModel from '#common/models/base_model'
import User from '#users/models/user'

export default class ImpersonateToken extends BaseModel {
  static readonly TABLE_NAME = 'impersonate_tokens'
  static readonly TOKEN_EXPIRY_HOURS = 2

  @column({ isPrimary: true })
  declare uuid: string

  @column()
  declare originalUserUuid: string

  @column()
  declare impersonatedUserUuid: string

  @column()
  declare tokenHash: string

  @column.dateTime()
  declare expiresAt: DateTime

  @belongsTo(() => User, { foreignKey: 'originalUserUuid' })
  declare originalUser: BelongsTo<typeof User>

  @belongsTo(() => User, { foreignKey: 'impersonatedUserUuid' })
  declare impersonatedUser: BelongsTo<typeof User>

  @beforeCreate()
  static assignUuid(token: ImpersonateToken) {
    token.uuid = randomUUID()
  }

  static hashToken(plainToken: string): string {
    return createHash('sha256').update(plainToken).digest('hex')
  }

  static async createForImpersonation(
    originalUserUuid: string,
    impersonatedUserUuid: string,
    plainToken: string
  ): Promise<ImpersonateToken> {
    return ImpersonateToken.create({
      originalUserUuid,
      impersonatedUserUuid,
      tokenHash: ImpersonateToken.hashToken(plainToken),
      expiresAt: DateTime.now().plus({ hours: ImpersonateToken.TOKEN_EXPIRY_HOURS }),
    })
  }

  static async verifyAndConsume(
    plainToken: string,
    originalUserUuid: string
  ): Promise<ImpersonateToken | null> {
    const tokenHash = ImpersonateToken.hashToken(plainToken)

    const record = await ImpersonateToken.query()
      .where('token_hash', tokenHash)
      .where('original_user_uuid', originalUserUuid)
      .where('expires_at', '>', DateTime.now().toSQL()!)
      .first()

    if (!record) return null

    await record.delete()

    return record
  }
}
