import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CategoryType } from "@/types/category-type";
import LoadSpinner from "../shared/LoadSpinner";
import { Edit, Trash } from "lucide-react";

type Props = {
  categoryData: any;
  isLoading: boolean;
};

export default function AllCategory({ categoryData, isLoading }: Props) {
  if (isLoading) {
    return <LoadSpinner />;
  }
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
              <Trash size={20} className="text-red-500" />
              <Edit size={20} className="text-green-500" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
