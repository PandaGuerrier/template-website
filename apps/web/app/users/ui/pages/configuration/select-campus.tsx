import ConfigurationLayout from '#users/ui/components/configuration_layout'
import { useForm } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import { Button } from '@workspace/ui/components/button'
import { Field } from '@workspace/ui/components/field'
import useUser from '#auth/ui/hooks/use_user'

const campusList = [
  {
    id: 'bordeaux',
    name: 'Bordeaux 🍷',
    image: '/images/campus/bordeaux.png',
  },
  {
    id: 'paris',
    name: 'Paris 🥖',
    image: '/images/campus/paris.png',
  },
]

export default function SelectCampusPage() {
  const user = useUser()
  const [campus, setCampus] = useState(user.campus)

  const { setData, put } = useForm({
    campus: user.campus,
  })

  useEffect(() => {
    setData('campus', campus)
  }, [campus])

  const send = () => {
    put('/account/configure')
  }

  return (
    <ConfigurationLayout>
      <h1 className="text-2xl font-bold mb-6">Selectionne ton campus</h1>
      <div className={'space-y-12 p-10 md:p-0 md:space-y-0 md:flex md:space-x-12 md:w-xl'}>
        {campusList.map((c) => (
          <div
            key={c.id}
            className={`border w-full rounded-lg p-4 cursor-pointer flex flex-col duration-200 items-center space-y-2 ${campus === c.id ? 'border-primary shadow-2xl scale-110' : 'border-secondary'}`}
            onClick={() => setCampus(c.id)}
          >
            <img src={c.image} alt={c.name} className="w-full h-full object-contain rounded-md" />
            <span className="text-lg font-medium">{c.name}</span>
          </div>
        ))}
      </div>

      <Field orientation="responsive">
        <Button className={'cursor-pointer'} onClick={send} disabled={campus == ''}>
          Continuer
        </Button>
      </Field>
    </ConfigurationLayout>
  )
}
