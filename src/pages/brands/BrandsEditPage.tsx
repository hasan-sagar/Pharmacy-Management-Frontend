import { useUpdateSingleBrand } from "@/api/BrandsApi";
import BrandsEditForm from "@/components/forms/BrandsEditForm";
import LoadSpinner from "@/components/shared/LoadSpinner";

import { useParams } from "react-router-dom";

export default function BrandsEditpage() {
  const { brandId } = useParams<{ brandId: string }>();
  const { updateBrand, isLoading } = useUpdateSingleBrand(brandId as string);

  if (isLoading) {
    return <LoadSpinner />;
  }

  return (
    <>
      <BrandsEditForm onSave={updateBrand} />
    </>
  );
}
