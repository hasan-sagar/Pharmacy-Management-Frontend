import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LoadSpinner from "@/components/shared/LoadSpinner";

type Props = {
  productsData: any;
  isLoading: boolean;
};

export default function PosProductStockInfo({
  productsData,
  isLoading,
}: Props) {
  // data render loading
  if (isLoading) {
    return <LoadSpinner />;
  }

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
            <TableCell className="font-bold text-red-500">
              {new Date(product.expireDate).toISOString().split("T")[0]}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
