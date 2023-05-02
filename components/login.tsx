'use client';

import Link from "next/link";
import Input from "../components/form/input";
import Button from "../components/form/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignInResponse, signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

interface Inputs {
    email: string
    password: string
}

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm<Inputs>();
      const [formData, setFormData]: [
        SetStateAction<SignInResponse | undefined>,
        Dispatch<SetStateAction<SignInResponse | undefined>>
      ] = useState();
      const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const result = await signIn('credentials', {
            email: data?.email,
            password: data?.password,
            redirect: false
          });
          setFormData(result)
        return result
      };
  
  if(formData?.ok) return redirect("/api/hard-redirect")

    return (
      <div className="w-full h-full flex justify-center items-center">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <Input label="E-mail" {...register('email', { required: true })}>
          {errors.email && <p className="form-error">Ce champ est obligatoire.</p>}
          </Input>
          <Input label="Mot de passe" {...register('password', { required: true })} type="password" placeholder="******************">
          {errors.password && <p className="form-error">Ce champ est obligatoire.</p>}
          </Input>
          <div className="flex items-center justify-between gap-8">
            <Button label="login" type="submit">
              Login
            </Button>
            <Link className="inline-block align-baseline font-bold text-sm text-dark-500 hover:text-dark-800 ml-4" href="/mot-de-passe-oublie">
              Mot de passe oublié?
            </Link>
          </div>
        </form>
      </div>
    );
  }
  