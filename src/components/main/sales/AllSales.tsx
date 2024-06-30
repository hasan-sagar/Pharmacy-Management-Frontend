import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LoadSpinner from "../../shared/LoadSpinner";
import { EyeIcon } from "lucide-react";
import { OrderType } from "@/types/order-type";
import { Link } from "react-router-dom";

type Props = {
  ordersData: any;
  isLoading: boolean;
};

export default function AllSales({ ordersData, isLoading }: Props) {
  //supplier data render loading
  if (isLoading) {
    return <LoadSpinner />;
  }

  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead>InvoiceNo</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Customer Phone</TableHead>
          <TableHead>Total Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ordersData?.data.map((order: OrderType) => (
          <TableRow key={order._id}>
            <Link to={`/invoice/${order._id}`}>
              <TableCell className="text-primary font-semibold">
                {order.invoiceNo}
              </TableCell>
            </Link>
            <TableCell className="font-medium">
              {order.customerDetails.name}
            </TableCell>
            <TableCell className="font-medium">
              {order.customerDetails.phone}
            </TableCell>
            <TableCell className="font-medium">{order.totalAmount}</TableCell>
            <TableCell className="font-medium">{order.status}</TableCell>
            <TableCell>
              <Link to={`/invoice/${order._id}`}>
                <EyeIcon size={20} className="cursor-pointer text-primary" />
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
