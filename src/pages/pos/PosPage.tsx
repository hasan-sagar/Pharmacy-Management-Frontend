import { useCreateOrderHook } from "@/api/OrdersApi";
import { useSearchAndGetProductsInStock } from "@/api/ProductApi";
import PlaceOrderButton, {
  PlaceOrderFormData,
} from "@/components/main/pos/PlaceOrderButton";
import PosOrderSummary from "@/components/main/pos/PosOrderSummary";
import PosProductCard from "@/components/main/pos/PosProductCard";
import PosSearchBar, {
  ProductsSearchForm,
} from "@/components/main/pos/PosSearchBar";
import PurchasePaginator from "@/components/main/products/PurchasePaginator";
import LoadSpinner from "@/components/shared/LoadSpinner";
import { ShoppingBag } from "lucide-react";
import { useRef, useState } from "react";

//search state values and types
export type SearchPurchaseState = {
  searchQueryKeywords: string;
  page: number;
};

const PosPage = () => {
  //cart
  const [cart, setCart] = useState<any[]>(() => {
    const storedCartItems = localStorage.getItem("cart");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });
  //create order hook
  const { createOrder, isLoading: isCreateOrdrLoading } = useCreateOrderHook();
  //total price state
  const totalPriceState = useRef(0);

  //total cart items
  let totalCartItemsNumber = cart.length;

  // Get total cart items price
  let getTotalPrice = (cart: any) => {
    const totalPrice = cart.reduce(
      (total: any, product: any) => total + product.price * product.quantity,
      0
    );
    return (totalPriceState.current = totalPrice);
  };
  getTotalPrice(cart);

  //search state page
  const [searchState, setSearchState] = useState<SearchPurchaseState>({
    searchQueryKeywords: "",
    page: 1,
  });

  //product stock in data
  const { productsData, isLoading } =
    useSearchAndGetProductsInStock(searchState);

  const setSearchQuery = (searchFormData: ProductsSearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQueryKeywords: searchFormData.searchQueryKeywords,
    }));
  };

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  // Check if productsData and products exist
  const products = productsData?.data || [];
  const pagination = productsData?.pagination || {};

  //add to cart function
  const addToCart = (product: any) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingProductIndex = cart.findIndex(
      (item: any) => item._id === product._id
    );

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({
        _id: product._id,
        name: product.medicineName,
        price: product.sellPrice,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setCart(cart);
  };

  //remove from cart
  const removeFromCart = (cartItem: any) => {
    setCart((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (item) => cartItem._id !== item._id
      );

      localStorage.setItem("cart", JSON.stringify(updatedCartItems));

      return updatedCartItems;
    });
  };
  //generate invoice id
  const generateInvoiceNo = () => {
    const randomComponent = Math.floor(Math.random() * 1000 * 9999);
    return `INV-${randomComponent}`;
  };

  // order create
  const onCheckout = async (orderFormData: PlaceOrderFormData) => {
    const checkoutData = {
      invoiceNo: generateInvoiceNo(),
      cartItems: cart.map((cartItem) => ({
        productId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity,
        price: cartItem.price,
      })),
      customerDetails: {
        name: orderFormData.name,
        phone: orderFormData.phone,
        address: orderFormData.address,
      },
      totalAmount: totalPriceState.current,
      totalItems: totalCartItemsNumber,
    };

    const data = await createOrder(checkoutData as any);

    console.log(data);
  };

  if (isCreateOrdrLoading) {
    return <LoadSpinner />;
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center gap-2">
        <ShoppingBag size={20} />
        <h1 className="text-lg font-semibold md:text-2xl ">
          Point Of Sale Page
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-4 flex-1">
        {/* Product Selection Section */}
        <div className="flex flex-col gap-4 p-4 border rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold">Products List</h2>
          <PosSearchBar
            onSubmit={setSearchQuery}
            placeHolder="Search by product"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product: any) => (
              <PosProductCard
                key={product._id}
                product={product}
                isLoading={isLoading}
                cartItems={() => addToCart(product)}
              />
            ))}
          </div>
          <PurchasePaginator
            onPageChange={setPage}
            page={pagination.page}
            pages={pagination.pages}
          />
        </div>

        {/* Calculation Section */}
        <div>
          <PosOrderSummary
            totalCartItems={totalCartItemsNumber}
            cartItems={cart}
            removeCart={removeFromCart}
            totalPrice={totalPriceState.current}
          />
          <PlaceOrderButton onCheckout={onCheckout} />
        </div>
      </div>
    </main>
  );
};

export default PosPage;
