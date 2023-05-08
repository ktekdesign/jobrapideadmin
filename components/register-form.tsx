'use client';

import Input from "../components/form/input";
import Button from "../components/form/Button";
import useFormData from "@hooks/useFormData";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Title } from "@tremor/react";
import Toast from "./toast";

interface Inputs {
    email: string
    password: string
}

export default function RegisterForm({setJwtAuthToken} : {setJwtAuthToken: Dispatch<SetStateAction<string>>}) {
    const {
        data,
        register,
        handleSubmit,
        errors
      } = useFormData<Inputs>({url: '/api/register'});
      
      const onSubmit = (e: any) => {
        e.preventDefault()
        handleSubmit()
      }
      useEffect(() => {
        if(data?.jwtAuthToken) setJwtAuthToken(data.jwtAuthToken)
      }, [data?.jwtAuthToken, setJwtAuthToken])
      
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <Title className="mb-4">Renseignez votre email et un mot de passe pour créer un compte</Title>
        <form className="form" onSubmit={onSubmit}>
          <Input label="E-mail" {...register('email', { required: true })}>
          {errors.email && <p className="form-error">Ce champ est obligatoire.</p>}
          </Input>
          <Input label="Mot de passe" {...register('password', { required: true })} type="password" placeholder="******************">
          {errors.password && <p className="form-error">Ce champ est obligatoire.</p>}
          </Input>
          <div className="flex items-center justify-between gap-8">
            <Button label="login" type="submit">
              Créer mon compte
            </Button>
          </div>
        </form>
        {data instanceof Error && <Toast title="Login" text="Vous avez déjà un compte." link="/" />}
      </div>
    );
  }
  