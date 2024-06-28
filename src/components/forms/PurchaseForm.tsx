import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { z } from "zod";
import { useState } from "react";
import { useGetAllCategory } from "@/api/CategoryApi";
import { CategoryType } from "@/types/category-type";
import { useGetAllbrands } from "@/api/BrandsApi";
import { BrandsType } from "@/types/brand-type";
import { useGetAllSuppliers } from "@/api/SuppliersApi";
import { SuppeliersType } from "@/types/suppliers-type";

type Props = {
  onSave: (purchaseFormData: PurchaseFormData) => void;
  isLoading: boolean;
};

const formSchema = z.object({
  medicineName: z.string().min(1, "Medicine name field required"),
  category: z.string().min(1, "Category field required"),
  brands: z.string().min(1, "Brands field required"),
  supplier: z.string().min(1, "Supplier field required"),
  buyPrice: z
    .string()
    .min(1, "Buy price field required")
    .transform((val) => parseFloat(val)),
  sellPrice: z
    .string()
    .min(1, "Sell price field required")
    .transform((val) => parseFloat(val)),
  quantity: z
    .string()
    .min(1, "Quantity field required")
    .transform((val) => parseInt(val, 10)),
  expireDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date",
  }),
});

export type PurchaseFormData = z.infer<typeof formSchema>;

export function PurchaseForm({ isLoading, onSave }: Props) {
  //pop modal open state
  const [open, setOpen] = useState(false);
  //pop modal brand open
  const [openBrand, setOpenBrand] = useState(false);
  //pop modal supplier open
  const [openSupplier, setOpenSupplier] = useState(false);

  //get all category hook
  const { categoryData } = useGetAllCategory();
  //get all brands hook
  const { brandsData } = useGetAllbrands();
  //get all suppliers hook
  const { suppliersData } = useGetAllSuppliers();

  //form
  const form = useForm<PurchaseFormData>({
    resolver: zodResolver(formSchema),
  });

  //category select
  const handleCategorySelect = (categoryId: string) => {
    const selectedCategory = categoryData.find(
      (category: CategoryType) => category._id === categoryId
    );
    if (selectedCategory) {
      form.setValue("category", selectedCategory._id);
      setOpenBrand(false);
    }
  };

  //brands select
  const handleBrandSelect = (brandId: string) => {
    const selectedBrand = brandsData.find(
      (brand: BrandsType) => brand._id === brandId
    );
    if (selectedBrand) {
      form.setValue("brands", selectedBrand._id);
      setOpen(false);
    }
  };

  //suppliers select
  const handleSupplierSelect = (supplierId: string) => {
    const selectedSupplier = suppliersData.find(
      (supplier: SuppeliersType) => supplier._id === supplierId
    );
    if (selectedSupplier) {
      form.setValue("supplier", selectedSupplier._id);
      setOpenSupplier(false);
    }
  };

  // useEffect(() => {
  //   navigate(0);
  // }, [onSave, form]);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">
          Product Purchase Form
        </h1>
      </div>

      <div className="flex flex-1 rounded-lg border border-dashed shadow-sm p-4 bg-gray-50">
        <Form {...form}>
          <form
            className="space-y-4 w-full mx-auto"
            onSubmit={form.handleSubmit(onSave)}
          >
            {/* medicine name */}
            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/3 px-2 mb-4">
                <FormField
                  control={form.control}
                  name="medicineName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="medicineName">
                        Medicine Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="medicineName"
                          placeholder="Enter medicine name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* category data */}
              <div className="w-full md:w-1/3 px-2 mb-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="category">Category</FormLabel>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between"
                          >
                            {field.value
                              ? categoryData.find(
                                  (category: CategoryType) =>
                                    category._id === field.value
                                )?.name
                              : "Select category..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search category..." />
                            <CommandList>
                              <CommandEmpty>No category found.</CommandEmpty>
                              <CommandGroup>
                                {categoryData?.map((category: CategoryType) => (
                                  <CommandItem
                                    key={category._id}
                                    value={category._id}
                                    onSelect={handleCategorySelect}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        field.value === category._id
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {category.name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Brand data */}
              <div className="w-full md:w-1/3 px-2 mb-4">
                <FormField
                  control={form.control}
                  name="brands"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="category">Brand</FormLabel>
                      <Popover
                        open={openSupplier}
                        onOpenChange={setOpenSupplier}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between"
                          >
                            {field.value
                              ? brandsData.find(
                                  (brand: BrandsType) =>
                                    brand._id === field.value
                                )?.name
                              : "Select brand..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search category..." />
                            <CommandList>
                              <CommandEmpty>No brand found.</CommandEmpty>
                              <CommandGroup>
                                {brandsData?.map((brand: BrandsType) => (
                                  <CommandItem
                                    key={brand._id}
                                    value={brand._id}
                                    onSelect={handleBrandSelect}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        field.value === brand._id
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {brand.name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/*  suppliers data */}
              <div className="w-full md:w-1/3 px-2 mb-4">
                <FormField
                  control={form.control}
                  name="supplier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="category">Supplier</FormLabel>
                      <Popover open={openBrand} onOpenChange={setOpenBrand}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between"
                          >
                            {field.value
                              ? suppliersData.find(
                                  (supplier: SuppeliersType) =>
                                    supplier._id === field.value
                                )?.name
                              : "Select supplier..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search category..." />
                            <CommandList>
                              <CommandEmpty>No supplier found.</CommandEmpty>
                              <CommandGroup>
                                {suppliersData?.map(
                                  (supplier: SuppeliersType) => (
                                    <CommandItem
                                      key={supplier._id}
                                      value={supplier._id}
                                      onSelect={handleSupplierSelect}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          field.value === supplier._id
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      {supplier.name}
                                    </CommandItem>
                                  )
                                )}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/*  buy price*/}
              <div className="w-full md:w-1/3 px-2 mb-4">
                <FormField
                  control={form.control}
                  name="buyPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="buyPrice">Buy price</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter buy price"
                          type="number"
                          id="buyPrice"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/*  sell price*/}
              <div className="w-full md:w-1/3 px-2 mb-4">
                <FormField
                  control={form.control}
                  name="sellPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="sellPrice">Sell price</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter sell price"
                          type="number"
                          id="sellPrice"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Quantity */}
              <div className="w-full md:w-1/3 px-2 mb-4">
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="quantity">Quantity</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter quantity"
                          type="number"
                          id="quantity"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* expire date */}
              <div className="w-full md:w-1/3 px-2 mb-4">
                <FormField
                  control={form.control}
                  name="expireDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="expireDate">Expire Date</FormLabel>
                      <FormControl>
                        <Input type="date" id="expireDate" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end w-full">
              <Button className="px-10" type="submit">
                {isLoading ? "Loading..." : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}
