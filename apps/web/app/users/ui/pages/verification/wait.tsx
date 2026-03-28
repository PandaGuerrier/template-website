import { InferPageProps } from '@adonisjs/inertia/types'
import { Head, useForm } from '@inertiajs/react'
import { Mail, Check, RefreshCw, LogOut, ExternalLink } from 'lucide-react'
import { Button } from '@workspace/ui/components/button'
import { toast } from '@workspace/ui/hooks/use-toast'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@workspace/ui/lib/utils'
import type VerificationController from '#users/controllers/verification_controller'

export default function VerificationWaitPage(
  _props: InferPageProps<VerificationController, 'verify'>
) {
  const { post } = useForm()
  const [timeout, setTimeout] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (timeout > 0) {
      interval = setInterval(() => {
        setTimeout((prev) => prev - 1)
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [timeout])

  const resendMail = () => {
    post('/verification/resend', {
      onSuccess: () => {
        toast.success('Mail renvoyé !')
        setTimeout(60)
      }
    })
  }

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

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-background">
      <Head title="Vérifiez votre Email" />

      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] rounded-full bg-orange-500/10 blur-[120px] mix-blend-screen animate-pulse duration-3000" />
        <div className="absolute bottom-[-20%] right-[20%] w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[100px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-lg"
      >
        <div className={cn(
          "backdrop-blur-xl bg-card/80 border border-white/10 shadow-2xl rounded-3xl overflow-hidden",
          "dark:bg-zinc-900/60 dark:border-white/5"
        )}>
          {/* Header Banner */}
          <div className="bg-orange-500/10 p-8 flex justify-center border-b border-orange-500/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-orange-500/20 to-transparent opacity-50" />
            <motion.div
              initial={{ scale: 0.8, rotate: 5 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
              className="relative z-10 p-4 bg-background rounded-2xl shadow-lg border border-border/50"
            >
              <Mail className="size-12 text-orange-500" />
            </motion.div>
          </div>

          <div className="p-8 space-y-8 text-center">
            <motion.div variants={itemVariants} className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-orange-600 to-amber-400 bg-clip-text text-transparent">
                Vérifiez votre boite mail
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                On vous a envoyé un lien magique. Cliquez dessus pour activer votre compte (c'est rapide promis).
              </p>
            </motion.div>

            {/* Actions Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 gap-3">
              <Button
                size="lg"
                className="w-full gap-2 font-semibold bg-foreground hover:bg-foreground/90 text-background shadow-lg"
                href="/"
              >
                <Check className="size-4" /> J'ai validé mon compte !
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="w-full gap-2 border-border/50 hover:bg-muted/50"
                  onClick={resendMail}
                  disabled={timeout > 0}
                >
                  <RefreshCw className={cn("size-4", timeout > 0 && "animate-spin")} />
                  {timeout > 0 ? `${timeout}s` : 'Renvoyer'}
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

            <motion.div variants={itemVariants} className="pt-2 border-t border-border/40">
              <Button
                variant="link"
                className="text-destructive hover:text-destructive/80 gap-2 h-auto p-0"
                href="/logout"
              >
                <LogOut className="size-3" /> Me déconnecter
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
