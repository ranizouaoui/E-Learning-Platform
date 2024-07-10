import React from "react";

export function Footer() {
  return (
    <footer className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <h1 className="text-center text-2xl font-bold">موقعي</h1>
          <nav className="mt-10 text-sm">
            <div className="-my-1 flex justify-center gap-x-6">
              <a
                className="text-muted-foreground inline-block rounded-lg px-2 py-1 text-sm hover:bg-slate-100"
                href="#features"
              >
                الميزات{" "}
              </a>
              <a
                className="text-muted-foreground inline-block rounded-lg px-2 py-1 text-sm hover:bg-slate-100"
                href="#pricing"
              >
                الأسعار
              </a>
            </div>
          </nav>
        </div>
        <div className="flex flex-col items-center border-t py-10">
          <p className="text-muted-foreground mt-6 sm:mt-0">
            &copy; {new Date().getFullYear()} موقعي. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}
