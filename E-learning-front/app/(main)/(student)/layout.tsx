import React from "react";

import { MenuIcon } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "@/components/main/sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen">
      <MobileHeader />
      <Sidebar className="hidden lg:flex" />
      <main className="mt-[50px] flex w-full lg:ml-[300px] lg:mt-0">
        <div className="flex-1 p-6">{children}</div>
      </main>
    </div>
  );
}

function MobileHeader() {
  return (
    <div className="fixed top-0 z-50 flex h-[50px] w-full items-center border-b-2 bg-muted px-6 lg:hidden">
      <MobileSiderbar />
    </div>
  );
}

function MobileSiderbar() {
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent className="z-[100] p-0" side="left">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}
