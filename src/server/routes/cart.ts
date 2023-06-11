import { router, protectedProcedure } from "../trpc";
import {
	getCart,
	addProductToCart,
	deleteProductFromCartById,
	editedCountProductToCart,
} from "../fetch";
import z from "zod";

const cartRouter = router({
	get: protectedProcedure.query(async (opts) => {
		const user: any = opts.ctx.session?.user;
		const id = user?.id;
		const cart = await getCart(id);
		return cart;
	}),
	add: protectedProcedure.input(z.string()).mutation(async (opts) => {
		const user: any = opts.ctx.session?.user;
		const userId = user?.id;
		const productId = opts.input;
		const newProductInCart = await addProductToCart(userId, productId);
		return newProductInCart;
	}),
	editCount: protectedProcedure
		.input(
			z.object({
				cartProductId: z.string(),
				newCount: z.number(),
			})
		)
		.mutation(async (opts) => {
			const editedProductInCart = await editedCountProductToCart(
				opts.input.cartProductId,
				opts.input.newCount
			);
			return editedProductInCart;
		}),
	delete: protectedProcedure.input(z.string()).mutation(async (opts) => {
		const cartProductId = opts.input;
		await deleteProductFromCartById(cartProductId);
	}),
});

export default cartRouter;
