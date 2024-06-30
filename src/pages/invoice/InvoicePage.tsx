import { useGetSingleOrder } from "@/api/OrdersApi";
import LoadSpinner from "@/components/shared/LoadSpinner";
import { ChevronLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function InvoicePage() {
  //location
  const { invoiceId } = useParams<{ invoiceId: string }>();

  //get order hook
  const { isLoading, orderData } = useGetSingleOrder(invoiceId as string);

  //print invoice
  function handlePrint() {
    window.print();
  }

  //loader
  if (isLoading) {
    return <LoadSpinner />;
  }

  return (
    <>
      <div>
        <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10">
          <Link to={"/sales"} className="no-print">
            <h2 className="text-sm font-semibold text-gray-800 dark:text-neutral-200 flex items-center underline">
              <ChevronLeft size={15} /> Go Back
            </h2>
          </Link>
          <div className="mb-5 pb-5 flex justify-between items-center border-b border-gray-200 dark:border-neutral-700">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-neutral-200">
                Lazz Pharma Invoice
              </h2>
            </div>
            <div className="inline-flex gap-x-2 no-print">
              <a
                className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-lg border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                href="#"
              >
                <svg
                  className="flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1={12} x2={12} y1={15} y2={3} />
                </svg>
                Invoice PDF
              </a>
              <a
                onClick={handlePrint}
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                href="#"
              >
                <svg
                  className="flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 6 2 18 2 18 9" />
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                  <rect width={12} height={8} x={6} y={14} />
                </svg>
                Print
              </a>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <div className="grid space-y-3">
                <dl className="grid sm:flex gap-x-3 text-sm">
                  <dt className="min-w-36 max-w-[200px] text-gray-500 dark:text-neutral-500">
                    Billed to:
                  </dt>
                  <dd className="text-gray-800 dark:text-neutral-200">
                    <a
                      className="inline-flex items-center gap-x-1.5 text-blue-600 decoration-2 hover:underline font-medium dark:text-blue-500"
                      href="#"
                    >
                      {orderData?.customerDetails.name}
                    </a>
                  </dd>
                </dl>
                <dl className="grid sm:flex gap-x-3 text-sm">
                  <dt className="min-w-36 max-w-[200px] text-gray-500 dark:text-neutral-500">
                    Billing details:
                  </dt>
                  <dd className="font-medium text-gray-800 dark:text-neutral-200">
                    <span className="block font-semibold">
                      {orderData.customerDetails.name}
                    </span>
                    <address className="not-italic font-normal">
                      {orderData.customerDetails.phone}
                      <br />
                      {orderData.customerDetails.address}
                      <br />
                    </address>
                  </dd>
                </dl>
                <dl className="grid sm:flex gap-x-3 text-sm">
                  <dt className="min-w-36 max-w-[200px] text-gray-500 dark:text-neutral-500">
                    Billing Status:
                  </dt>
                  <dd className="font-medium text-gray-800 dark:text-neutral-200">
                    <span className="block text-green-500 font-semibold">
                      {orderData.status}
                    </span>
                  </dd>
                </dl>
              </div>
            </div>
            <div>
              <div className="grid space-y-3">
                <dl className="grid sm:flex gap-x-3 text-sm">
                  <dt className="min-w-36 max-w-[200px] text-gray-500 dark:text-neutral-500">
                    Invoice number:
                  </dt>
                  <dd className="font-medium text-gray-800 dark:text-neutral-200">
                    {orderData.invoiceNo}
                  </dd>
                </dl>
                <dl className="grid sm:flex gap-x-3 text-sm">
                  <dt className="min-w-36 max-w-[200px] text-gray-500 dark:text-neutral-500">
                    Currency:
                  </dt>
                  <dd className="font-medium text-gray-800 dark:text-neutral-200 uppercase">
                    BDT - Bangladeshi Taka
                  </dd>
                </dl>
                <dl className="grid sm:flex gap-x-3 text-sm">
                  <dt className="min-w-36 max-w-[200px] text-gray-500 dark:text-neutral-500">
                    Bill date:
                  </dt>
                  <dd className="font-medium text-gray-800 dark:text-neutral-200">
                    {new Date(orderData.createdAt).toISOString().split("T")[0]}
                  </dd>
                </dl>
                <dl className="grid sm:flex gap-x-3 text-sm">
                  <dt className="min-w-36 max-w-[200px] text-gray-500 dark:text-neutral-500">
                    Billing method:
                  </dt>
                  <dd className="font-medium text-gray-800 dark:text-neutral-200">
                    Cash
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="mt-6 border border-gray-200 p-4 rounded-lg space-y-4 dark:border-neutral-700">
            <div className="hidden sm:grid sm:grid-cols-5">
              <div className="sm:col-span-2 text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                Item
              </div>
              <div className="text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                Qty
              </div>
              <div className="text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                Rate
              </div>
              <div className="text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                Amount
              </div>
            </div>
            <div className="hidden sm:block border-b border-gray-200 dark:border-neutral-700" />
            {/*  cart items */}

            {orderData?.cartItems.map((item: any) => (
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                <div className="col-span-full sm:col-span-2">
                  <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                    Item
                  </h5>
                  <p className="font-medium text-gray-800 dark:text-neutral-200">
                    {item.name}
                  </p>
                </div>
                <div>
                  <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                    Qty
                  </h5>
                  <p className="text-gray-800 dark:text-neutral-200">
                    {item.quantity}
                  </p>
                </div>
                <div>
                  <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                    {item.quantity}
                  </h5>
                  <p className="text-gray-800 dark:text-neutral-200">
                    {item.price}
                  </p>
                </div>
                <div>
                  <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                    Amount
                  </h5>
                  <p className="sm:text-end text-gray-800 dark:text-neutral-200">
                    ৳ {item.quantity * item.price}
                  </p>
                </div>
              </div>
            ))}
            {/*  cart items */}

            <div className="sm:hidden border-b border-gray-200 dark:border-neutral-700" />
          </div>
          <div className="mt-8 flex sm:justify-end">
            <div className="w-full max-w-2xl sm:text-end space-y-2">
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                <dl className="grid sm:grid-cols-5 gap-x-3 text-sm">
                  {/* <dt className="col-span-3 text-gray-500 dark:text-neutral-500">
                    Subotal:
                  </dt> */}
                  {/* <dd className="col-span-2 font-medium text-gray-800 dark:text-neutral-200">
                  ৳ {orderData.totalAmount}
                  </dd> */}
                </dl>
                <dl className="grid sm:grid-cols-5 gap-x-3 text-sm">
                  <dt className="col-span-3 text-gray-500 dark:text-neutral-500">
                    Total:
                  </dt>
                  <dd className="col-span-2 font-medium text-gray-800 dark:text-neutral-200">
                    ৳ {orderData.totalAmount}
                  </dd>
                </dl>
                <dl className="grid sm:grid-cols-5 gap-x-3 text-sm">
                  <dt className="col-span-3 text-gray-500 dark:text-neutral-500">
                    Tax:
                  </dt>
                  <dd className="col-span-2 font-medium text-gray-800 dark:text-neutral-200">
                    ৳ 0
                  </dd>
                </dl>
                <dl className="grid sm:grid-cols-5 gap-x-3 text-sm">
                  <dt className="col-span-3 text-gray-500 dark:text-neutral-500">
                    Amount paid:
                  </dt>
                  <dd className="col-span-2 font-medium text-gray-800 dark:text-neutral-200">
                    ৳ {orderData.totalAmount}
                  </dd>
                </dl>
                <dl className="grid sm:grid-cols-5 gap-x-3 text-sm">
                  <dt className="col-span-3 text-gray-500 dark:text-neutral-500">
                    Due balance:
                  </dt>
                  <dd className="col-span-2 font-medium text-gray-800 dark:text-neutral-200">
                    ৳ 0
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
