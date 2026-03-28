import { Captcha } from 'recaptz'
import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Loader2 } from 'lucide-react'

type CaptchaType = 'mixed' | 'sequence' | 'pattern' | 'slider' | 'math'

const CAPTCHA_TYPES: CaptchaType[] = ['mixed', 'sequence', 'pattern', 'slider', 'math']
const VALIDATING_MESSAGES = [
  'Vérification en cours...',
  'Analyse de votre réponse...',
  'Connexion au serveur...',
  'Validation de la preuve...',
  'Traitement de la demande...',
]

function getNextType(current: CaptchaType): CaptchaType {
  const currentIndex = CAPTCHA_TYPES.indexOf(current)
  const remaining = CAPTCHA_TYPES.filter((_, i) => i !== currentIndex)
  return remaining[Math.floor(Math.random() * remaining.length)]
}

export default function CaptchaImp({ onAttempt }: { onAttempt?: (count: number) => void }) {
  const [currentType, setCurrentType] = useState<CaptchaType>('mixed')
  const [isValidating, setIsValidating] = useState(false)
  const [validatingMessage, setValidatingMessage] = useState('')
  const [attemptCount, setAttemptCount] = useState(0)
  const [captchaKey, setCaptchaKey] = useState(0)

  const handleValidate = useCallback((isValid: boolean) => {
    if (!isValid) return

    const newCount = attemptCount + 1
    setAttemptCount(newCount)
    onAttempt?.(newCount)

    const message = VALIDATING_MESSAGES[Math.floor(Math.random() * VALIDATING_MESSAGES.length)]
    setValidatingMessage(message)
    // Remonter le composant immédiatement pour bloquer l'écran de succès natif
    setCaptchaKey((k) => k + 1)
    setIsValidating(true)

    setTimeout(() => {
      setIsValidating(false)
      setCurrentType(getNextType(currentType))
      setCaptchaKey((k) => k + 1)
    }, 1800)
  }, [attemptCount, currentType, onAttempt])

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full">
      <AnimatePresence mode="wait">
        {isValidating ? (
          <motion.div
            key="validating"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex flex-col items-center gap-3 py-6 text-center"
          >
            <div className="relative">
              <CheckCircle2 className="size-10 text-green-500" />
              <Loader2 className="size-4 text-muted-foreground animate-spin absolute -bottom-1 -right-1" />
            </div>
            <p className="text-sm font-medium text-green-600 dark:text-green-400">Captcha réussi !</p>
            <p className="text-xs text-muted-foreground">{validatingMessage}</p>
          </motion.div>
        ) : (
          <motion.div
            key={`captcha-${captchaKey}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="w-full"
          >
            <Captcha
              key={captchaKey}
              type={currentType}
              length={currentType === 'mixed' || currentType === 'sequence' ? 6 : undefined}
              onValidate={handleValidate}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {attemptCount > 0 && !isValidating && (
        <p className="text-xs text-muted-foreground/50">
          Tentative {attemptCount + 1} — Encore un peu...
        </p>
      )}
    </div>
  )
}
