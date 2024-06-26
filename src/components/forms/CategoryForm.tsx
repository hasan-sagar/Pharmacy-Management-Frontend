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
});

export type CategoryFormData = z.infer<typeof formSchema>;

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (categoryFormData: CategoryFormData) => void;
  isLoading: boolean;
};

export function CategoryForm({
  isOpen,
  onOpenChange,
  onSave,
  isLoading,
}: Props) {
  //hook form
  const form = useForm<CategoryFormData>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Dialog modal open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-2" onSubmit={form.handleSubmit(onSave)}>
            {/* name field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Category </FormLabel>
                  <FormControl>
                    <Input id="name" placeholder="Enter category" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">
                {isLoading ? "Creating.." : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
