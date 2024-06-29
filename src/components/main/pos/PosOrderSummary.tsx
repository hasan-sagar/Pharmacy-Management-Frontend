import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Trash } from "lucide-react";

type Props = {
  cartItems: any;
  removeCart: any;
  totalCartItems: number;
  totalPrice: number | any;
};

export default function PosOrderSummary({
  cartItems,
  removeCart,
  totalCartItems,
  totalPrice,
}: Props) {
  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg shadow-sm">
      <div className="flex flex-col  gap-1">
        <h3 className="text-2xl font-bold text-center">Order Summary</h3>
        <div className="my-4"></div>
        {/* order items */}
        {cartItems?.map((cart: any) => (
          <div
            className="flex flex-row items-center justify-between gap-2"
            key={cart._id}
          >
            <span className="flex items-center gap-2 font-medium">
              <Badge variant="outline" className="mr-2">
                {cart.quantity}
              </Badge>
              {cart.name}
            </span>
            <div className="flex flex-row items-center gap-10">
              <span className="font-medium">
                ৳ {cart.price * cart.quantity}
              </span>
              <Trash
                className="cursor-pointer"
                size={18}
                color="red"
                onClick={() => removeCart(cart)}
              />
            </div>
          </div>
        ))}
        <Separator className="mt-4" />
        <div className="mt-4  font-medium">
          <p>Total Items: {totalCartItems}</p>
          <p>Total Price: ৳ {totalPrice}</p>
        </div>
      </div>
    </div>
  );
}
