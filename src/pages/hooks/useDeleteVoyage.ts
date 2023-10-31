import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "~/components/ui/use-toast";

export const useDeleteVoyage = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate } = useMutation(
    async (voyageId: string) => {
      const response = await fetch(`/api/voyage/delete?id=${voyageId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the voyage");
      }
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["voyages"]);
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Voyage was not successfuly deleted.Please try again.",
        });
      },
    }
  );

  return {
    deleteVoyage: mutate,
  };
};
