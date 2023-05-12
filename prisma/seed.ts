import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { getRandomImgSrc } from "../src/utils/view";

const prisma = new PrismaClient();

async function main() {
	const catalogs = faker.helpers
		.uniqueArray(faker.commerce.product, 10)
		.map((name) => ({ name }));

	const products = Array(100)
		.fill(0x00)
		.map(() => ({
			name: faker.commerce.productName(),
			price: +faker.commerce.price(100, 1000, 0),
			catalogId: +faker.datatype.number({ min: 1, max: catalogs.length }),
			image: getRandomImgSrc(),
			description: faker.commerce.productDescription(),
		}));

	await prisma.catalog.createMany({
		data: catalogs,
		skipDuplicates: true,
	});
	await prisma.product.createMany({
		data: products,
		skipDuplicates: true,
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
