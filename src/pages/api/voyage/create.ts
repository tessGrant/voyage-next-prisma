import { PrismaClient, type Vessel, type Voyage } from "@prisma/client";
import type { NextApiHandler, NextApiResponse, NextApiRequest } from "next";

const prisma = new PrismaClient();

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Voyage>
) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  const voyageData = JSON.parse(req.body);
  console.log("in api");

  const pearlSeaways = await prisma.vessel.create({
    data: {
      name: "Pearl Seaways 12345",
    },
  });

  const savedVoyage = await prisma.voyage.create({
    data: {
      portOfLoading: voyageData.portOfLoading,
      portOfDischarge: voyageData.portOfDischarge,
      scheduledDeparture: voyageData.scheduledDeparture,
      scheduledArrival: voyageData.scheduledArrival,
      vesselId: pearlSeaways.id,
    },
  });
  res.json(savedVoyage);
};

export default handler;
