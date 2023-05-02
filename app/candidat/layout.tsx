import '../globals.css';

import { getServerSession } from 'next-auth/next';
import Toast from './toast';
import { redirect } from 'next/navigation';
import Navbar from './navbar';
import { getSession, useSession } from 'next-auth/react';
import axios from 'axios';

export const metadata = {
  title: 'Next.js 13 + PlanetScale + NextAuth + Tailwind CSS',
  description:
    'A user admin dashboard configured with Next.js, PlanetScale, NextAuth, Tailwind CSS, TypeScript, ESLint, and Prettier.'
};

export default async function RecruteurLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  const user = session?.user
  
  if(!user) return redirect("/")
  
  return (
    <>
      <Navbar user={user} />
      <main>
        {children}
        <Toast />
      </main>
    </>
  );
}
