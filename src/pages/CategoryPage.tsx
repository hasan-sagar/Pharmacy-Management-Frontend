import { Download, FileUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryForm } from "@/components/forms/CategoryForm";
import { useState } from "react";
import {
  useCreateCategoryHook,
  useSearchAndGetCategories,
} from "@/api/CategoryApi";
import CateogrySearchBar, {
  SearchForm,
} from "@/components/main/CategorySearchbar";
import AllCategory from "@/components/main/AllCategory";
import CategoryPaginator from "@/components/main/CategoryPaginator";

//search state values and types
export type SearchState = {
  searchQueryKeywords: string;
  page: number;
};

export default function CategoryPage() {
  //create category hook
  const { createCategory, isLoading } = useCreateCategoryHook();

  //searxh table
  const [searchState, setSearchState] = useState<SearchState>({
    searchQueryKeywords: "",
    page: 1,
  });

  // search and get category hook
  const { categoryData, isLoading: isCategoryLoading } =
    useSearchAndGetCategories(searchState);

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
        <CateogrySearchBar
          onSubmit={setSearchQuery}
          placeHolder="Search by category name"
        />
        <AllCategory
          categoryData={categoryData}
          isLoading={isCategoryLoading}
        />
        <CategoryPaginator
          onPageChange={setPage}
          page={categoryData?.pagination.page}
          pages={categoryData?.pagination.pages}
        />
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
