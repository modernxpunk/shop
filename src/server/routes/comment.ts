import { router, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import { addComment, getCommentsByProductId, likeComment } from "../fetch";

const commentRouter = router({
	getByProductId: publicProcedure.input(z.string()).query(async (opts) => {
		const productId = opts.input;
		const commentsByProductId = await getCommentsByProductId(productId);
		return commentsByProductId;
	}),
	like: protectedProcedure.input(z.string()).mutation(async (opts) => {
		const user: any = opts.ctx.session?.user;
		const userId = user?.id;
		const commentId = opts.input;
		await likeComment(userId, commentId);
	}),
	add: protectedProcedure
		.input(
			z.object({
				content: z.string(),
				productId: z.string(),
				rate: z.number(),
			})
		)
		.mutation(async (opts) => {
			const user: any = opts.ctx.session?.user;
			const userId = user?.id;
			const newProductInCart = await addComment(
				userId,
				opts.input.content,
				opts.input.rate,
				opts.input.productId
			);
			return newProductInCart;
		}),
});

export default commentRouter;
