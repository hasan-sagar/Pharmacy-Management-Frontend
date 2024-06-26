// import { Input } from "../ui/input";

// export default function CateogrySearchBar() {
//   return (
//     <>
//       <Input placeholder="Search by name" />
//     </>
//   );
// }
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Delete, Search } from "lucide-react";

import { useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const formSchema = z.object({
  searchQueryKeywords: z.string({
    required_error: "Restaurant name is required",
  }),
});

export type SearchForm = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (formData: SearchForm) => void;
  placeHolder: string;
  //   onReset?: () => void;
  searchQueryKeywords?: string;
};

const CateogrySearchBar = ({
  onSubmit,
  placeHolder,
  searchQueryKeywords,
}: Props) => {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQueryKeywords,
    },
  });

  //reset
  const handleReset = () => {
    form.reset({
      searchQueryKeywords: "",
    });

    // if (onReset) {
    //   onReset();
    // }
  };

  useEffect(() => {
    form.reset({ searchQueryKeywords });
  }, [form, searchQueryKeywords]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex items-center gap-3 justify-between flex-row  ${
          form.formState.errors.searchQueryKeywords && "border-red-500"
        }`}
      >
        <FormField
          control={form.control}
          name="searchQueryKeywords"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input {...field} placeholder={placeHolder} />
              </FormControl>
            </FormItem>
          )}
        />

        <div>
          <Button
            size={"sm"}
            onClick={handleReset}
            type="button"
            variant="destructive"
            className="rounded-sm  text-white me-1"
          >
            <Delete />
          </Button>

          <Button
            variant={"default"}
            size={"sm"}
            type="submit"
            className="rounded-sm"
          >
            <Search />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CateogrySearchBar;
