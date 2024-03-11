import { db } from "@/lib/db";

async function main() {

}

main()
  .then(async () => { await db.$disconnect() });