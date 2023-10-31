import type { NextApiHandler, NextApiResponse } from "next";
import type { ReturnType } from "../../types";
import { prisma } from "~/server/db";

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
