import { type Voyage } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
/**
 * Relative path /api/${path}
 * @param path
 * @returns
 */
export async function fetchData(path: string) {
  const response = await fetch(`/api/${path}`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}

export const formSchema = z.object({
  scheduledDeparture: z.string().min(2, {
    message: "Departure date is requared",
  }),
  scheduledArrival: z.string().min(2, {
    message: "Arrival date is requared",
  }),
  portOfLoading: z.string().min(2, {
    message: "Fields is requared",
  }),
  portOfDischarge: z.string().min(2, {
    message: "Fields is requared",
  }),
});
