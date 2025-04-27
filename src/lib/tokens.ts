import prisma from './prisma';
import { randomUUID } from 'crypto';
import { addHours } from 'date-fns';

export async function generateVerificationToken(identifier: string) {
  const token = randomUUID();

  const expires = addHours(new Date(), 24);

  await prisma.verificationToken.create({
    data: {
      identifier,
      token,
      expires,
    },
  });

  return token;
}

export async function verifyToken(identifier: string, token: string) {
  const verificationToken = await prisma.verificationToken.findUnique({
    where: {
      identifier_token: {
        identifier,
        token,
      },
    },
  });

  if (!verificationToken) {
    throw new Error('Invalid token');
  }

  if (new Date() > verificationToken.expires) {
    throw new Error('Token expired');
  }

  return verificationToken;
}
