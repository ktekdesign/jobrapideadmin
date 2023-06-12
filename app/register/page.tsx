'use client';
import OnboardingFlow from "@components/onboardingFlow";
import Profile from "@components/profile";
import RegisterForm from "@components/register-form";
import Toast from "@components/toast";
import Navbar from "app/navbar";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Role } from "types/data";

export default function IndexPage({ searchParams }: { searchParams: { callbackUrl: Role } }) {
  const [active, setActive]: [
    SetStateAction<number>,
    Dispatch<SetStateAction<number>>
  ] = useState(0)
  const [jwtAuthToken, setJwtAuthToken]: [
    SetStateAction<string>,
    Dispatch<SetStateAction<string>>
  ] = useState("")
  useEffect(() => {
    if(jwtAuthToken) setActive(1)
  }, [jwtAuthToken])

  return (
    <>
      <OnboardingFlow active={active}>
        <RegisterForm setJwtAuthToken={setJwtAuthToken}  />
        <Profile role={searchParams?.callbackUrl ?? "candidat"} jwtAuthToken={jwtAuthToken} />
      </OnboardingFlow>
      {!!active && 
        <Toast text="Félicitations! Votre compte a été créé. Remplissez correctement le formulaire ci-dessus pour mettre à jour votre profil." link="#" title="Ok" />
      }
    </>   
  )
}
