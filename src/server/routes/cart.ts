import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { getCart } from "../fetch";

const cartRouter = router({
	getCartByUserId: publicProcedure.input(z.string()).query(async (req) => {
		const id = req.input;
		const cart = await getCart(id);
		return cart;
	}),
});

export default cartRouter;
