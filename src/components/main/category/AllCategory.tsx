import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CategoryType } from "@/types/category-type";
import LoadSpinner from "../../shared/LoadSpinner";
import { Edit, Trash } from "lucide-react";
import { useDeleteCategoryHook } from "@/api/CategoryApi";
import { Link, useNavigate } from "react-router-dom";

type Props = {
  categoryData: any;
  isLoading: boolean;
};

export default function AllCategory({ categoryData, isLoading }: Props) {
  //category delete hook call
  const { deleteCategory } = useDeleteCategoryHook();

  const navigate = useNavigate();

  //category data render loading
  if (isLoading) {
    return <LoadSpinner />;
  }

  //category data delete
  const handleDelete = (categoryId: string) => {
    deleteCategory(categoryId);
    navigate(0);
  };

  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categoryData?.data.map((category: CategoryType) => (
          <TableRow key={category._id}>
            <TableCell className="font-medium">{category.name}</TableCell>
            <TableCell className="flex flex-1 gap-4">
              <Trash
                size={20}
                className="text-red-500 cursor-pointer"
                onClick={() => handleDelete(category._id)}
              />
              <Link to={`/category/${category._id}`}>
                <Edit />
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
