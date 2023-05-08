import Input from "@components/form/input"
import Radio from "@components/form/radio"
import Onboarding from "@components/onboarding"
import Step from "@components/step"
import useFormData from "@hooks/useFormData"
import { useTerms } from "@hooks/useTerms"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

interface Inputs {
    id: number
    raison_sociale: string
    responsable: string
    telefone: string
    email: string
    site_web: string
    residence: string
    role: string
    jwtAuthToken: string
}

const ProfileRecruteur = ({jwtAuthToken, setMessage} : {jwtAuthToken?: string, setMessage?: Dispatch<SetStateAction<string>>}) => {
    const { data, handleSubmit, register, errors, setValue } = useFormData<Inputs>({url: "/api/register/update"})
    const [active, setActive]: [
        SetStateAction<number>,
        Dispatch<SetStateAction<number>>
      ] = useState(0)
      const [count, setCount]: [
        SetStateAction<number>,
        Dispatch<SetStateAction<number>>
      ] = useState(0)
      const handleNext = () => {
        if(active === count -1) {
            if(jwtAuthToken) {
                setValue("role", "recruteur")
                setValue("jwtAuthToken", jwtAuthToken)
            }
          handleSubmit()
        } else {
          setActive(active + 1)
        }
  
      }
    const handlePrev = () => setActive(active - 1)
    const {data: regions} = useTerms("regions")
    
    useEffect(() => {
        if(setMessage) setMessage(data?.message)
    }, [data, setMessage])
    
    return (
        <form className="form" onSubmit={(e) => e.preventDefault()}>
            <Onboarding {...{active, setCount, count, handleNext, handlePrev}}>
                <Step title="Votre identité">
                    <Input label="Raison Sociale" defaultValue={""} {...register('raison_sociale', { required: true })}>
                        {errors.raison_sociale && <p className="form-error">Ce champ est obligatoire.</p>}
                    </Input>
                    <Input label="Nom du Responsable" defaultValue={""} {...register('responsable', { required: true })}>
                        {errors.responsable && <p className="form-error">Ce champ est obligatoire.</p>}
                    </Input>
                    <Input label="Site Web" defaultValue={""} {...register('site_web')} />
                </Step>
                <Step title="Informations Personnelles">
                    {!jwtAuthToken && active && <Input label="E-mail" type="email" defaultValue={""} {...register('email')} >
                        {errors.email && <p className="form-error">Ce champ est obligatoire.</p>} 
                    </Input>}
                    <Input label="Téléphone" type="tel" defaultValue={""} {...register('telefone')} />
                    <Radio items={regions} label='Pays de résidence' {...register('residence')} />
                </Step>
            </Onboarding>
        </form>
    )
}
export default ProfileRecruteur