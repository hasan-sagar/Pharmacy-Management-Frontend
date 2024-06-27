import { useUpdateSingleCategory } from "@/api/CategoryApi";
import CategoryEditForm from "@/components/forms/CategoryEditForm";
import LoadSpinner from "@/components/shared/LoadSpinner";
import { useParams } from "react-router-dom";

export default function CategoryEditpage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { updateCategory, isLoading } = useUpdateSingleCategory(
    categoryId as string
  );

  if (isLoading) {
    return <LoadSpinner />;
  }

  return (
    <>
      <CategoryEditForm onSave={updateCategory} />
    </>
  );
}
