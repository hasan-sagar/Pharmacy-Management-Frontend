import { SearchPurchaseState } from "@/pages/products/PurchasePage";
import { CreateProductsType } from "@/types/create-products-type";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL + "/api/v1";

export const useCreateProductsHook = () => {
  const createProductsRequest = async (formData: CreateProductsType) => {
    const response = axios.post(
      `${apiBaseUrl}/products/purchase`,
      {
        medicineName: formData.medicineName,
        category: formData.category,
        brands: formData.brands,
        supplier: formData.supplier,
        user: formData.user,
        buyPrice: formData.buyPrice,
        sellPrice: formData.sellPrice,
        quantity: formData.quantity,
        expireDate: formData.expireDate,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return (await response).data;
  };

  const {
    mutate: createProducts,
    isLoading,
    error,
    isSuccess,
  } = useMutation(createProductsRequest);

  if (error) {
    toast.error(error.toString());
  }

  if (isSuccess) {
    toast.success("New Product created");
    window.location.href = "/product/purchase";
  }

  return {
    createProducts,
    isLoading,
  };
};

//search and fetch all products
export const useSearchAndGetProducts = (searchState: SearchPurchaseState) => {
  const createSearchRequest = async () => {
    const params = new URLSearchParams();

    params.set("query", searchState.searchQueryKeywords);
    params.set("page", searchState.page.toString());

    const response = await axios.get(
      `${apiBaseUrl}/products?${params.toString()}`
    );

    const data = await response.data;
    return data;
  };

  const { data: productsData, isLoading } = useQuery(
    ["searchAndGetProducts", searchState],
    createSearchRequest
  );

  return {
    productsData,
    isLoading,
  };
};

//delete a product
export const useDeleteProductHook = () => {
  const createDeleteRequest = async (productId: string) => {
    const response = await axios.delete(`${apiBaseUrl}/products/${productId}`);
    return response.data;
  };

  const {
    mutateAsync: deleteProducts,
    isSuccess,
    error,
  } = useMutation(createDeleteRequest);

  if (error) {
    toast.error(error.toString());
  }
  if (isSuccess) {
    toast.success("Product deleted");
  }

  return {
    deleteProducts,
  };
};

//get a single product
export const useGetSingleProduct = (productId: string) => {
  const createGetSProductsRequest = async () => {
    const response = await axios.get(`${apiBaseUrl}/products/${productId}`);
    return response.data;
  };

  const {
    data: productData,
    error,
    isLoading,
  } = useQuery("getSingleProduct", createGetSProductsRequest);

  if (error) {
    toast.error(error.toString());
  }

  return {
    productData,
    isLoading,
  };
};

//update single supplier
export const useUpdateSingleProduct = (supplierId: string) => {
  const updateProductRequest = async (productFormData: CreateProductsType) => {
    const response = await axios.put(`${apiBaseUrl}/products/${supplierId}`, {
      medicineName: productFormData.medicineName,
      category: productFormData.category,
      brands: productFormData.brands,
      supplier: productFormData.supplier,
      buyPrice: productFormData.buyPrice,
      sellPrice: productFormData.sellPrice,
      quantity: productFormData.quantity,
      expireDate: productFormData.expireDate,
    });

    return response.data;
  };

  const {
    mutateAsync: updateProduct,
    isLoading,
    error,
    isSuccess,
  } = useMutation(updateProductRequest);

  if (error) {
    toast.error(error.toString());
  }

  if (isSuccess) {
    toast.success("Product updated");
  }
  return {
    updateProduct,
    isLoading,
  };
};

//search and fetch products in stock
export const useSearchAndGetProductsInStock = (
  searchState: SearchPurchaseState
) => {
  const createSearchRequest = async () => {
    const params = new URLSearchParams();

    params.set("query", searchState.searchQueryKeywords);
    params.set("page", searchState.page.toString());

    const response = await axios.get(
      `${apiBaseUrl}/products/get/stock?${params.toString()}`
    );

    const data = await response.data;
    return data;
  };

  const { data: productsData, isLoading } = useQuery(
    ["searchAndGetProductsInStock", searchState],
    createSearchRequest
  );

  return {
    productsData,
    isLoading,
  };
};

//search and fetch products out of stock
export const useSearchAndGetProductsOutOfStock = (
  searchState: SearchPurchaseState
) => {
  const createSearchRequest = async () => {
    const params = new URLSearchParams();

    params.set("query", searchState.searchQueryKeywords);
    params.set("page", searchState.page.toString());

    const response = await axios.get(
      `${apiBaseUrl}/products/get/stock-out?${params.toString()}`
    );

    const data = await response.data;
    return data;
  };

  const { data: productsData, isLoading } = useQuery(
    ["searchAndGetProductsInStock", searchState],
    createSearchRequest
  );

  return {
    productsData,
    isLoading,
  };
};
//search and fetch products of expired
export const useSearchAndGetProductsExpired = (
  searchState: SearchPurchaseState
) => {
  const createSearchRequest = async () => {
    const params = new URLSearchParams();

    params.set("query", searchState.searchQueryKeywords);
    params.set("page", searchState.page.toString());

    const response = await axios.get(
      `${apiBaseUrl}/products/get/expired?${params.toString()}`
    );

    const data = await response.data;
    return data;
  };

  const { data: productsData, isLoading } = useQuery(
    ["searchAndGetProductsExpired", searchState],
    createSearchRequest
  );

  return {
    productsData,
    isLoading,
  };
};
