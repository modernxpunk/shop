import { getCatalogProducts, getCatalogs } from "src/server/fetch";
import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { getProductsInfinity } from "../fetch";

const catalogRouter = router({
	getAll: publicProcedure.query(async () => {
		const catalogs = await getCatalogs();
		return catalogs;
	}),
	infinityAll: publicProcedure
		.input(
			z.object({
				category: z.string(),
				sortBy: z.string(),
				limit: z.number().min(1).max(100),
				cursor: z.string().nullish(),
				skip: z.number().optional(),
			})
		)
		.query(async (opts) => {
			const { category, sortBy, limit, cursor, skip } = opts.input;
			const items = await getProductsInfinity(
				category,
				sortBy,
				limit,
				cursor,
				skip
			);
			let nextCursor: any = undefined;
			if (items.length > limit) {
				const nextItem = items.pop();
				nextCursor = nextItem!.id;
			}
			return {
				items,
				nextCursor,
			};
		}),
	getProductByCatalogName: publicProcedure
		.input(z.string())
		.query(async (req) => {
			const catalogName = req.input;
			const products = await getCatalogProducts(catalogName);
			return products;
		}),
});

export default catalogRouter;
