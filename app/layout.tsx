import './globals.css';
import { ApolloClientProvider, NextAuthProvider } from "./providers";
import AnalyticsWrapper from './analytics';

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
          {children}
        </NextAuthProvider>
        </ApolloClientProvider>
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
