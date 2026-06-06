import { auth } from '@src/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@src/lib/prisma';
import ProfileForm from './ProfileForm';
import Header from '@src/components/layout/Header';

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/auth/sign-in');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      orders: {
        include: {
          status: true,
          orderItems: {
            include: {
              bicycle: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  if (!user) {
    redirect('/auth/sign-in');
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground pb-16">
      <Header />

      <main className="flex-1 px-8 py-8 mx-auto w-full max-w-7xl">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Profile Details</h2>
            <ProfileForm user={user} />
          </div>
          
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
            {user.orders.length > 0 ? (
              <div className="space-y-4">
                {user.orders.map((order) => (
                  <div key={order.id} className="border p-5 rounded-lg shadow-sm bg-card text-card-foreground flex flex-col gap-4">
                    <div className="flex justify-between items-center border-b pb-3">
                      <div>
                        <span className="font-semibold text-sm">Order #{order.id.slice(0, 8)}</span>
                        <p className="text-muted-foreground text-xs mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <span className="bg-secondary text-secondary-foreground text-xs px-3 py-1 rounded-full font-medium">{order.status.title}</span>
                    </div>
                    
                    <div className="space-y-3">
	                      {order.orderItems.map((item) => (
	                        <div key={item.id} className="flex justify-between items-center text-sm">
	                          <span>
	                            {item.quantity}x {item.bicycle.title}
	                            {item.color ? ` (${item.color})` : ''}
	                          </span>
	                          <span className="font-medium">${(item.quantity * item.bicycle.price).toFixed(2)}</span>
	                        </div>
	                      ))}
	                    </div>
	                    <div className="flex justify-between items-center border-t pt-3 text-sm font-medium">
	                      <span>{order.shippingMethod}</span>
	                      <span>Total ${order.total.toFixed(2)}</span>
	                    </div>
	                  </div>
                ))}
              </div>
            ) : (
              <div className="border p-8 rounded-lg text-center bg-muted text-muted-foreground">
                <p>You have no recent orders.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
