import '../globals.css';

import { getServerSession } from 'next-auth/next';
import Toast from './toast';
import { redirect } from 'next/navigation';
import Navbar from './navbar';
import { redirectPath } from '../../utils/redirectPath';

export const metadata = {
  title: 'Recruteur Dashboard',
  description:
    'Dashboard pour les recruteurs.'
};

export default async function RecruteurLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  const user = session?.user
  
  if(!user && redirectPath(session?.role ?? "") !== "/recruteur") return redirect("/")
  
  return (
    <>
      <Navbar user={user} />
      <main>
        {children}
      </main>
    </>
  );
}
