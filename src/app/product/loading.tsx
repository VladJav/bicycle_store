import { Skeleton } from '@src/components/ui/skeleton';

const BICYCLES_PER_PAGE = 12;

export default function Loading() {
  return (
    <>
      <div className='mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8'>
        <nav className='flex text-sm text-gray-500'>
          <Skeleton className='h-4 w-16' />
          <span className='mx-2'>/</span>
          <Skeleton className='h-4 w-24' />
        </nav>
      </div>

      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='pb-24 pt-6'>
          <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4'>
            <div className='hidden lg:block'>
              <h2 className='sr-only'>Filters</h2>
              <div className='space-y-4'>
                <Skeleton className='h-8 w-full' />
                <Skeleton className='h-8 w-full' />
                <Skeleton className='h-8 w-full' />
                <Skeleton className='h-8 w-full' />
              </div>
            </div>

            <div className='lg:col-span-3'>
              <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3'>
                {Array.from({ length: BICYCLES_PER_PAGE }).map((_, index) => (
                  <div key={index} className='group relative'>
                    <div className='aspect-square w-full overflow-hidden rounded-lg bg-gray-100'>
                      <Skeleton className='h-full w-full' />
                    </div>
                    <div className='mt-4 space-y-2'>
                      <Skeleton className='h-4 w-3/4' />
                      <Skeleton className='h-4 w-1/2' />
                      <Skeleton className='h-4 w-1/4' />
                    </div>
                  </div>
                ))}
              </div>

              <div className='mt-12 flex items-center justify-center'>
                <nav className='flex items-center space-x-2'>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton key={index} className='h-8 w-8 rounded-full' />
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}