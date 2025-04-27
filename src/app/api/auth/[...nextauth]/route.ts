import NextAuth from 'next-auth';
import { config } from '@src/lib/auth';

const handler = NextAuth(config);

export { handler as GET, handler as POST };
