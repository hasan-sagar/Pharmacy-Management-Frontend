import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import LoadSpinner from "@/components/shared/LoadSpinner";
import { useDeleteProductHook } from "@/api/ProductApi";

type Props = {
  productsData: any;
  isLoading: boolean;
};

export default function AllPurchase({ productsData, isLoading }: Props) {
  const navigate = useNavigate();
  //product delete hook call
  const { deleteProducts } = useDeleteProductHook();

  // data render loading
  if (isLoading) {
    return <LoadSpinner />;
  }

  //products data delete
  const handleDelete = (productId: string) => {
    deleteProducts(productId);
    navigate(0);
  };

  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead>Medicine Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Brand</TableHead>
          <TableHead>Supplier</TableHead>
          <TableHead>Buying Price</TableHead>
          <TableHead>Sell Price</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Expire Date</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {productsData?.data.map((product: any) => (
          <TableRow key={product._id}>
            <TableCell className="font-medium">
              {product.medicineName}
            </TableCell>
            <TableCell className="font-medium">
              {product.category.name}
            </TableCell>
            <TableCell className="font-medium">{product.brands.name}</TableCell>
            <TableCell className="font-medium">
              {product.supplier.name}
            </TableCell>
            <TableCell className="font-medium">{product.buyPrice}</TableCell>
            <TableCell className="font-medium">{product.sellPrice}</TableCell>
            <TableCell className="font-medium">{product.quantity}</TableCell>
            <TableCell className="font-medium">
              {new Date(product.expireDate).toISOString().split("T")[0]}
            </TableCell>
            <TableCell className="flex flex-1 gap-4">
              <Trash
                onClick={() => handleDelete(product._id)}
                size={20}
                className="text-red-500 cursor-pointer"
              />
              <Link to={`/purchase/${product._id}`}>
                <Edit />
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
