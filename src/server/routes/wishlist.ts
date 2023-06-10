import { router, protectedProcedure } from "../trpc";
import {
	addProductToWishlist,
	editedCountProductToWishlist,
	getWishlist,
} from "../fetch";
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
		const newProductInWishlist = await addProductToWishlist(userId, productId);
		return newProductInWishlist;
	}),
	editCount: protectedProcedure
		.input(
			z.object({
				wishlistProductId: z.string(),
				newCount: z.number(),
			})
		)
		.mutation(async (opts) => {
			const editedProductInWishlist = await editedCountProductToWishlist(
				opts.input.wishlistProductId,
				opts.input.newCount
			);
			return editedProductInWishlist;
		}),
	delete: protectedProcedure.input(z.string()).mutation(async (opts) => {
		const wishlistProductId = opts.input;
		await deleteProductFromWishlistById(wishlistProductId);
	}),
});

export default wishlistRouter;
