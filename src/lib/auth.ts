import { PrismaAdapter } from '@auth/prisma-adapter';
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import type { NextAuthOptions } from 'next-auth';
import { getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@src/lib/prisma';
import { v4 as uuid } from 'uuid';
import { encode as defaultEncode } from 'next-auth/jwt';

export const config = {
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === 'credentials') {
        token.credentials = true;
      }
      return token;
    },
    async session({ session, user }) {
      if (session.user) {
        // @ts-expect-error - user is not used in this callback
        session.user.role = user.role;
        session.user.id = user.id;
      }
      return session;
    },
  },
  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = uuid();

        if (!params.token.sub) {
          throw new Error('No user ID found in token');
        }

        const createdSession = await prisma.session.create({
          data: {
            sessionToken: sessionToken,
            userId: params.token.sub,
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          },
        });

        if (!createdSession) {
          throw new Error('Failed to create session');
        }

        return sessionToken;
      }
      return defaultEncode(params);
    },
  },
  secret: 'asdasd',
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) {
            return null;
          }

          // In a real app, you would compare hashed passwords
          // This is a simplified version
          const isPasswordValid = credentials.password === 'password'; // Replace with actual password check

          // if (!isPasswordValid) {
          //   return null;
          // }

          return user;
        } catch (error) {
          console.error('Error during authentication:', error);
          return null;
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
} satisfies NextAuthOptions;

export function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}
