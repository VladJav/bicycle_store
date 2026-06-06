import { auth } from '@src/lib/auth';
import { UserMenu } from './user-menu';

export async function User() {
  const session = await auth();

  return <UserMenu user={session?.user ?? null} />;
}
