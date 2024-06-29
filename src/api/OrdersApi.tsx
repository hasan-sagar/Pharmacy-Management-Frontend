import axios from "axios";
import { useMutation } from "react-query";
import { toast } from "sonner";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL + "/api/v1";

type OrderRequest = {
  cartItems: {
    productId: string;
    quantity: number;
    name: string;
    price: number;
  }[];
  customerDetails: {
    name: string;
    phone: string;
    address: string;
  };
  totalAmount: number;
  totalItems: number;
};

export const useCreateOrderHook = () => {
  const createOrderRequest = async (formData: OrderRequest) => {
    const response = await axios.post(
      `${apiBaseUrl}/order`,
      {
        customerDetails: {
          name: formData.customerDetails.name,
          phone: formData.customerDetails.phone,
          address: formData.customerDetails.address,
        },
        cartItems: formData.cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          name: item.name,
          price: item.price,
        })),
        totalAmount: formData.totalAmount,
        totalItems: formData.totalItems,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  };

  const {
    mutate: createOrder,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createOrderRequest);

  if (isError) {
    toast.error("Select under stock");
  }

  if (isSuccess) {
    toast.success("New Order Create");
  }

  return {
    createOrder,
    isLoading,
  };
};
