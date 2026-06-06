import { getStatuses } from '@src/actions/statuses';
import { StatusesTable } from '../statuses-table';

export default async function StatusesPage({
  searchParams
}: {
  searchParams: Promise<{ offset?: string }>;
}) {
  const { offset } = await searchParams;
  const offsetValue = Number(offset) || 5;
  const { statuses, total } = await getStatuses({
    skip: Math.max(0, offsetValue - 5),
    take: 5,
  });

  return (
    <StatusesTable statuses={statuses} offset={offsetValue} totalStatuses={total} />
  );
}
