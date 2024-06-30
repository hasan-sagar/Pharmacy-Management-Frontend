import { SearchSalesState } from "@/pages/sales/SalesPage";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL + "/api/v1";

type OrderRequest = {
  invoiceNo: string;
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
        invoiceNo: formData.invoiceNo,
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
    toast.error("Check Stock and try again");
  }

  if (isSuccess) {
    toast.success("New Order Create");
  }

  return {
    createOrder,
    isLoading,
  };
};

//search and fetch all orders/sales
export const useSearchAndGetOrders = (searchState: SearchSalesState) => {
  const createSearchRequest = async () => {
    const params = new URLSearchParams();

    params.set("query", searchState.searchQueryKeywords);
    params.set("page", searchState.page.toString());

    const response = await axios.get(
      `${apiBaseUrl}/order?${params.toString()}`
    );

    const data = await response.data;
    return data;
  };

  const { data: ordersData, isLoading } = useQuery(
    ["searchAndGetOrders", searchState],
    createSearchRequest
  );

  return {
    ordersData,
    isLoading,
  };
};

//get a single order
export const useGetSingleOrder = (orderId: string) => {
  const createGetOrderRequest = async () => {
    const response = await axios.get(`${apiBaseUrl}/order/${orderId}`);
    return await response.data;
  };

  const {
    data: orderData,
    error,
    isLoading,
  } = useQuery("getSingleorder", createGetOrderRequest);

  if (error) {
    toast.error(error.toString());
  }

  return {
    orderData,
    isLoading,
  };
};
