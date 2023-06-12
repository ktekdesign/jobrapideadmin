import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Candidat Dashboard',
  description:
    'Dashboard pour les candidats.'
};

export default async function RecruteurLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  const user = session?.user
  if(!user) return redirect("/")
  
  return <>{children}</>

}
