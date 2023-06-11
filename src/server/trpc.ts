import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { Context } from "src/server/context";

const t = initTRPC.context<Context>().create({
	transformer: superjson,
});

const isAuthed = t.middleware(({ next, ctx }) => {
	const user: any = ctx.session?.user;
	const id = user?.id;
	if (!id) {
		throw new TRPCError({
			code: "UNAUTHORIZED",
		});
	}
	return next({
		ctx,
	});
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
