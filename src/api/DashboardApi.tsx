import axios from "axios";
import { useQuery } from "react-query";
import { toast } from "sonner";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL + "/api/v1";

//get dashboard summary
export const useGetDashboardSummary = () => {
  const createGetDashboardRequest = async () => {
    const response = await axios.get(`${apiBaseUrl}/dashboard`);
    return response.data;
  };

  const {
    data: dashboardData,
    error,
    isLoading,
  } = useQuery("getDashboardSummary", createGetDashboardRequest);

  if (error) {
    toast.error(error.toString());
  }

  return {
    dashboardData,
    isLoading,
  };
};

//get dashboard recent orders
export const useGetRecentOrders = () => {
  const createGetOrdersRequest = async () => {
    const response = await axios.get(`${apiBaseUrl}/dashboard/recent-orders`);
    return response.data;
  };

  const {
    data: recentOrdersData,
    error,
    isLoading,
  } = useQuery("getRecentOrders", createGetOrdersRequest);

  if (error) {
    toast.error(error.toString());
  }

  return {
    recentOrdersData,
    isLoading,
  };
};

//get dashboard all orders summary
export const useGetOrdersSummary = () => {
  const createGetOrdersRequest = async () => {
    const response = await axios.get(`${apiBaseUrl}/dashboard/orders-summary`);
    return response.data;
  };

  const {
    data: ordersSummaryData,
    error,
    isLoading,
  } = useQuery("getOrdersSummary", createGetOrdersRequest);

  if (error) {
    toast.error(error.toString());
  }

  return {
    ordersSummaryData,
    isLoading,
  };
};
