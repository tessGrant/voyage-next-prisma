import { type Vessel, type Voyage } from "@prisma/client";

export type ReturnType = (Voyage & {
  vessel: Vessel;
  _count: {
    unitTypes: number;
  };
})[];

export interface VoyageFormData {
  scheduledDeparture: string;
  scheduledArrival: string;
  portOfLoading: string;
  portOfDischarge: string;
}
