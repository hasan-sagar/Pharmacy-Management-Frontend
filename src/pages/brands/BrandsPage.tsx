import { useCreateBrandsHook, useSearchAndGetBrands } from "@/api/BrandsApi";
import { BrandsForm } from "@/components/forms/BrandsForm";
import AllBrands from "@/components/main/brands/AllBrands";
import BrandsPaginator from "@/components/main/brands/BrandsPaginator";
import BrandsSearchBar, {
  SearchForm,
} from "@/components/main/brands/BrandsSearchBar";
import { Button } from "@/components/ui/button";
import { Download, FileUp, Plus } from "lucide-react";
import { useState } from "react";

//search state values and types
export type SearchBrandsState = {
  searchQueryKeywords: string;
  page: number;
};

export default function BrandsPage() {
  //search table
  const [searchState, setSearchState] = useState<SearchBrandsState>({
    searchQueryKeywords: "",
    page: 1,
  });
  //create brand hook
  const { createBrands, isLoading } = useCreateBrandsHook();
  //searych get brands hook
  const { brandsData, isLoading: isBrandsSearchLoading } =
    useSearchAndGetBrands(searchState);
  //modal on
  const [isOpen, setIsOpen] = useState(false);

  //close button modal
  const handleOpenChange = (open: any) => {
    setIsOpen(open);
  };

  //search query set
  const setSearchQuery = (searchFormData: SearchForm) => {
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
        <h1 className="text-lg font-semibold md:text-2xl">All Brands</h1>
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
        <BrandsSearchBar
          onSubmit={setSearchQuery}
          placeHolder="Search by brand name"
        />
        <AllBrands brandsData={brandsData} isLoading={isBrandsSearchLoading} />
        <BrandsPaginator
          onPageChange={setPage}
          page={brandsData?.pagination.page}
          pages={brandsData?.pagination.pages}
        />
        <BrandsForm
          onSave={createBrands}
          isLoading={isLoading}
          isOpen={isOpen}
          onOpenChange={handleOpenChange}
        />
      </div>
    </main>
  );
}
