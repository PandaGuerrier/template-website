import env from '#start/env'
import { defineConfig, transports } from '@adonisjs/mail'

const mailConfig = defineConfig({
  default: 'mailjet',
  from: {
    name: env.get('MAIL_FROM_NAME', ''),
    address: env.get('EMAIL_FROM', ''),
  },

  /**
   * The mailers object can be used to configure multiple mailers
   * each using a different transport or same transport with different
   * options.
   */
  mailers: {
    mailjet: transports.smtp({
      host: 'in-v3.mailjet.com',
      port: 587,
      secure: false,
      auth: {
        user: env.get('MAILJET_API_KEY', ''),
        pass: env.get('MAILJET_SECRET_KEY', ''),
        type: 'login'
      }
    }),
  },
})

export default mailConfig

declare module '@adonisjs/mail/types' {
  export interface MailersList extends InferMailers<typeof mailConfig> {}
}
