import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { getWishlist } from "../fetch";

const wishlistRouter = router({
	getWishlistByUserId: publicProcedure.input(z.string()).query(async (req) => {
		const id = req.input;
		const wishlist = await getWishlist(id);
		return wishlist;
	}),
});

export default wishlistRouter;
