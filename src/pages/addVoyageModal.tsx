import { useState } from "react";
import { type UseFormReturn } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "~/components/ui/sheet";

interface AddVoyageProps {
  form: UseFormReturn<
    {
      scheduledDeparture: string;
      scheduledArrival: string;
      portOfLoading: string;
      portOfDischarge: string;
    },
    null,
    undefined
  >;
  onSubmit: (values: {
    portOfLoading: string;
    portOfDischarge: string;
    scheduledDeparture: string;
    scheduledArrival: string;
  }) => void;
}

export default function AddVoyage({ form, onSubmit }: AddVoyageProps) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        style={{ margin: "10px 30px 10px -5px", width: "150px" }}
        type="button"
      >
        Create Voyage
      </SheetTrigger>
      <SheetContent side="left" className="overflow-auto sm:w-[100%]">
        <SheetTitle title="Add new voyage" className="mx-auto my-8 w-[400px]">
          Add new voyage
        </SheetTitle>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form?.control}
              name="scheduledDeparture"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Departure</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="choose departure date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form?.control}
              name="scheduledArrival"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Arrival</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="choose arrival date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form?.control}
              name="portOfLoading"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Port of Loading</FormLabel>
                  <FormControl>
                    <Input placeholder="choose port" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form?.control}
              name="portOfDischarge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Port of discharge</FormLabel>
                  <FormControl>
                    <Input placeholder="choose port" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" onClick={() => setOpen(false)}>
              Submit
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
