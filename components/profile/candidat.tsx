import Input from "@components/form/input"
import Radio from "@components/form/radio"
import ToggleRadio from "@components/form/toggle-radio"
import Onboarding from "@components/onboarding"
import Step from "@components/step"
import useFormData from "@hooks/useFormData"
import { useTerms } from "@hooks/useTerms"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

interface Inputs {
    id: number
    first_name: string
    last_name: string
    telefone: string
    email: string
    birthday: string
    sexe: string
    residence: string
    role: string
    jwtAuthToken: string
}

const ProfileCandidat = ({jwtAuthToken, setMessage} : {jwtAuthToken?: string, setMessage?: Dispatch<SetStateAction<string>>}) => {
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
                setValue("role", "candidat")
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
                    <Input label="Vos Prénoms" defaultValue={""} {...register('first_name', { required: true })}>
                        {errors.first_name && <p className="form-error">Ce champ est obligatoire.</p>}
                    </Input>
                    <Input label="Votre nom" defaultValue={""} {...register('last_name', { required: true })}>
                        {errors.last_name && <p className="form-error">Ce champ est obligatoire.</p>}
                    </Input>
                    <ToggleRadio items={[{text: "Masculin", value: "M"}, {text: "Feminin", value: "F"}]} label='Sexe' {...register('sexe')} />
                </Step>
                <Step title="Informations Personnelles">
                    {!jwtAuthToken && active && <Input label="E-mail" type="email" defaultValue={""} {...register('email')} >
                        {errors.email && <p className="form-error">Ce champ est obligatoire.</p>} 
                    </Input>}
                    <Input label="Téléphone" type="tel" defaultValue={""} {...register('telefone')} />
                    <Input label="Date de naissance" max={(new Date).toLocaleString()} type="date" defaultValue={(new Date).toDateString()} {...register('birthday')}/>
                    <Radio items={regions} label='Pays de résidence' {...register('residence')} />
                </Step>
            </Onboarding>
        </form>
    )
}
export default ProfileCandidat