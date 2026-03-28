import ConfigurationLayout from '#users/ui/components/configuration_layout'
import { useForm } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import { Button } from '@workspace/ui/components/button'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@workspace/ui/lib/utils'
import { PROGRAMS_DATA, YEARS } from '#common/config/programs'
import useUser from '#auth/ui/hooks/use_user'

export default function SelectCampusPage() {
  const user = useUser()

  const [year, setYear] = useState<number | null>(user.year || null)
  const [programKey, setProgramKey] = useState<string | null>(null)
  const [track, setTrack] = useState<string | null>(user.track || null)

  const { setData, put, processing } = useForm({
    year: user.year,
    program: user.program,
    track: user.track,
  })

  const availablePrograms = year
    ? Object.entries(PROGRAMS_DATA).filter(([_, data]) => data.years.includes(year))
    : []

  const availableTracks = programKey ? PROGRAMS_DATA[programKey].tracks : []

  const handleYearSelect = (y: number) => {
    setYear(y)
    setProgramKey(null)
    setTrack(null)
  }

  const handleProgramSelect = (key: string) => {
    setProgramKey(key)
    setTrack(null)
  }

  const handleTrackSelect = (t: string) => {
    setTrack(t)
  }

  useEffect(() => {
    if (year) setData('year', year)
  }, [year])

  useEffect(() => {
    if (programKey) setData('program', PROGRAMS_DATA[programKey].label)
  }, [programKey])

  useEffect(() => {
    if (track) setData('track', track)
  }, [track])

  const canSubmit = year && programKey && track

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  } as const

  return (
    <ConfigurationLayout>
      <div className="max-w-2xl mx-auto w-full flex flex-col gap-8 pb-20">
        <h1 className="text-3xl font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Il nous manque quelques informations ..
        </h1>

        <section>
          <h2 className="text-lg font-medium mb-3 text-muted-foreground">
            En quelle année es-tu ?
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {YEARS.map((y) => (
              <Button
                key={y}
                variant={year === y ? 'default' : 'outline'}
                onClick={() => handleYearSelect(y)}
                className={cn(
                  'w-12 h-12 rounded-full text-lg transition-all',
                  year === y ? 'ring-2 ring-primary ring-offset-2 scale-110' : 'hover:bg-muted'
                )}
              >
                {y}
              </Button>
            ))}
          </div>
        </section>

        <AnimatePresence mode="wait">
          {year && availablePrograms.length > 0 && (
            <motion.section
              key="program-section"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
            >
              <h2 className="text-lg font-medium mb-3 text-muted-foreground">
                Quel est ton cursus ?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {availablePrograms.map(([key, data]) => (
                  <div
                    key={key}
                    onClick={() => handleProgramSelect(key)}
                    className={cn(
                      'cursor-pointer rounded-xl border p-4 transition-all hover:border-primary',
                      programKey === key
                        ? 'border-primary bg-primary/5 ring-1 ring-primary'
                        : 'bg-card border-border shadow-sm'
                    )}
                  >
                    <span className="font-semibold text-lg">{data.label}</span>
                  </div>
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {programKey && availableTracks.length > 0 && (
            <motion.section
              key="track-section"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
            >
              <h2 className="text-lg font-medium mb-3 text-muted-foreground">
                Quelle est ta majeure / spécialité ?
              </h2>
              <div className="grid grid-cols-1 gap-2">
                {availableTracks.map((t, index) => (
                  <motion.div
                    key={t}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleTrackSelect(t)}
                    className={cn(
                      'cursor-pointer px-4 py-3 rounded-lg border text-sm transition-all hover:border-primary/50',
                      track === t
                        ? 'border-primary bg-primary text-primary-foreground font-medium'
                        : 'bg-card border-border hover:bg-accent'
                    )}
                  >
                    {t}
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {canSubmit && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="fixed bottom-8 right-8 md:static md:flex md:justify-end md:mt-4"
            >
              <Button
                size="lg"
                onClick={() => put('/account/configure')}
                disabled={processing}
                className="shadow-xl md:shadow-none w-full md:w-auto"
              >
                Continuer
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ConfigurationLayout>
  )
}
