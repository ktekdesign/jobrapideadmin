'use client'
import Login from "../components/login";
import Navbar from "./navbar";
import { redirect } from "next/navigation";
import { redirectPath } from "../utils/redirectPath";
import { useSession } from "next-auth/react";
import Toast from "@components/toast";

export default function IndexPage({ searchParams }: { searchParams: { newUser: string } }) {
  const session = useSession();
  
  if(session?.status === "authenticated") return redirect(redirectPath(session?.data?.role))
  
  return (
    <>
      <Navbar />
      <main>
        <Login />
        {searchParams?.newUser && 
          <Toast title="Ok" link="#" text="Veuillez vous connecter en insérant votre e-mail et mot de passe" />
        }
      </main>
    </>
  )
}
