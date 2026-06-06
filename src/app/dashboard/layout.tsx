import Providers from './providers';
import { auth } from '@src/lib/auth';
import { redirect } from 'next/navigation';
import { DashboardShell } from './dashboard-shell';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/auth/sign-in');
  }

  if (session.user.role !== 'ADMIN') {
    redirect('/');
  }

  const user = {
    name: session.user.name,
    email: session.user.email,
    image: session.user.image,
  };

  return (
    <Providers>
      <DashboardShell user={user}>{children}</DashboardShell>
    </Providers>
  );
}
