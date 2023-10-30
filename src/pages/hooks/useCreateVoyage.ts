import { type Voyage } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateVoyage = () => {
  const queryClient = useQueryClient();

  const { mutate, isError, isSuccess } = useMutation(
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
      },
    }
  );

  return {
    createVoyage: mutate,
    isError,
    isSuccess,
  };
};
