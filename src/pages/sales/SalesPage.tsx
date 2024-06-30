import { useSearchAndGetOrders } from "@/api/OrdersApi";
import PurchasePaginator from "@/components/main/products/PurchasePaginator";
import AllSales from "@/components/main/sales/AllSales";
import SalesSearchBar, {
  SalesSearchForm,
} from "@/components/main/sales/SalesSearchBar";
import { Button } from "@/components/ui/button";
import { Download, FileUp, Plus } from "lucide-react";
import { useState } from "react";

//search state values and types
export type SearchSalesState = {
  searchQueryKeywords: string;
  page: number;
};

export default function SalesPage() {
  //search states
  const [searchState, setSearchState] = useState<SearchSalesState>({
    searchQueryKeywords: "",
    page: 1,
  });
  //call search suppliers and table hook
  const { ordersData, isLoading: isSupplierSearchLoading } =
    useSearchAndGetOrders(searchState);

  //search query set
  const setSearchQuery = (searchFormData: SalesSearchForm) => {
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
        <h1 className="text-lg font-semibold md:text-2xl">All Sales</h1>
        <div className="gap-1 flex">
          <Button size={"sm"} variant={"secondary"}>
            <FileUp className="w-5 h-5" />
          </Button>
          <Button size={"sm"} variant={"secondary"}>
            <Download className="w-5 h-5" />
          </Button>
          <Button size={"sm"} variant={"secondary"}>
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <SalesSearchBar
          onSubmit={setSearchQuery}
          placeHolder="Search by customer,product name and invoice"
        />
        <AllSales ordersData={ordersData} isLoading={isSupplierSearchLoading} />
        <PurchasePaginator
          onPageChange={setPage}
          page={ordersData?.pagination.page}
          pages={ordersData?.pagination.pages}
        />
      </div>
    </main>
  );
}
