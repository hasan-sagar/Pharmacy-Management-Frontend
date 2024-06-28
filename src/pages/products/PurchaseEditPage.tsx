import { useUpdateSingleProduct } from "@/api/ProductApi";
import { PurchaseEditForm } from "@/components/forms/PurchaseEditForm";
import LoadSpinner from "@/components/shared/LoadSpinner";
import { useParams } from "react-router-dom";

export default function PurchaseEditPage() {
  //params
  const { purchaseId } = useParams<{ purchaseId: string }>();

  //product update hook
  const { updateProduct, isLoading } = useUpdateSingleProduct(
    purchaseId as string
  );

  if (isLoading) {
    return <LoadSpinner />;
  }

  return (
    <>
      <PurchaseEditForm onSave={updateProduct} />
    </>
  );
}
