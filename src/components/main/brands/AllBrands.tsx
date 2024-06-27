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
import { useDeleteBrandsHook } from "@/api/BrandsApi";
import { Link, useNavigate } from "react-router-dom";
import { BrandsType } from "@/types/brand-type";

type Props = {
  brandsData: any;
  isLoading: boolean;
};

export default function AllBrands({ brandsData, isLoading }: Props) {
  const navigate = useNavigate();
  //brands delete hook call
  const { deleteBrands } = useDeleteBrandsHook();

  //brands data render loading
  if (isLoading) {
    return <LoadSpinner />;
  }

  //category data delete
  const handleDelete = (brandId: string) => {
    deleteBrands(brandId);
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
        {brandsData?.data.map((brands: BrandsType) => (
          <TableRow key={brands._id}>
            <TableCell className="font-medium">{brands.name}</TableCell>
            <TableCell className="flex flex-1 gap-4">
              <Trash
                onClick={() => handleDelete(brands._id)}
                size={20}
                className="text-red-500 cursor-pointer"
              />
              <Link to={`/brands/${brands._id}`}>
                <Edit />
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
