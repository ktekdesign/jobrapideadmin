"use client";

import { SessionProvider } from "next-auth/react";
import { ApolloProvider } from '@apollo/client'
import client from '../lib/client'

type Props = {
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export const ApolloClientProvider = ({ children }: Props) => {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
