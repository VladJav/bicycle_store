'use client';

import Link from 'next/link';
import {
  Home,
  LineChart,
  MapPinMinusInside,
  Package,
  Package2,
  PanelLeft,
  Settings,
  ShoppingCart,
  Target,
  Users2,
} from 'lucide-react';

import { Button } from '@src/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@src/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@src/components/ui/tooltip';
import { DashboardBreadcrumb } from './breadcrumb';
import { NavItem } from './nav-item';
import { SearchInput } from './search';
import { DashboardUser, UserMenu } from './user-menu';

export function DashboardShell({
  children,
  user,
}: {
  children: React.ReactNode;
  user: DashboardUser | null;
}) {
  return (
    <main className="flex min-h-screen w-full flex-col bg-muted/40">
      <DesktopNav />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <MobileNav />
          <DashboardBreadcrumb />
          <SearchInput />
          <UserMenu user={user} />
        </header>
        <main className="grid flex-1 items-start gap-2 bg-muted/40 p-4 sm:px-6 sm:py-0 md:gap-4">
          {children}
        </main>
      </div>
    </main>
  );
}

function DesktopNav() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <NavItem href="/" label="Home">
          <Target className="h-5 w-5" />
        </NavItem>

        <NavItem href="/dashboard" label="Products">
          <Package className="h-5 w-5" />
        </NavItem>

        <NavItem href="/dashboard/orders" label="Orders">
          <ShoppingCart className="h-5 w-5" />
        </NavItem>

        <NavItem href="/dashboard/customers" label="Customers">
          <Users2 className="h-5 w-5" />
        </NavItem>

        <NavItem href="/dashboard/statuses" label="Statuses">
          <MapPinMinusInside className="h-5 w-5" />
        </NavItem>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/settings"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="/dashboard"
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
          >
            <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
            <span className="sr-only">Dashboard</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Home className="h-5 w-5" />
            Home
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-4 px-2.5 text-foreground"
          >
            <Package className="h-5 w-5" />
            Products
          </Link>
          <Link
            href="/dashboard/orders"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <ShoppingCart className="h-5 w-5" />
            Orders
          </Link>
          <Link
            href="/dashboard/customers"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Users2 className="h-5 w-5" />
            Customers
          </Link>
          <Link
            href="/dashboard/statuses"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <MapPinMinusInside className="h-5 w-5" />
            Statuses
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <LineChart className="h-5 w-5" />
            Settings
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
