import { BaseModelDto } from '@adocasts.com/dto/base'

export default class BanDto extends BaseModelDto {
  declare uuid: string
  declare userUuid: string
  declare reason: string
  declare expiresAt: string | null

  declare createdAt: string
  declare updatedAt: string

  constructor(ban?: any) {
    super()

    if (!ban) return

    this.uuid = ban.uuid
    this.userUuid = ban.userUuid
    this.reason = ban.reason
    this.expiresAt = ban.expiresAt ? ban.expiresAt! : null
    this.createdAt = ban.createdAt.toISO()!
    this.updatedAt = ban.updatedAt ? ban.updatedAt.toISO()! : ''
  }
}
