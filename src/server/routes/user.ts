import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { getUser } from "../fetch";

const userRouter = router({
	getUserById: publicProcedure.input(z.string()).query(async (req) => {
		const id = req.input;
		const user = await getUser(id);
		return user;
	}),
});

export default userRouter;
