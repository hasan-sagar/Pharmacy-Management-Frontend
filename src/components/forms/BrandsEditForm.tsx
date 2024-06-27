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
import { useGetSingleBrand } from "@/api/BrandsApi";
import LoadSpinner from "../shared/LoadSpinner";
import { useEffect } from "react";

type Props = {
  onSave: (BrandFormData: BrandsEditFormData) => void;
};

// Define form schema using Zod
const formSchema = z.object({
  name: z.string().min(2, "Brand name must be at least 2 characters."),
});

// Define form data type
export type BrandsEditFormData = z.infer<typeof formSchema>;

export default function BrandsEditForm({ onSave }: Props) {
  const { brandId } = useParams<{ brandId: string }>();

  //single brand hook
  const { brandData, isLoading } = useGetSingleBrand(brandId as string);

  const form = useForm<BrandsEditFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: brandData?.name || "",
    },
  });

  // update data change in form
  useEffect(() => {
    if (brandData) {
      form.reset({
        name: brandData.name,
      });
    }
  }, [brandData, form]);

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
                  <FormLabel htmlFor="name">Edit Brand</FormLabel>
                  <FormControl>
                    <Input id="name" placeholder="Enter brand" {...field} />
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
