import { CreateCategoryType } from "@/types/create-category-type";
import axios from "axios";
import { useMutation } from "react-query";
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
