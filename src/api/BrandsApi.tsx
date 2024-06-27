import { SearchBrandsState } from "@/pages/brands/BrandsPage";
import { CreateBrandsType } from "@/types/create-brands-type";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL + "/api/v1";

export const useCreateBrandsHook = () => {
  const createBrandsRequest = async (formData: CreateBrandsType) => {
    const response = axios.post(
      `${apiBaseUrl}/brands`,
      {
        name: formData.name,
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
    mutate: createBrands,
    isLoading,
    error,
    isSuccess,
  } = useMutation(createBrandsRequest);

  if (error) {
    toast.error(error.toString());
  }

  if (isSuccess) {
    toast.success("New brands created");
  }

  return {
    createBrands,
    isLoading,
  };
};

//search and fetch all brands
export const useSearchAndGetBrands = (searchState: SearchBrandsState) => {
  const createSearchRequest = async () => {
    const params = new URLSearchParams();

    params.set("query", searchState.searchQueryKeywords);
    params.set("page", searchState.page.toString());

    const response = await axios.get(
      `${apiBaseUrl}/brands?${params.toString()}`
    );

    const data = await response.data;
    return data;
  };

  const { data: brandsData, isLoading } = useQuery(
    ["searchAndGetBrands", searchState],
    createSearchRequest
  );

  return {
    brandsData,
    isLoading,
  };
};

//delete a brand
export const useDeleteBrandsHook = () => {
  const createDeleteRequest = async (brandsId: string) => {
    const response = await axios.delete(`${apiBaseUrl}/brands/${brandsId}`);
    return response.data;
  };

  const {
    mutateAsync: deleteBrands,
    isSuccess,
    error,
  } = useMutation(createDeleteRequest);

  if (error) {
    toast.error(error.toString());
  }
  if (isSuccess) {
    toast.success("Brand deleted");
  }

  return {
    deleteBrands,
  };
};

//get a single brand
export const useGetSingleBrand = (brandId: string) => {
  const createGetBrandsRequest = async () => {
    const response = await axios.get(`${apiBaseUrl}/brands/${brandId}`);
    return response.data;
  };

  const {
    data: brandData,
    error,
    isLoading,
  } = useQuery("getSingleBrand", createGetBrandsRequest);

  if (error) {
    toast.error(error.toString());
  }

  return {
    brandData,
    isLoading,
  };
};

//update single brand
export const useUpdateSingleBrand = (brandId: string) => {
  const updateBrandRequest = async (brandFormData: CreateBrandsType) => {
    const response = await axios.put(`${apiBaseUrl}/brands/${brandId}`, {
      name: brandFormData.name,
    });

    return response.data;
  };

  const {
    mutateAsync: updateBrand,
    isLoading,
    error,
    isSuccess,
  } = useMutation(updateBrandRequest);

  if (error) {
    toast.error(error.toString());
  }

  if (isSuccess) {
    toast.success("Brand updated");
  }
  return {
    updateBrand,
    isLoading,
  };
};
