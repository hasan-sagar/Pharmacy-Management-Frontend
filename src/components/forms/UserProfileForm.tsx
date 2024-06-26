import { UserType } from "@/types/user-type";
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

//forscmea zod declare
const formSchema = z.object({
  name: z.string().min(2, "Username must be at least 2 characters."),
  email: z.string().optional(),
  phone: z.optional(z.string()),
});

//export form data type
export type UserFormData = z.infer<typeof formSchema>;

//props
type Props = {
  currentUser: UserType;
  isLoading: boolean;
  //update profile data
  onSave: (userProfileData: UserFormData) => void;
};

export default function UserProfilePage({
  currentUser,
  isLoading,
  onSave,
}: Props) {
  //define form
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: currentUser,
  });

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">User Profile Form</h1>
      </div>
      {/* <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      > */}
      {/* form starts here */}
      <div className="flex flex-1 rounded-lg border border-dashed shadow-sm p-4 bg-gray-50">
        <Form {...form}>
          <form
            className="space-y-2 w-full md:w-1/3 mx-auto"
            onSubmit={form.handleSubmit(onSave)}
          >
            {/* name field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">User Name</FormLabel>
                  <FormControl>
                    <Input id="name" placeholder="Enter user name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* email field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email Address</FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      id="email"
                      placeholder="Enter email address"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* phone field */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="phone">Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      id="phone"
                      placeholder="Enter user phone"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end w-full">
              <Button type="submit" size="sm">
                {isLoading ? "Updating data" : "Update"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
      {/* </div> */}
    </main>
  );
}
