import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { getRandomImgSrc } from "../src/utils/view";

const prisma = new PrismaClient();

async function main() {
	const generate = {
		// iam: {
		// 	id: faker.datatype.uuid(),
		// 	avatar: faker.internet.avatar(),
		// 	email: "modernpunk@gmail.com",
		// 	username: "modernpunk",
		// 	password: "123",
		// },
		users: 100,
		catalog: 10,
		products: 10000,
	};

	const usersIds = Array(generate.users)
		.fill(0x00)
		.map(() => faker.datatype.uuid());

	const users = usersIds.map((userId) => ({
		id: userId,
		email: faker.internet.email(),
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

	const products = productsIds.map((id) => ({
		id: id,
		name: faker.commerce.productName(),
		price: +faker.commerce.price(100, 1000, 0),
		image: getRandomImgSrc(),
		description: faker.lorem.lines(2),
		poster: getRandomImgSrc(),
		view: faker.datatype.number({ min: 50, max: 1000 }),
		catalogId: faker.helpers.arrayElement(catalogs).id,
		isInStock: faker.datatype.boolean(),
	}));

	const characteristics = [];
	const tags = [];
	const comments = [];
	for (let i = 0; i < productsIds.length; i++) {
		const productId = productsIds[i];
		for (let j = 0; j < 10; j++) {
			const userId = faker.helpers.arrayElement(usersIds);
			characteristics.push({
				attribute: faker.lorem.word(),
				value: faker.lorem.word(),
				productId: productId,
			});
			tags.push({
				name: faker.commerce.productAdjective(),
				productId: productId,
			});
			comments.push({
				id: faker.datatype.uuid(),
				productId: productId,
				userId: userId,
				content: faker.lorem.paragraphs(),
				rate: faker.datatype.number({ min: 0, max: 5 }),
			});
		}
	}

	const cart = [];
	const wishlist = [];
	const likes = [];
	for (let i = 0; i < usersIds.length; i++) {
		const userId = usersIds[i];
		for (let j = 0; j < 5; j++) {
			const productId = faker.helpers.arrayElement(productsIds);
			cart.push({
				userId: userId,
				productId: productId,
				count: faker.datatype.number({ min: 1, max: 3 }),
			});
			wishlist.push({
				userId: userId,
				productId: productId,
				count: faker.datatype.number({ min: 1, max: 3 }),
			});
			likes.push({
				userId: userId,
				commentId: faker.helpers.arrayElement(comments).id,
			});
		}
	}

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

	await prisma.characteristic.createMany({
		data: characteristics,
		skipDuplicates: true,
	});

	await prisma.cart.createMany({
		data: cart,
		skipDuplicates: true,
	});

	await prisma.wishlist.createMany({
		data: wishlist,
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

	await prisma.like.createMany({
		data: likes,
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
