import type { Vessel, Voyage } from "@prisma/client";
import type { NextApiHandler, NextApiResponse } from "next";
import { prisma } from "~/server/db";

export type ReturnType = (Voyage & {
  vessel: Vessel;
  _count: {
    unitTypes: number;
  };
})[];

const handler: NextApiHandler = async (_, res: NextApiResponse<ReturnType>) => {
  const voyages = await prisma.voyage.findMany({
    include: {
      vessel: {},
      _count: {
        select: {
          unitTypes: true,
        },
      },
    },
  });

  res.status(200).json(voyages);
};

export default handler;
