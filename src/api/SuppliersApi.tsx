import { SearchSuppliersState } from "@/pages/suppliers/SuppliersPage";
import { CreateSuppliersType } from "@/types/create-suppliers-type";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL + "/api/v1";

//create supplier hook
export const useCreateSuppliersHook = () => {
  const createSuppliersRequest = async (formData: CreateSuppliersType) => {
    const response = await axios.post(`${apiBaseUrl}/suppliers`, {
      name: formData.name,
      phone: formData.phone,
      companyName: formData.companyName,
      address: formData.address,
    });
    return await response.data;
  };

  const {
    mutate: createSuppliers,
    error,
    isSuccess,
    isLoading,
  } = useMutation(createSuppliersRequest);

  if (error) {
    toast.error(error.toString());
  }

  if (isSuccess) {
    toast.success("New supplier created");
  }

  return {
    createSuppliers,
    isLoading,
  };
};

//search and fetch all suppliers
export const useSearchAndGetSuppliers = (searchState: SearchSuppliersState) => {
  const createSearchRequest = async () => {
    const params = new URLSearchParams();

    params.set("query", searchState.searchQueryKeywords);
    params.set("page", searchState.page.toString());

    const response = await axios.get(
      `${apiBaseUrl}/suppliers?${params.toString()}`
    );

    const data = await response.data;
    return data;
  };

  const { data: suppliersData, isLoading } = useQuery(
    ["searchAndGetSuppliers", searchState],
    createSearchRequest
  );

  return {
    suppliersData,
    isLoading,
  };
};

//delete a supplier
export const useDeleteSupplierHook = () => {
  const createDeleteRequest = async (supplierId: string) => {
    const response = await axios.delete(
      `${apiBaseUrl}/suppliers/${supplierId}`
    );
    return response.data;
  };

  const {
    mutateAsync: deleteSuppliers,
    isSuccess,
    error,
  } = useMutation(createDeleteRequest);

  if (error) {
    toast.error(error.toString());
  }
  if (isSuccess) {
    toast.success("Supplier deleted");
  }

  return {
    deleteSuppliers,
  };
};

//get a single supplier
export const useGetSingleSupplier = (supplierId: string) => {
  const createGetSuppliersRequest = async () => {
    const response = await axios.get(`${apiBaseUrl}/suppliers/${supplierId}`);
    return response.data;
  };

  const {
    data: supplierData,
    error,
    isLoading,
  } = useQuery("getSingleSupplier", createGetSuppliersRequest);

  if (error) {
    toast.error(error.toString());
  }

  return {
    supplierData,
    isLoading,
  };
};

//update single supplier
export const useUpdateSingleSupplier = (supplierId: string) => {
  const updateSupplierRequest = async (
    supplierFormData: CreateSuppliersType
  ) => {
    const response = await axios.put(`${apiBaseUrl}/suppliers/${supplierId}`, {
      name: supplierFormData.name,
      phone: supplierFormData.phone,
      companyName: supplierFormData.companyName,
      address: supplierFormData.address,
    });

    return response.data;
  };

  const {
    mutateAsync: updateSupplier,
    isLoading,
    error,
    isSuccess,
  } = useMutation(updateSupplierRequest);

  if (error) {
    toast.error(error.toString());
  }

  if (isSuccess) {
    toast.success("Supplier updated");
  }
  return {
    updateSupplier,
    isLoading,
  };
};

// fetch all suppliers
export const useGetAllSuppliers = () => {
  const createSearchRequest = async () => {
    const response = await axios.get(`${apiBaseUrl}/suppliers/get/all`);

    return response.data;
  };

  const { data: suppliersData, isLoading } = useQuery(
    "getAllSuppliers",
    createSearchRequest
  );

  return {
    suppliersData,
    isLoading,
  };
};
