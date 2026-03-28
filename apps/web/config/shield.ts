import { defineConfig } from '@adonisjs/shield'
import app from '@adonisjs/core/services/app'

const shieldConfig = defineConfig({
  /**
   * Configure CSP policies for your app. Refer documentation
   * to learn more
   */
  csp: {
    enabled: true,
    directives: {
      defaultSrc: [`'self'`],
      scriptSrc: app.inProduction
        ? [`'self'`, `'nonce-@nonce'`, 'https://cloud.umami.is', 'https://us-assets.i.posthog.com']
        : [
            `'self'`,
            `'unsafe-inline'`,
            `'unsafe-eval'`,
            'https://cloud.umami.is',
            'https://us-assets.i.posthog.com',
          ],
      styleSrc: [`'self'`, `'unsafe-inline'`],
      imgSrc: [`'self'`, 'data:', 'blob:', 'https://cloud.umami.is'],
      fontSrc: [`'self'`],
      connectSrc: app.inProduction
        ? [
            `'self'`,
            'wss:',
            'https://cloud.umami.is',
            'https://us.i.posthog.com',
            'https://us-assets.i.posthog.com',
          ]
        : [
            `'self'`,
            'ws:',
            'wss:',
            'https://cloud.umami.is',
            'https://us.i.posthog.com',
            'https://us-assets.i.posthog.com',
          ],
      frameSrc: [`'none'`],
      objectSrc: [`'none'`],
      baseUri: [`'self'`],
    },
    reportOnly: false,
    //reportUri: '/csp-report',
  },

  /**
   * Configure CSRF protection options. Refer documentation
   * to learn more
   */
  csrf: {
    enabled: true,
    exceptRoutes: (ctx) => {
      const url = ctx.request.url()
      return url.startsWith('/api/')
    },
    enableXsrfCookie: true,
    methods: ['POST', 'PUT', 'PATCH', 'DELETE'],
  },

  /**
   * Control how your website should be embedded inside
   * iFrames
   */
  xFrame: {
    enabled: true,
    action: 'DENY',
  },

  /**
   * Force browser to always use HTTPS
   */
  hsts: {
    enabled: true,
    maxAge: '180 days',
    includeSubDomains: true,
    preload: true,
  },

  /**
   * Disable browsers from sniffing the content type of a
   * response and always rely on the "content-type" header.
   */
  contentTypeSniffing: {
    enabled: true,
  },
})

export default shieldConfig
