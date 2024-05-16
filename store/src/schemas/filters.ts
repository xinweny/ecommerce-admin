import * as z from "zod";

export const stringArrayStore = z.record(z.string(), z.array(z.string()));

export type StringArrayStore = z.infer<typeof stringArrayStore>;

export const numberRangeStore = z.record(z.string(), z.array(z.number()).length(2));

export type NumberRangeStore = z.infer<typeof numberRangeStore>;