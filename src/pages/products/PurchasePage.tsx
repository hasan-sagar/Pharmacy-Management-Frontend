import { useSearchAndGetProducts } from "@/api/ProductApi";
import AllPurchase from "@/components/main/products/AllPurchase";
import PurchasePaginator from "@/components/main/products/PurchasePaginator";
import PurchaseSearchBar, {
  ProductsSearchForm,
} from "@/components/main/products/PurchaseSearchBar";

import { Button } from "@/components/ui/button";
import { Download, FileUp, Plus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

//search state values and types
export type SearchPurchaseState = {
  searchQueryKeywords: string;
  page: number;
};

export default function PurchasePage() {
  //search table
  const [searchState, setSearchState] = useState<SearchPurchaseState>({
    searchQueryKeywords: "",
    page: 1,
  });

  //searych get purchase hook
  const { productsData, isLoading } = useSearchAndGetProducts(searchState);

  //search query set
  const setSearchQuery = (searchFormData: ProductsSearchForm) => {
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
        <h1 className="text-lg font-semibold md:text-2xl">All Purchase List</h1>
        <div className="gap-1 flex">
          <Button size={"sm"} variant={"secondary"}>
            <FileUp className="w-5 h-5" />
          </Button>
          <Button size={"sm"} variant={"secondary"}>
            <Download className="w-5 h-5" />
          </Button>
          <Link to={"/purchase/create"}>
            <Button size={"sm"} variant={"secondary"}>
              <Plus className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <PurchaseSearchBar
          onSubmit={setSearchQuery}
          placeHolder="Search by product"
        />
        <AllPurchase isLoading={isLoading} productsData={productsData} />
        <PurchasePaginator
          onPageChange={setPage}
          page={productsData?.pagination.page}
          pages={productsData?.pagination.pages}
        />
      </div>
    </main>
  );
}
