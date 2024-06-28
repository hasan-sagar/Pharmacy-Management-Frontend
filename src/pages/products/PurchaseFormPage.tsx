import { useCreateProductsHook } from "@/api/ProductApi";
import { PurchaseForm } from "@/components/forms/PurchaseForm";

export default function PurchaseFormPage() {
  //call create product hook
  const { createProducts, isLoading } = useCreateProductsHook();
  return (
    <>
      <PurchaseForm isLoading={isLoading} onSave={createProducts} />
    </>
  );
}
