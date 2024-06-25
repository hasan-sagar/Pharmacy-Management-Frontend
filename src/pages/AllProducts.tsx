import { Button } from "@/components/ui/button";

export default function AllProducts() {
  return (
    <>
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold md:text-2xl">All Products</h1>
          <div className="gap-1 flex">
            <Button>Import</Button>
            <Button>Export</Button>
            <Button>Add</Button>
          </div>
        </div>
        <div
          className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
          x-chunk="dashboard-02-chunk-1"
        >
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no Dashboard
            </h3>
            <p className="text-sm text-muted-foreground">
              You can start selling as soon as you add a Dashboard.
            </p>
            <Button className="mt-4">Add Product</Button>
          </div>
        </div>
      </main>
    </>
  );
}
