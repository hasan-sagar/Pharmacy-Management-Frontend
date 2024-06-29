import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LoadSpinner from "@/components/shared/LoadSpinner";

type Props = {
  product: any;
  isLoading: boolean;
  cartItems: any;
};

const PosProductCard = ({ product, isLoading, cartItems }: Props) => {
  // const [cart, setCart] = useState<any[]>(() => {
  //   const storedCartItems = localStorage.getItem("cart");
  //   return storedCartItems ? JSON.parse(storedCartItems) : [];
  // });

  // console.log(cart);

  if (isLoading) {
    return <LoadSpinner />;
  }

  // Assuming product.expireDate is a string in the format "YYYY-MM-DD"
  const expireDate = new Date(product.expireDate);
  const today = new Date();
  let expiredTrue;
  let expiredFalse;

  if (today <= expireDate) {
    expiredFalse = expireDate;
  } else {
    expiredTrue = expireDate;
  }

  // const handleAddToCart = () => {
  //   addToCart(product);
  // };

  // const updateCart = (product: any) => {
  //   const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  //   const existingProductIndex = cart.findIndex(
  //     (item: any) => item._id === product._id
  //   );

  //   if (existingProductIndex !== -1) {
  //     cart[existingProductIndex].quantity += 1;
  //   } else {
  //     cart.push({
  //       _id: product._id,
  //       name: product.medicineName,
  //       price: product.sellPrice,
  //       quantity: 1,
  //     });
  //   }

  //   localStorage.setItem("cart", JSON.stringify(cart));
  // };

  // const addToCart = (product: any) => {
  //   const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  //   const existingProductIndex = cart.findIndex(
  //     (item: any) => item._id === product._id
  //   );

  //   if (existingProductIndex !== -1) {
  //     cart[existingProductIndex].quantity += 1;
  //   } else {
  //     cart.push({
  //       _id: product._id,
  //       name: product.medicineName,
  //       price: product.sellPrice,
  //       quantity: 1,
  //     });
  //   }

  //   localStorage.setItem("cart", JSON.stringify(cart));
  //   setCart(cart);
  // };

  return (
    <Card className="flex flex-col gap-2 p-3">
      <div className="flex flex-col flex-1">
        <CardHeader className="p-0">
          <CardTitle className="text-lg font-semibold">
            {product.medicineName}
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground font-semibold">
            {product.category.name} | {product.brands.name}
          </CardDescription>
          <CardDescription className="text-base text-muted-foreground font-semibold">
            Stock: {product.quantity}
          </CardDescription>
          <CardDescription className="text-sm text-primary font-bold">
            {expiredTrue && <p className="text-red-500">Expired</p>}
            {expiredFalse && (
              <span className="text-green-500">
                {new Date(product.expireDate).toISOString().split("T")[0]}
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 mt-1">
          <p className="text-base font-medium">BDT. {product.sellPrice}</p>
        </CardContent>
        <CardFooter className="p-0 mt-2">
          <Button
            variant={"outline"}
            className="mt-1 text-xs w-full"
            size={"sm"}
            onClick={cartItems}
            disabled={expiredTrue as any}
          >
            Add to Cart
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default PosProductCard;
