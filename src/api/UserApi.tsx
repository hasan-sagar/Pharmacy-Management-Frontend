import { UserType } from "@/types/user-type";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL + "/api/v1";

//create new user or login hook
export const useCreateUserHook = () => {
  //create user/login api
  const createUserRequest = async (token: string) => {
    try {
      const response = axios.post(
        `${apiBaseUrl}/auth/google`,
        {
          token: token,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = (await response).data;
      localStorage.setItem("token", data?.access_token);
      return data;
    } catch (error) {
      console.log(error);
      toast.error(error?.toString());
    }
  };

  const {
    mutateAsync: createUser,
    isError,
    isLoading,
    isSuccess,
  } = useMutation(createUserRequest);

  if (isError) {
    toast.error(isError.toString());
  }

  if (isSuccess) {
    toast.success("Welcome to Store!");
  }

  return {
    createUser,
    isSuccess,
    isLoading,
  };
};

//check auth jwt
export const useCheckAuthHook = () => {
  const getAuthRequest = async () => {
    const response = await axios.get(`${apiBaseUrl}`);
    const data = response.data;
    return data;
  };

  const { data: currentAuth, isLoading } = useQuery(
    "fetchAuth",
    getAuthRequest
  );

  return {
    currentAuth,
    isLoading,
  };
};

//get user profile hook
export const userGetUserProfileHook = () => {
  const getUserRequest = async (): Promise<UserType> => {
    const response = await axios.get(`${apiBaseUrl}/users`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.data;
    return data;
  };

  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery("fetchCurrentUser", getUserRequest);

  if (error) {
    toast.error(error.toString());
  }

  return {
    currentUser,
    isLoading,
  };
};
