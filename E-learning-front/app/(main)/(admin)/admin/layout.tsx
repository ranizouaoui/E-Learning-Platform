"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  BookOpenCheckIcon,
  CircleUserIcon,
  LineChartIcon,
  MenuIcon,
  Users2Icon,
  BookCheck,
  LogOutIcon, // Add the logout icon from lucide-react
} from 'lucide-react';
import { useCookies } from 'next-client-cookies';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
}

export default function AdminDashboardLayout({
  children,
}: AdminDashboardLayoutProps) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image
              src="/mascot.svg"
              width={40}
              height={40}
              alt="Mascot"
              className="h-6 w-6"
            />
            <span className="">تعلم اونلاين</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <LineChartIcon className="h-5 w-5" />
              <span>لوحة التحكم</span>
            </Link>
            <Link
              href="/admin/teachers"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Users2Icon className="h-5 w-5" />
              <span>المعلمين</span>
            </Link>
            <Link
              href="/admin/courses"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <BookOpenCheckIcon className="h-5 w-5" />
              <span>الدروس</span>
            </Link>
            <Link
              href="/admin/exams"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <BookCheck className="h-5 w-5" />
              <span>إمتحانات</span>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}

function Header() {
  const router = useRouter();
  const cookies = useCookies();

  const handleLogout = () => {
    // Clear the cookies
    cookies.set('accessToken', '', { path: '/', expires: new Date(0) });
    cookies.set('email', '', { path: '/', expires: new Date(0) });
    cookies.set('teacherId', '', { path: '/', expires: new Date(0) });

    // Redirect to the login page
    router.push('/auth/sign-in');
  };

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="shrink-0 md:hidden">
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col"></SheetContent>
      </Sheet>
      <div className="w-full flex-1"></div>
      <Button size="icon" className="rounded-full">
        <CircleUserIcon className="h-5 w-5" />
        <span className="sr-only">Toggle user menu</span>
      </Button>
      <Button size="icon" className="rounded-full" onClick={handleLogout}>
        <LogOutIcon className="h-5 w-5" />
        <span className="sr-only">Exit</span>
      </Button>
    </header>
  );
}
