import { router, protectedProcedure } from "../trpc";
import { addProductToWishlist, getWishlist } from "../fetch";
import { z } from "zod";
import { deleteProductFromWishlistById } from "../fetch";

const wishlistRouter = router({
	get: protectedProcedure.query(async (opts) => {
		const user: any = opts.ctx.session?.user;
		const id = user?.id;
		const wishlist = await getWishlist(id);
		return wishlist;
	}),
	add: protectedProcedure.input(z.string()).mutation(async (opts) => {
		const user: any = opts.ctx.session?.user;
		const userId = user?.id;
		const productId = opts.input;
		const newProductInCart = await addProductToWishlist(userId, productId);
		return newProductInCart;
	}),
	delete: protectedProcedure.input(z.string()).mutation(async (req) => {
		const productId = req.input;
		await deleteProductFromWishlistById(productId);
	}),
});

export default wishlistRouter;
