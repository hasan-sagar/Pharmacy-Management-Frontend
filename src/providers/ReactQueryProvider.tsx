import axios from "axios";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};

function ReactQueryProvider({ children }: Props) {
  useEffect(() => {
    axios.interceptors.request.use(
      (config) => {
        config.headers["Authorization"] = `Bearer ${localStorage.getItem(
          "token"
        )}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    axios.interceptors.response.use(
      function (response) {
        console.log(response);
        return response;
      },
      function (error) {
        if (error.response.status === 401) {
          console.log(error.response.status);

          // acces denied
          window.location.href = "/login";
          localStorage.removeItem("token");
        }
        return Promise.reject(error);
      }
    );
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
}

export default ReactQueryProvider;
