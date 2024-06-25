import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";

import Dashboard from "./pages/Dashboard";
import PointOfSale from "./pages/PointOfSale";
import AllProducts from "./pages/AllProducts";
import LoginPage from "./pages/LoginPage";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/pos"
          element={
            <Layout>
              <PointOfSale />
            </Layout>
          }
        />
        <Route
          path="/products"
          element={
            <Layout>
              <AllProducts />
            </Layout>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}
