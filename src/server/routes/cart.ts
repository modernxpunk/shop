import { router, protectedProcedure } from "../trpc";
import { getCart, addProductToCart, deleteProductFromCartById } from "../fetch";
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
	delete: protectedProcedure.input(z.string()).mutation(async (opts) => {
		const user: any = opts.ctx.session?.user;
		const userId = user?.id;
		const productId = opts.input;
		await deleteProductFromCartById(userId, productId);
	}),
});

export default cartRouter;
