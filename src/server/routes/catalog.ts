import { getCatalogProducts, getCatalogs } from "src/server/fetch";
import { z } from "zod";
import { router, publicProcedure } from "../trpc";

const catalogRouter = router({
	getAll: publicProcedure.query(async () => {
		const catalogs = await getCatalogs();
		return catalogs;
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
