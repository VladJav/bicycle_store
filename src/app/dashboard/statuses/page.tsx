import { getStatuses } from '@src/actions/statuses';
import { StatusesTable } from '../statuses-table';

export default async function StatusesPage({
  searchParams
}: {
  searchParams: { offset?: string };
}) {
  const { offset } = await searchParams;
  const { statuses, total } = await getStatuses({
    skip: offset ? Number(offset) - 5 : 0,
    take: 5,
  });

  return (
    <StatusesTable statuses={statuses} offset={Number(offset)} totalStatuses={total} />
  );
}
