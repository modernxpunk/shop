import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import { getUser } from "../fetch";

const userRouter = router({
	getUserById: protectedProcedure.input(z.string()).query(async (req) => {
		const id = req.input;
		const user = await getUser(id);
		return user;
	}),
});

export default userRouter;
