import User from '#users/models/user'
import Ban from '#users/models/ban'
import { DateTime } from 'luxon'

export interface BanData {
  reason: string
  expiresAt?: DateTime | null
  deletePosts?: boolean
}

export default class BanService {
  async ban(user: User, bannedByUuid: string, data: BanData): Promise<Ban> {
    user.isBanned = true

    const ban = await Ban.create({
      reason: data.reason,
      bannedByUuid,
      userUuid: user.uuid,
      expiresAt: data.expiresAt ?? null,
      isActive: true,
    })

    await user.related('ban').associate(ban)
    await user.save()

    return ban
  }

  async unban(user: User): Promise<void> {
    user.isBanned = false

    const ban = await Ban.query()
      .where('user_uuid', user.uuid)
      .andWhere('is_active', true)
      .firstOrFail()

    ban.isActive = false
    await ban.save()
    await user.related('ban').dissociate()
    await user.save()
  }
}
