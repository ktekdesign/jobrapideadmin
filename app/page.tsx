'use client'
import Login from "../components/login";
import Navbar from "./navbar";
import { redirect } from "next/navigation";
import { redirectPath } from "../utils/redirectPath";
import { useSession } from "next-auth/react";

export default function IndexPage() {
  const session = useSession();
  
  if(session?.status === "authenticated") return redirect(redirectPath(session?.data?.role))
  
  return (
    <>
      <Navbar />
      <main>
        <Login />
      </main>
    </>
  )
}
