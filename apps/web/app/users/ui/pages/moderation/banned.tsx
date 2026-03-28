import { Head } from '@inertiajs/react'
import { Ban, Lock, Mail, ExternalLink, LogOut, ShieldAlert, ShieldCheck } from 'lucide-react'
import { Button } from '@workspace/ui/components/button'
import BanDto from '#users/dtos/ban'
import { motion } from 'framer-motion'
import { cn } from '@workspace/ui/lib/utils'
import { formatRemainingTime } from '#dashboard/ui/utils/utils'
import CaptchaImp from '#users/ui/components/captcha_imp'
import { useState } from 'react'

export default function BannedPage({ ban }: { ban: BanDto }) {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  const isPermanent = !ban.expiresAt
  const [captchaAttempts, setCaptchaAttempts] = useState(0)

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-background">
      <Head title="Compte Banni" />

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-destructive/10 blur-[120px] mix-blend-screen animate-pulse duration-3000" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-orange-500/10 blur-[100px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-lg"
      >
        <div
          className={cn(
            'backdrop-blur-xl bg-card/80 border border-white/10 shadow-2xl rounded-3xl overflow-hidden',
            'dark:bg-zinc-900/60 dark:border-white/5'
          )}
        >
          {/* Header Banner */}
          <div className="bg-destructive/10 p-8 flex justify-center border-b border-destructive/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-destructive/20 to-transparent opacity-50" />
            <motion.div
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
              className="relative z-10 p-4 bg-background rounded-2xl shadow-lg border border-border/50"
            >
              <ShieldAlert className="size-12 text-destructive" />
            </motion.div>
          </div>

          <div className="p-8 space-y-8 text-center">
            <motion.div variants={itemVariants} className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
                Compte Suspendu
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                L'accès à votre compte a été restreint suite au non-respect de nos règles
                communautaires.
              </p>
            </motion.div>

            {/* Ban Details Card */}
            <motion.div
              variants={itemVariants}
              className="bg-muted/50 rounded-xl p-4 text-left border border-border/50 space-y-3"
            >
              <div className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 flex items-center gap-1.5">
                  <Ban className="size-3" /> Motif de la sanction
                </span>
                <p className="font-medium text-foreground">{ban.reason}</p>
              </div>

              <div className="h-px bg-border/50 w-full" />

              <div className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 flex items-center gap-1.5">
                  <Lock className="size-3" /> Expiration
                </span>
                <p
                  className={cn(
                    'font-medium',
                    isPermanent ? 'text-destructive' : 'text-foreground'
                  )}
                >
                  {ban?.expiresAt ? `Expire ${formatRemainingTime(ban.expiresAt)}` : 'Permanent'}
                </p>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div variants={itemVariants} className="space-y-3 pt-2">
              <Button
                size="lg"
                variant="destructive"
                className="w-full gap-2 font-semibold shadow-lg shadow-destructive/20 hover:shadow-destructive/30 transition-all"
                href="/logout"
              >
                <LogOut className="size-4" /> Se déconnecter
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="w-full gap-2 border-border/50 hover:bg-muted/50"
                  href="mailto:jules.lofficial@efrei.net?subject=Réclamation%20Bannissement"
                >
                  <Mail className="size-4" /> Réclamation
                </Button>
                <Button
                  variant="ghost"
                  className="w-full gap-2 hover:bg-muted/50 text-muted-foreground"
                  href="https://outlook.office.com/mail/"
                  target="_blank"
                >
                  Outlook <ExternalLink className="size-3 opacity-50" />
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Captcha unban section */}
          <motion.div
            variants={itemVariants}
            className="mx-8 mb-6 rounded-xl border border-border/50 overflow-hidden"
          >
            <div className="bg-muted/30 px-4 py-3 border-b border-border/50 flex items-center gap-2">
              <ShieldCheck className="size-4 text-primary" />
              <span className="text-sm font-semibold">Contester le bannissement</span>
            </div>
            <div className="p-4 space-y-3">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Prouvez que vous êtes humain pour soumettre une demande de débannissement
                automatique. Complétez les vérifications de sécurité ci-dessous.
              </p>
              {captchaAttempts > 0 && (
                <p className="text-xs text-amber-500/80">
                  {captchaAttempts === 1
                    ? 'Bonne réponse ! Une dernière vérification...'
                    : captchaAttempts === 2
                      ? 'Presque ! Le système confirme votre identité...'
                      : captchaAttempts === 3
                        ? 'Encore une étape de sécurité...'
                        : captchaAttempts < 7
                          ? `Vérification ${captchaAttempts + 1}/∞ en cours...`
                          : 'Le système de vérification analyse votre profil...'}
                </p>
              )}
              <CaptchaImp onAttempt={setCaptchaAttempts} />
            </div>
          </motion.div>

          <div className="px-8 pb-6 justify-center flex">
            <p className="text-xs text-muted-foreground/40 text-center">
              ID: {ban.uuid?.slice(0, 8)} • Si vous pensez qu'il s'agit d'une erreur,
              contactez-nous.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
