export type OrderType = {
  _id?: string;
  invoiceNo: string;
  user?: string;
  customerDetails: {
    name: string;
    phone: string;
    address: string;
  };
  cartItems: {
    productId: string;
    quantity: number;
    name: string;
    price: number;
  }[];

  totalAmount: number;
  totalItems: number;
  status?: string;
};
