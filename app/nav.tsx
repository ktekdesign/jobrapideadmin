'use client';
import Navbar from './navbar';
import NavbarRecruteur from './recruteur/navbar';
import NavbarCandidat from './candidat/navbar';
import { redirectPath } from '@utils/redirectPath';
import { useSession } from 'next-auth/react';

export default function Nav() {
  const session = useSession();
  if(!session) return <></>
  if(session.status !== "authenticated") return <Navbar />
  if(redirectPath(session.data?.role) === "/recruteur") return <NavbarRecruteur user={session.data?.user} />
  return <NavbarCandidat user={session.data?.user} />
}
