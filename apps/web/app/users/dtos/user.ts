import { BaseModelDto } from '@adocasts.com/dto/base'

import User from '#users/models/user'
import Ban from '#users/models/ban'
import BanDto from '#users/dtos/ban'
import RoleDto from '#users/dtos/role'

export default class UserDto extends BaseModelDto {
  declare uuid: string
  declare roleUuid: string
  declare role: RoleDto
  declare fullName: string | null
  declare email: string
  declare avatarUrl: string | null
  declare avatar: any | null
  declare year: number | null
  declare program: string | null
  declare track: string | null
  declare campus: string | null
  declare preferences: object | null
  declare isBanned: boolean | null
  declare isEmailVerified: boolean | null
  declare ban: BanDto | null

  declare createdAt: string
  declare updatedAt: string

  constructor(user?: User) {
    super()

    if (!user) return

    this.uuid = user.uuid
   // this.roleUuid = user.roleUuid
    this.fullName = user.fullName
    this.email = user.email
    this.createdAt = user.createdAt.toISO()!
    this.updatedAt = user.updatedAt ? user.updatedAt.toISO()! : ''
    this.year = user.year
    this.program = user.program
    this.track = user.track
    this.campus = user.campus
    this.preferences = user.preferences
    this.isBanned = user.isBanned || false
    this.ban = new BanDto(user.ban as Ban)
    this.role = new RoleDto(user.role)

    this.isEmailVerified = user.isEmailVerified

    const thumbnail = user.avatar?.getVariant('thumbnail')?.url
    this.avatarUrl = thumbnail ? thumbnail : user.avatarUrl

    this.avatar = user.avatar

  }

  toJSON(): any {
    return {
      ...this,
    }
  }

  static fromJson(json: any): UserDto {
    const dto = new UserDto()
    Object.assign(dto, json)

    if (json.role) {
      dto.role = RoleDto.fromJson(json.role)
    }

    return dto
  }
}
