import { type Voyage } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "~/components/ui/use-toast";

export const useCreateVoyage = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate } = useMutation(
    async (voyage: Voyage) => {
      console.log("in mutation");
      const response = await fetch("/api/voyage/create", {
        method: "POST",
        body: JSON.stringify(voyage),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["voyages"]);
        toast({
          title: "A new Voyage added!!!",
          description: "Hura! You succussfuly added a new Voyage",
        });
      },
    }
  );

  return {
    createVoyage: mutate,
  };
};
