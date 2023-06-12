import './globals.css';
import { ApolloClientProvider, NextAuthProvider } from "./providers";
import AnalyticsWrapper from './analytics';
import Copyright from '@components/copyright';
import Nav from "./nav";
import { getServerSession } from 'next-auth';

export const metadata = {
  title: 'Login - JobRapide Admin',
  description:
    'Dashboard JobRapide Admin Pages'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <ApolloClientProvider>
        <NextAuthProvider>
          <Nav />
          <main id='layout'>
            {children}
          </main>
        </NextAuthProvider>
        </ApolloClientProvider>
        <Copyright />
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
