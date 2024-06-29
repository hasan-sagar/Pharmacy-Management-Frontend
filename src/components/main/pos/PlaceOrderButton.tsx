import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  onCheckout: (orderFormData: PlaceOrderFormData) => void;
};

const formSchema = z.object({
  name: z.string().min(1, "Name field required"),
  phone: z.optional(z.string()),
  address: z.optional(z.string()),
});

export type PlaceOrderFormData = z.infer<typeof formSchema>;

export default function PlaceOrderButton({ onCheckout }: Props) {
  //hook form
  const form = useForm<PlaceOrderFormData>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full my-2">Place Order</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[450px] md:min-w-[700px] bg-gray-50">
        <DialogHeader>
          <DialogTitle className="text-xl">Place New Orders</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-2" onSubmit={form.handleSubmit(onCheckout)}>
            {/* name field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Customer Name</FormLabel>
                  <FormControl>
                    <Input id="name" placeholder="Enter name" {...field} />
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
                  <FormLabel htmlFor="phone">Customer Phone</FormLabel>
                  <FormControl>
                    <Input id="phone" placeholder="Enter Phone" {...field} />
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
                  <FormLabel htmlFor="address">Customer Address</FormLabel>
                  <FormControl>
                    <Input
                      id="address"
                      placeholder="Enter Address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button size={"sm"} className="my-4">
              Confirm order
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
