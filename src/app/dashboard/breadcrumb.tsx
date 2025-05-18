'use client';

import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@src/components/ui/breadcrumb';
import { usePathname } from 'next/navigation';
import React from 'react';

export function DashboardBreadcrumb() {
  const pathname = usePathname();
  const pathList = pathname.split('/').slice(1);

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {pathList.map((path, index) => {
          if (index === pathList.length - 1) {
            return (
              <BreadcrumbItem key={path}>
                <BreadcrumbPage>{path.charAt(0).toUpperCase() + path.slice(1)}</BreadcrumbPage>
              </BreadcrumbItem>
            );
          }
          return (
            <React.Fragment key={path}>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={'/dashboard'}>{path.charAt(0).toUpperCase() + path.slice(1)}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
} 