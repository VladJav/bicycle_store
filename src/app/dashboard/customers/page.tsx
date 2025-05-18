import { getUsers } from '@src/actions/user';
import { CustomersTable } from '../customers-table';

export default async function CustomersPage({
  searchParams
}: {
  searchParams: { offset?: string };
}) {
  const { offset: offsetParam } = await searchParams;
  const offset = Number(offsetParam) || 5;
  const { users, total } = await getUsers(offset);

  return (
    <CustomersTable customers={users} offset={offset} totalCustomers={total} />
  );
}
