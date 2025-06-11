import { getUsers } from '@src/actions/user';
import { CustomersTable } from '../customers-table';

export default async function CustomersPage({
  searchParams
}: {
  searchParams: Promise<{ offset?: string }>;
}) {
  const { offset: offsetParam } = await searchParams;
  const offset = Number(offsetParam) || 5;
  const { users, total } = await getUsers(offset);

  return (
    // @ts-expect-error - TODO: fix this
    <CustomersTable customers={users} offset={offset} totalCustomers={total} />
  );
}
