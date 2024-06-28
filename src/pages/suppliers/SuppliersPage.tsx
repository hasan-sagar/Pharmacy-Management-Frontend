import {
  useCreateSuppliersHook,
  useSearchAndGetSuppliers,
} from "@/api/SuppliersApi";
import { SuppliersForm } from "@/components/forms/SuppliersForm";
import AllSuppliers from "@/components/main/suppliers/AllSuppliers";
import SuppliersPaginator from "@/components/main/suppliers/SuppliersPaginator";
import SuppliersSearchBar, {
  SuppliersSearchForm,
} from "@/components/main/suppliers/SuppliersSearchBar";
import { Button } from "@/components/ui/button";
import { Download, FileUp, Plus } from "lucide-react";
import { useState } from "react";

//search state values and types
export type SearchSuppliersState = {
  searchQueryKeywords: string;
  page: number;
};

export default function SupplierPage() {
  //search states
  const [searchState, setSearchState] = useState<SearchSuppliersState>({
    searchQueryKeywords: "",
    page: 1,
  });
  //call create supplier hook
  const { createSuppliers, isLoading } = useCreateSuppliersHook();
  //call search suppliers and table hook
  const { suppliersData, isLoading: isSupplierSearchLoading } =
    useSearchAndGetSuppliers(searchState);

  //modal on
  const [isOpen, setIsOpen] = useState(false);

  //close button modal
  const handleOpenChange = (open: any) => {
    setIsOpen(open);
  };

  //search query set
  const setSearchQuery = (searchFormData: SuppliersSearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQueryKeywords: searchFormData.searchQueryKeywords,
    }));
  };

  //page set
  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  return (
    <main className="flex flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">All Suppliers</h1>
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
        <SuppliersSearchBar
          onSubmit={setSearchQuery}
          placeHolder="Search by suppliers"
        />
        <AllSuppliers
          suppliersData={suppliersData}
          isLoading={isSupplierSearchLoading}
        />
        <SuppliersPaginator
          onPageChange={setPage}
          page={suppliersData?.pagination.page}
          pages={suppliersData?.pagination.pages}
        />
        <SuppliersForm
          onSave={createSuppliers}
          isLoading={isLoading}
          isOpen={isOpen}
          onOpenChange={handleOpenChange}
        />
      </div>
    </main>
  );
}
