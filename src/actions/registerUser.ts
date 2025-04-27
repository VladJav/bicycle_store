'use server';

import prisma from '@src/lib/prisma';
import bcrypt from 'bcryptjs';
import sendEmail from '@src/lib/aws/sendEmail';
import { randomInt } from 'crypto';

export const sendVerificationEmail = async (email: string) => {
  const verificationToken = Math.floor(100000 + randomInt(900000));
  const subject = 'Verify your email';
  const body = `Your verification code is ${verificationToken}`;
  await sendEmail(email, subject, body);
  return verificationToken;
};

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (existingUser) {
    throw new Error('User already exists');
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

  return { success: 'User created successfully' };
}
