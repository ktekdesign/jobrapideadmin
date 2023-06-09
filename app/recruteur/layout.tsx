import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
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
  const session = await getServerSession()

  const user = session?.user
  
  if(!user && redirectPath(session?.role ?? "") !== "/recruteur") return redirect("/")
  
  return <>{children}</>

}
