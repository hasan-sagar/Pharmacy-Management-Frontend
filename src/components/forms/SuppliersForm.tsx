import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Name field required"),
  phone: z.optional(z.string()),
  companyName: z.string().min(1, "Company name field required"),
  address: z.optional(z.string()),
});

export type SupplierFormData = z.infer<typeof formSchema>;

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isLoading: boolean;
  onSave: (supplierFormData: SupplierFormData) => void;
};

export function SuppliersForm({
  isOpen,
  onOpenChange,
  isLoading,
  onSave,
}: Props) {
  //hook form
  const form = useForm<SupplierFormData>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Dialog modal open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Suppliers</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-2" onSubmit={form.handleSubmit(onSave)}>
            {/* name field */}
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
            <DialogFooter>
              <Button size={"sm"} type="submit">
                {isLoading ? "Loading.." : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
