import { auth } from '@src/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@src/lib/prisma';
import Header from '@src/components/layout/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@src/components/ui/tabs';

// Import our new components
import SecuritySettings from './components/SecuritySettings';
import AddressSettings from './components/AddressSettings';
import NotificationSettings from './components/NotificationSettings';
import AppearanceSettings from './components/AppearanceSettings';

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/auth/sign-in');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      accounts: true, // Needed for linked accounts in Security
    }
  });

  if (!user) {
    redirect('/auth/sign-in');
  }

  return (
    <div className="flex flex-col min-h-screen bg-background pb-16">
      <Header />

      <main className="flex-1 px-8 py-8 w-full max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>
        
        <Tabs defaultValue="security" className="w-full">
          <TabsList className="mb-8 w-full justify-start rounded-none border-b bg-transparent p-0 overflow-x-auto overflow-y-hidden">
            <TabsTrigger 
              value="security" 
              className="relative h-10 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-medium text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none whitespace-nowrap"
            >
              Security & Login
            </TabsTrigger>
            <TabsTrigger 
              value="addresses"
              className="relative h-10 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-medium text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none whitespace-nowrap"
            >
              Addresses
            </TabsTrigger>
            <TabsTrigger 
              value="appearance"
              className="relative h-10 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-medium text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none whitespace-nowrap"
            >
              Appearance
            </TabsTrigger>
          </TabsList>
          
          <div className="bg-card text-card-foreground rounded-lg border shadow-sm p-6 mb-8 max-w-4xl">
            <TabsContent value="security" className="mt-0">
              <SecuritySettings user={user} />
            </TabsContent>
            <TabsContent value="addresses" className="mt-0">
              <AddressSettings user={user} />
            </TabsContent>
            <TabsContent value="appearance" className="mt-0">
              <AppearanceSettings />
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
}
