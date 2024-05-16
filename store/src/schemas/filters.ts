import * as z from "zod";

const StringIds = z.array(z.string());

export const stringIdsStore = z.record(z.string(), StringIds);

export type StringIdsStore = z.infer<typeof stringIdsStore>;