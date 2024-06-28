import { useUpdateSingleSupplier } from "@/api/SuppliersApi";
import SuppliersEditForm from "@/components/forms/SuppliersEditForm";
import LoadSpinner from "@/components/shared/LoadSpinner";
import { useParams } from "react-router-dom";

export default function SuppliersEditPage() {
  //params
  const { supplierId } = useParams<{ supplierId: string }>();

  //supplier update hook
  const { updateSupplier, isLoading } = useUpdateSingleSupplier(
    supplierId as string
  );

  if (isLoading) {
    return <LoadSpinner />;
  }

  return (
    <>
      <SuppliersEditForm onSave={updateSupplier} />
    </>
  );
}
