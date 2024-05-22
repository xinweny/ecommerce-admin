import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ");

export const generateOrderNumber = () => {
  return nanoid(16);
};