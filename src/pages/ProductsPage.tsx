import { Download, FileUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductSearchBar from "@/components/main/ProductSearchBar";
import AllProducts from "@/components/main/AllProducts";
import ProductPaginator from "@/components/main/ProductPaginator";

export default function ProductsPage() {
  return (
    <main className="flex  flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">All Products</h1>
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
        <ProductSearchBar />
        <AllProducts />
        <ProductPaginator />
      </div>
    </main>
  );
}
