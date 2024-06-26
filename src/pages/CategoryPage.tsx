import { Download, FileUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryForm } from "@/components/forms/CategoryForm";
import { useState } from "react";
import { useCreateCategoryHook } from "@/api/CategoryApi";

export default function CategoryPage() {
  //create category hook
  const { createCategory, isLoading } = useCreateCategoryHook();

  //modal on
  const [isOpen, setIsOpen] = useState(false);

  //close button modal
  const handleOpenChange = (open: any) => {
    setIsOpen(open);
  };

  return (
    <main className="flex flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">All Categories</h1>
        <div className="gap-1 flex">
          <Button size={"sm"} variant={"secondary"}>
            <FileUp className="w-5 h-5" />
          </Button>
          <Button size={"sm"} variant={"secondary"}>
            <Download className="w-5 h-5" />
          </Button>
          <Button
            size={"sm"}
            variant={"secondary"}
            onClick={() => setIsOpen((prevState) => !prevState)}
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {/* table contents */}
        <CategoryForm
          isLoading={isLoading}
          onSave={createCategory}
          isOpen={isOpen}
          onOpenChange={handleOpenChange}
        />
      </div>
    </main>
  );
}
