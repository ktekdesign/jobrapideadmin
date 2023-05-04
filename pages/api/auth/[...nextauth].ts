import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { login } from '../../../lib/api';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'credentials',
      id: 'credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const data = await login({
          email: credentials?.email ?? '',
          password: credentials?.password ?? ''
        });
        // If no error and we have user data, return it
        return data;
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/'
  },
  callbacks: {
    async jwt({ token, user }) {
      //  "user" parameter is the object received from "authorize"
      //  "token" is being send below to "session" callback...
      //  ...so we set "user" param of "token" to object from "authorize"...
      //  ...and return it...
      if (user) {
        token.role = user?.role;
        token.id = user?.id;
        token.authToken = user?.authToken;
      }

      return Promise.resolve(token); // ...here
    },
    async session({ session, token }) {
      //  "session" is current session object
      //  below we set "user" param of "session" to value received from "jwt" callback
      session.id = token.id;
      session.role = token.role;
      session.authToken = token.authToken;
      return Promise.resolve(session);
    }
  }
};

export default NextAuth(authOptions);
