import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    id: string;
    role: string;
    authToken: string;
  }

  interface User {
    id: string;
    role: string;
    authToken: string;
  }
}
declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
    authToken: string;
  }
}
