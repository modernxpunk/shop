import { router } from "../trpc";
import userRouter from "./user";
import productRouter from "./product";
import catalogRouter from "./catalog";
import wishlistRouter from "./wishlist";
import cartRouter from "./cart";

const appRouter = router({
	user: userRouter,
	product: productRouter,
	catalog: catalogRouter,
	wishlist: wishlistRouter,
	cart: cartRouter,
});

export default appRouter;

export type AppRouter = typeof appRouter;
