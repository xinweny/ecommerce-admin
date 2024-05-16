import * as z from "zod";

export const arrayStore = z.record(z.string(), z.array(z.any()));

export type ArrayStore = z.infer<typeof arrayStore>;

export const numberRangeStore = z.record(z.string(), z.array(z.number()).length(2));

export type NumberRangeStore = z.infer<typeof numberRangeStore>;