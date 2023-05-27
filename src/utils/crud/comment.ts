import { prisma } from "../db";

const createComment = async (
	userId: string,
	productId: string,
	text: string,
	rate: number
) => {
	await prisma.comment.create({
		data: {
			userId: userId,
			productId: productId,
			content: text,
			rate: rate,
		},
	});
};

const deleteComment = async (id: string) => {};

export { createComment, deleteComment };
