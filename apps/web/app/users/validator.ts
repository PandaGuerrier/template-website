import vine from '@vinejs/vine'

export const configureProfileValidator = vine.compile(
  vine.object({
    year: vine.number().min(1).max(5).optional(),
    program: vine.string().trim().maxLength(255).optional(),
    track: vine.string().trim().maxLength(255).optional(),
    campus: vine.string().trim().maxLength(255).optional(),
  })
)

export const updatePreferencesValidator = vine.compile(
  vine.object({
    anonyme_rules_view: vine.boolean().optional(),
    onboarding_completed: vine.boolean().optional(),
  })
)

export const createBanValidator = vine.compile(
  vine.object({
    reason: vine.string().trim().maxLength(1000),
    expiresAt: vine.string().nullable(),
    userUuid: vine.string().uuid(),
    deletePosts: vine.boolean().optional(),
  })
)

export const deleteAccountValidator = vine.compile(
  vine.object({
    password: vine.string(),
  })
)

