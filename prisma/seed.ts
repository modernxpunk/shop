import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { getRandomImgSrc } from "../src/utils/view";

const prisma = new PrismaClient();

async function main() {
	const generate = {
		users: 10,
		catalog: 10,
		products: 100,
		discount: 1,
		tags: 20,
		comments: 50,
	};

	const users = faker.helpers
		.uniqueArray(faker.internet.email, generate.users)
		.map((email) => ({
			id: faker.datatype.uuid(),
			email: email,
			username: faker.internet.userName(),
			avatar: faker.internet.avatar(),
			password: faker.internet.password(),
		}));

	const catalogs = faker.helpers
		.uniqueArray(faker.commerce.product, generate.catalog)
		.map((name) => ({
			id: faker.datatype.uuid(),
			name: name,
		}));

	const productsIds = Array(generate.products)
		.fill(0x00)
		.map(() => faker.datatype.uuid());

	const discount = faker.helpers
		.uniqueArray(productsIds, Math.floor(generate.discount))
		.map((id) => ({
			percent: faker.datatype.number({ min: 5, max: 40 }),
			isActive: faker.datatype.boolean(),
		}));

	const products = productsIds.map((id) => ({
		id: id,
		name: faker.commerce.productName(),
		price: +faker.commerce.price(100, 1000, 0),
		image: getRandomImgSrc(),
		description: faker.lorem.paragraphs(),
		poster: getRandomImgSrc(),
		view: faker.datatype.number({ min: 50, max: 1000 }),
		catalogId: faker.helpers.arrayElement(catalogs).id,
		isInStock: faker.datatype.boolean(),
	}));

	const tags = Array(generate.tags)
		.fill(0x00)
		.map(() => ({
			name: faker.commerce.productAdjective(),
			productId: faker.helpers.arrayElement(products).id,
		}));

	const comments = faker.helpers
		.uniqueArray(faker.lorem.paragraphs, generate.comments)
		.map((comment) => ({
			id: faker.datatype.uuid(),
			productId: faker.helpers.arrayElement(products).id,
			userId: faker.helpers.arrayElement(users).id,
			content: comment,
			likes: faker.datatype.number({ min: 0, max: 10 }),
			rate: faker.datatype.number({ min: 0, max: 5 }),
		}));

	await prisma.user.createMany({
		data: users,
		skipDuplicates: true,
	});
	await prisma.catalog.createMany({
		data: catalogs,
		skipDuplicates: true,
	});
	await prisma.discount.createMany({
		data: discount,
		skipDuplicates: true,
	});
	await prisma.product.createMany({
		data: products,
		skipDuplicates: true,
	});
	await prisma.tag.createMany({
		data: tags,
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
