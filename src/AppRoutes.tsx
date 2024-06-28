import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";

import Dashboard from "./pages/Dashboard";
import PointOfSale from "./pages/PointOfSale";
import LoginPage from "./pages/LoginPage";
import UserProfilePage from "./pages/UserProfilePage";
import CategoryPage from "./pages/category/CategoryPage";
import CategoryEditpage from "./pages/category/CategoryEditpage";
import BrandsPage from "./pages/brands/BrandsPage";
import BrandsEditpage from "./pages/brands/BrandsEditPage";
import SuppliersPage from "./pages/suppliers/SuppliersPage";
import SuppliersEditPage from "./pages/suppliers/SuppliersEditPage";
import PurchasePage from "./pages/products/PurchasePage";
import PurchaseFormPage from "./pages/products/PurchaseFormPage";
import PurchaseEditPage from "./pages/products/PurchaseEditPage";
import ProductInStockPage from "./pages/products/ProductInStockPage";
import ProductOutOfStockPage from "./pages/products/ProductOutOfStockPage";
import ProductExpirePage from "./pages/products/ProductExpirePage";

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
          path="/users"
          element={
            <Layout>
              <UserProfilePage />
            </Layout>
          }
        />
        <Route
          path="/category"
          element={
            <Layout>
              <CategoryPage />
            </Layout>
          }
        />
        <Route
          path="/category/:categoryId"
          element={
            <Layout>
              <CategoryEditpage />
            </Layout>
          }
        />
        <Route
          path="/brands"
          element={
            <Layout>
              <BrandsPage />
            </Layout>
          }
        />
        <Route
          path="/brands/:brandId"
          element={
            <Layout>
              <BrandsEditpage />
            </Layout>
          }
        />
        <Route
          path="/suppliers"
          element={
            <Layout>
              <SuppliersPage />
            </Layout>
          }
        />
        <Route
          path="/suppliers/:supplierId"
          element={
            <Layout>
              <SuppliersEditPage />
            </Layout>
          }
        />
        <Route
          path="/product/purchase"
          element={
            <Layout>
              <PurchasePage />
            </Layout>
          }
        />
        <Route
          path="/purchase/create"
          element={
            <Layout>
              <PurchaseFormPage />
            </Layout>
          }
        />
        <Route
          path="/purchase/:purchaseId"
          element={
            <Layout>
              <PurchaseEditPage />
            </Layout>
          }
        />
        <Route
          path="/products/inStock"
          element={
            <Layout>
              <ProductInStockPage />
            </Layout>
          }
        />
        <Route
          path="/products/stockOut"
          element={
            <Layout>
              <ProductOutOfStockPage />
            </Layout>
          }
        />
        <Route
          path="/products/expired"
          element={
            <Layout>
              <ProductExpirePage />
            </Layout>
          }
        />

        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}
