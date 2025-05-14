import { getUsers } from '@src/actions/user';
import { CustomersTable } from '../customers-table';

export default async function CustomersPage({
  searchParams
}: {
  searchParams: { offset?: string };
}) {
  const offset = Number(searchParams.offset) || 5;
  const { users, total } = await getUsers(offset);

  return (
    <CustomersTable customers={users} offset={offset} totalCustomers={total} />
  );
}
