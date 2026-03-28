import { InferPageProps } from '@adonisjs/inertia/types'
import { Link, Head } from '@inertiajs/react'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from '@workspace/ui/components/button'
import { motion } from 'framer-motion'
import { cn } from '@workspace/ui/lib/utils'
import type VerificationController from '#users/controllers/verification_controller'

export default function VerificationSuccessPage(_props: InferPageProps<VerificationController, 'verify'>) {
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
      <Head title="Vérification Réussie" />

      {/* Decorative Background - Green Theme */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-[120px] mix-blend-screen animate-pulse duration-3000" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-green-500/10 blur-[100px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-md"
      >
        <div className={cn(
          "backdrop-blur-xl bg-card/80 border border-white/10 shadow-2xl rounded-3xl overflow-hidden",
          "dark:bg-zinc-900/60 dark:border-white/5"
        )}>
          {/* Header Banner */}
          <div className="bg-emerald-500/10 p-8 flex justify-center border-b border-emerald-500/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/20 to-transparent opacity-50" />
            <motion.div
              initial={{ scale: 0.8, rotate: 10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
              className="relative z-10 p-4 bg-background rounded-2xl shadow-lg border border-border/50"
            >
              <CheckCircle className="size-12 text-emerald-500" />
            </motion.div>
          </div>

          <div className="p-8 space-y-6 text-center">
            <motion.div variants={itemVariants} className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-emerald-600 to-green-400 bg-clip-text text-transparent">
                Email vérifié !
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Ton compte est maintenant actif. Bienvenue dans la communauté !
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-2">
              <Button
                asChild
                size="lg"
                className="w-full gap-2 font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all border-0"
              >
                <Link href="/">
                  C'est parti ! <ArrowRight className="size-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
