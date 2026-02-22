import { auth } from '@src/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@src/lib/prisma';
import ProfileForm from './ProfileForm';
import Sidebar from '@src/components/layout/Sidebar/Sidebar';
import MainHeader from '@src/components/layout/MainHeader';

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
    <div className="flex min-h-screen bg-[#fcfdfd]">
      <Sidebar />

      <main className="flex-1 px-8 py-8">
        <MainHeader user={{
          name: user.name || 'User',
          email: user.email,
          image: user.image || '',
        }} />

        <div className="container mx-auto max-w-5xl">
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
                    <div key={order.id} className="border p-5 rounded-lg shadow-sm bg-white flex flex-col gap-4">
                      <div className="flex justify-between items-center border-b pb-3">
                        <div>
                          <span className="font-semibold text-sm text-gray-700">Order #{order.id.slice(0, 8)}</span>
                          <p className="text-gray-500 text-xs mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full font-medium">{order.status.title}</span>
                      </div>
                      
                      <div className="space-y-3">
                        {order.orderItems.map((item) => (
                          <div key={item.id} className="flex justify-between items-center text-sm">
                            <span className="text-gray-700">{item.quantity}x {item.bicycle.title}</span>
                            <span className="font-medium">${(item.quantity * item.bicycle.price).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border p-8 rounded-lg text-center bg-gray-50 text-gray-500">
                  <p>You have no recent orders.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
