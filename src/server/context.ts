import type { inferAsyncReturnType } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getServerSession } from "next-auth";
import { authOptions } from "src/shared/libs/auth";

export async function createContext(opts: CreateNextContextOptions) {
	const session = await getServerSession(opts.req, opts.res, authOptions);
	return {
		session,
	};
}

export type Context = inferAsyncReturnType<typeof createContext>;
