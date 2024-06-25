import { Package2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import Sidebar from "@/components/shared/Sidebar";
import MobileSidebar from "@/components/shared/MobileSidebar";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <a href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span>Lazz Pharma</span>
            </a>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Sidebar */}
          <Sidebar />
          {/* Sidebar */}
        </div>
      </div>
      <div className="flex flex-col">
        {/* Mobile sidebar */}

        <MobileSidebar />

        {/* Mobile sidebar */}
        {children}
      </div>
    </div>
  );
}
