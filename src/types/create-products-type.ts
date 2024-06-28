export type CreateProductsType = {
  medicineName: string;
  category: string;
  brands: string;
  supplier: string;
  user?: string;
  buyPrice: number;
  sellPrice: number;
  quantity: number;
  expireDate: any | Date;
};
