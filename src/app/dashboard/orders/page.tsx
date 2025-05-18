import { getOrders } from '@src/actions/orders';
import { OrdersTable } from '../orders-table';
import { getStatuses } from '@src/actions/statuses';

export default async function OrdersPage({
  searchParams
}: {
  searchParams: { offset?: string };
}) {
  const { offset: offsetParam } = await searchParams;
  const offset = Number(offsetParam) || 5;
  const { orders, total } = await getOrders(offset);
  const { statuses } = await getStatuses({});

  return (
    <OrdersTable statuses={statuses} orders={orders} offset={offset} totalOrders={total} />
  );
}
