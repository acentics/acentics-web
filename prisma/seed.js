const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.relationshipManager.count();
  if (count > 0) {
    console.log("Relationship managers already seeded, skipping.");
    return;
  }
  await prisma.relationshipManager.createMany({
    data: [
      { name: "Maya Chen", title: "Senior Relationship Manager", email: "maya@acentics.com", phone: "+1 (212) 555-0142" },
      { name: "Daniel Ortiz", title: "Senior Relationship Manager", email: "daniel@acentics.com", phone: "+1 (212) 555-0187" },
      { name: "Priya Nair", title: "Relationship Manager", email: "priya@acentics.com", phone: "+1 (212) 555-0163" },
    ],
  });
  console.log("Seeded 3 relationship managers.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
