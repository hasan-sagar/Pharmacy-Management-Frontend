import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LoadSpinner from "../../shared/LoadSpinner";
import { Edit, Trash } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { SuppeliersType } from "@/types/suppliers-type";
import { useDeleteSupplierHook } from "@/api/SuppliersApi";

type Props = {
  suppliersData: any;
  isLoading: boolean;
};

export default function AllSuppliers({ suppliersData, isLoading }: Props) {
  const navigate = useNavigate();
  //supplier delete hook call
  const { deleteSuppliers } = useDeleteSupplierHook();

  //supplier data render loading
  if (isLoading) {
    return <LoadSpinner />;
  }

  //suuplier data delete
  const handleDelete = (supplierId: string) => {
    deleteSuppliers(supplierId);
    navigate(0);
  };

  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {suppliersData?.data.map((suppliers: SuppeliersType) => (
          <TableRow key={suppliers._id}>
            <TableCell className="font-medium">{suppliers.name}</TableCell>
            <TableCell className="font-medium">{suppliers.phone}</TableCell>
            <TableCell className="font-medium">
              {suppliers.companyName}
            </TableCell>
            <TableCell className="font-medium">{suppliers.address}</TableCell>
            <TableCell className="flex flex-1 gap-4">
              <Trash
                onClick={() => handleDelete(suppliers._id)}
                size={20}
                className="text-red-500 cursor-pointer"
              />
              <Link to={`/suppliers/${suppliers._id}`}>
                <Edit />
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
