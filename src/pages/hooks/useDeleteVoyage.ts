import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteVoyage = () => {
  const queryClient = useQueryClient();

  const { mutate, isError, isSuccess } = useMutation(
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
    }
  );

  return {
    deleteVoyage: mutate,
    isError,
    isSuccess,
  };
};
