import { getProducts } from "src/server/fetch";
import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { getProduct } from "../fetch";

const productRouter = router({
	getAll: publicProcedure.query(async () => {
		const products = await getProducts();
		return products;
	}),
	getById: publicProcedure.input(z.string()).query(async (req) => {
		const id = req.input;
		const product = await getProduct(id);
		return product;
	}),
});

export default productRouter;
