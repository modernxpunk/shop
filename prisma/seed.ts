import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { getRandomImgSrc } from "../src/utils/view";

const prisma = new PrismaClient();

async function main() {
	const catalogs = faker.helpers
		.uniqueArray(faker.commerce.product, 10)
		.map((name) => ({
			id: faker.datatype.uuid(),
			name: name,
		}));

	const users = faker.helpers
		.uniqueArray(faker.internet.email, 100)
		.map((email) => ({
			id: faker.datatype.uuid(),
			email: email,
		}));

	const products = Array(100)
		.fill(0x00)
		.map(() => ({
			id: faker.datatype.uuid(),
			name: faker.commerce.productName(),
			price: +faker.commerce.price(100, 1000, 0),
			image: getRandomImgSrc(),
			description: faker.lorem.paragraphs(),
			poster: getRandomImgSrc(),
			catalogId: faker.helpers.arrayElement(catalogs).id,
			isInStock: true,
			rate: 0,
			rated: 0,
			view: 0,
		}));

	const comments = faker.helpers
		.uniqueArray(faker.lorem.paragraphs, 500)
		.map((comment) => ({
			id: faker.datatype.uuid(),
			productId: faker.helpers.arrayElement(products).id,
			userId: faker.helpers.arrayElement(users).id,
			content: comment,
		}));

	await prisma.user.createMany({
		data: users,
		skipDuplicates: true,
	});
	await prisma.catalog.createMany({
		data: catalogs,
		skipDuplicates: true,
	});
	await prisma.product.createMany({
		data: products,
		skipDuplicates: true,
	});
	await prisma.comment.createMany({
		data: comments,
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
