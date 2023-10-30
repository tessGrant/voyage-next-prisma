import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import Head from "next/head";
import Layout from "~/components/layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { fetchData, formSchema } from "~/utils";
import type { ReturnType } from "./api/voyage/getAll";
import { Button } from "~/components/ui/button";
import { TABLE_DATE_FORMAT } from "~/constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Voyage } from "@prisma/client";
import { type z } from "zod";
import AddVoyage from "./addVoyageModal";
import { useDeleteVoyage } from "./hooks/useDeleteVoyage";
import { useCreateVoyage } from "./hooks/useCreateVoyage";

export default function Home() {
  const { data: voyages } = useQuery<ReturnType>(["voyages"], () =>
    fetchData("voyage/getAll")
  );
  const { createVoyage, isError, isSuccess } = useCreateVoyage();
  const { deleteVoyage } = useDeleteVoyage();

  const handleDelete = (voyageId: string) => {
    deleteVoyage(voyageId);
  };

  const createVoyageForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      scheduledDeparture: "",
      scheduledArrival: "",
      portOfLoading: "",
      portOfDischarge: "",
    },
  });

  const onCreateVoyage = (values: z.infer<typeof formSchema>) => {
    const requestBody = {
      scheduledDeparture: new Date(values.scheduledDeparture),
      scheduledArrival: new Date(values.scheduledArrival),
      portOfLoading: values.portOfLoading,
      portOfDischarge: values.portOfDischarge,
      vesselId: "123",
      _count: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: "",
    };
    return createVoyage(requestBody);
  };

  return (
    <>
      <Head>
        <title>Voyages | DFDS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <AddVoyage form={createVoyageForm} onSubmit={onCreateVoyage} />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Departure</TableHead>
              <TableHead>Arrival</TableHead>
              <TableHead>Port of loading</TableHead>
              <TableHead>Port of discharge</TableHead>
              <TableHead>Vessel</TableHead>
              <TableHead>Unit Types</TableHead>
              <TableHead>&nbsp;</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {voyages?.map((voyage) => (
              <TableRow key={voyage.id}>
                <TableCell>
                  {format(
                    new Date(voyage.scheduledDeparture),
                    TABLE_DATE_FORMAT
                  )}
                </TableCell>
                <TableCell>
                  {format(new Date(voyage.scheduledArrival), TABLE_DATE_FORMAT)}
                </TableCell>
                <TableCell>{voyage.portOfLoading}</TableCell>
                <TableCell>{voyage.portOfDischarge}</TableCell>
                <TableCell>{voyage.vessel.name}</TableCell>
                <TableCell>{voyage._count.unitTypes}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleDelete(voyage.id)}
                    variant="outline"
                  >
                    X
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Layout>
    </>
  );
}
