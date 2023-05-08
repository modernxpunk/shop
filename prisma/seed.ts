import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const generateUser = (usersLength: number) => {
	let users = [];
	for (let i = 0; i < usersLength; i++) {
		users.push({
			name: faker.name.fullName(),
		});
	}
	return users;
};

const prisma = new PrismaClient();

async function main() {
	await prisma.person.createMany({
		data: generateUser(100),
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
