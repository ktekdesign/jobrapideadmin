'use client';

import Input from "../components/form/input";
import Button from "../components/form/Button";
import useFormData from "@hooks/useFormData";
import { useEffect, useState } from "react";
import { Title } from "@tremor/react";
import Toast from "./toast";

interface Inputs {
    email: string
}

export default function ForgotPasswordForm() {
    const {
        data,
        register,
        handleSubmit,
        errors
      } = useFormData<Inputs>({url: '/api/forgot-password'});
      const [success, setSuccess] = useState(false)
      const onSubmit = (e: any) => {
        e.preventDefault()
        handleSubmit()
      }
      useEffect(() => {
        setSuccess(data?.success)
      }, [data?.success])
      
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <Title className="mb-4">Renseignez votre email pour recevoir le lien de réinitialisation de votre mot de passe.</Title>
        <form className="form" onSubmit={onSubmit}>
          <Input label="E-mail" {...register('email', { required: true })}>
          {errors.email && <p className="form-error">Ce champ est obligatoire.</p>}
          </Input>
          <div className="flex items-center justify-between gap-8">
            <Button label="login" type="submit">
              Réinitialiser
            </Button>
          </div>
        </form>
        {success ? 
        <Toast title="Ok" text="Un message a été envoyé dans votre boîte de réception. Veuillez suivre les indications pour réinitialiser votre mot de passe." link="/register" />
        :
        data instanceof Error && <Toast title="Créer un compte" text="Vous n'avez pas de compte." link="/register" />}
      </div>
    );
  }
  