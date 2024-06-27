import { SearchState } from "@/pages/category/CategoryPage";
import { CreateCategoryType } from "@/types/create-category-type";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL + "/api/v1";

//create new category hook
export const useCreateCategoryHook = () => {
  const createCateogryRequest = async (formData: CreateCategoryType) => {
    const response = axios.post(
      `${apiBaseUrl}/category`,
      {
        name: formData.name,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = (await response).data;
    return data;
  };

  const {
    mutate: createCategory,
    isLoading,
    error,
    isSuccess,
  } = useMutation(createCateogryRequest);

  if (error) {
    toast.error(error.toString());
  }

  if (isSuccess) {
    toast.success("Category created");
    // window.location.href = "/category";
  }

  return {
    createCategory,
    isLoading,
  };
};

//search and fetch all categories
export const useSearchAndGetCategories = (searchState: SearchState) => {
  const createSearchRequest = async () => {
    const params = new URLSearchParams();

    params.set("query", searchState.searchQueryKeywords);
    params.set("page", searchState.page.toString());

    const response = await axios.get(
      `${apiBaseUrl}/category?${params.toString()}`
    );

    const data = await response.data;
    return data;
  };

  const { data: categoryData, isLoading } = useQuery(
    ["searchAndGetCategories", searchState],
    createSearchRequest
  );

  return {
    categoryData,
    isLoading,
  };
};

//delete a category
export const useDeleteCategoryHook = () => {
  const createDeleteRequest = async (categoryId: string) => {
    const response = await axios.delete(`${apiBaseUrl}/category/${categoryId}`);
    return response.data;
  };

  const {
    mutateAsync: deleteCategory,
    isSuccess,
    error,
  } = useMutation(createDeleteRequest);

  if (error) {
    toast.error(error.toString());
  }
  if (isSuccess) {
    toast.success("Category deleted");
  }

  return {
    deleteCategory,
  };
};

//get a single category
export const useGetSingleCategory = (categoryId: string) => {
  const createGetCategoryRequest = async () => {
    const response = await axios.get(`${apiBaseUrl}/category/${categoryId}`);
    return response.data;
  };

  const {
    data: categoryData,
    error,
    isLoading,
  } = useQuery("getSingleCategory", createGetCategoryRequest);

  if (error) {
    toast.error(error.toString());
  }

  return {
    categoryData,
    isLoading,
  };
};

//update single category
export const useUpdateSingleCategory = (cateogryId: string) => {
  const updateCategoryRequest = async (
    categoryFormData: CreateCategoryType
  ) => {
    const response = await axios.put(`${apiBaseUrl}/category/${cateogryId}`, {
      name: categoryFormData.name,
    });

    return response.data;
  };

  const {
    mutateAsync: updateCategory,
    isLoading,
    error,
    isSuccess,
  } = useMutation(updateCategoryRequest);

  if (error) {
    toast.error(error.toString());
  }

  if (isSuccess) {
    toast.success("Category updated");
  }
  return {
    updateCategory,
    isLoading,
  };
};
