'use server';

import prisma from '@src/lib/prisma';
import bcrypt from 'bcryptjs';
import sendEmail from '@src/lib/aws/sendEmail';
import { randomInt } from 'crypto';

export const sendVerificationEmail = async (email: string) => {
  const verificationToken = String(Math.floor(100000 + randomInt(900000)));
  const hashedToken = await bcrypt.hash(verificationToken, 10);
  const subject = 'Verify your email';
  const body = `Your verification code is ${verificationToken}`;

  await prisma.verificationToken.deleteMany({
    where: {
      identifier: email,
    },
  });

  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token: hashedToken,
      expires: new Date(Date.now() + 10 * 60 * 1000),
    },
  });

  await sendEmail(email, subject, body);
  return { success: true };
};

export async function registerUser(
  name: string,
  email: string,
  password: string,
  verificationCode: string
) {
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const tokens = await prisma.verificationToken.findMany({
    where: {
      identifier: email,
      expires: {
        gt: new Date(),
      },
    },
  });

  const isVerificationValid = (
    await Promise.all(
      tokens.map((token) => bcrypt.compare(verificationCode, token.token))
    )
  ).some(Boolean);

  if (!isVerificationValid) {
    throw new Error('Invalid verification code');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  await prisma.verificationToken.deleteMany({
    where: {
      identifier: email,
    },
  });

  return { success: 'User created successfully' };
}
