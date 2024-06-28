import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import { useGetSingleSupplier } from "@/api/SuppliersApi";
import { useEffect } from "react";
import LoadSpinner from "../shared/LoadSpinner";

type Props = {
  onSave: (SupplierFormData: SupplierEditFormData) => void;
};

// Define form schema using Zod
const formSchema = z.object({
  name: z.string().min(1, "Name field required"),
  phone: z.optional(z.string()),
  companyName: z.string().min(1, "Company name field required"),
  address: z.optional(z.string()),
});

// Define form data type
export type SupplierEditFormData = z.infer<typeof formSchema>;

export default function SuppliersEditForm({ onSave }: Props) {
  const { supplierId } = useParams<{ supplierId: string }>();

  //single supplier hook
  const { supplierData, isLoading } = useGetSingleSupplier(
    supplierId as string
  );

  const form = useForm<SupplierEditFormData>({
    resolver: zodResolver(formSchema),
  });

  //update data change in form
  useEffect(() => {
    if (supplierData) {
      form.reset({
        name: supplierData.name,
        phone: supplierData.phone,
        companyName: supplierData.companyName,
        address: supplierData.address,
      });
    }
  }, [supplierData, form]);

  if (isLoading) {
    return <LoadSpinner />;
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">
          Edit Category Form
        </h1>
      </div>
      <div className="flex flex-1 rounded-lg border border-dashed shadow-sm p-4 bg-gray-50">
        <Form {...form}>
          <form
            className="space-y-2 w-full md:w-1/3 mx-auto"
            onSubmit={form.handleSubmit(onSave)}
          >
            {/* Name field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <FormControl>
                    <Input id="name" placeholder="Enter name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Company Name</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      placeholder="Enter company name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Phone</FormLabel>
                  <FormControl>
                    <Input id="name" placeholder="Enter phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Address</FormLabel>
                  <FormControl>
                    <Input id="name" placeholder="Enter address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end w-full">
              <Button type="submit" size="sm">
                Update
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}
