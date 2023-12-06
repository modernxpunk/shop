import { createServerSideHelpers } from "@trpc/react-query/server";
import { createContext } from "src/server/context";
import appRouter from "src/server/routes/_app";
import { trpc } from "src/utils/trpc";
import superjson from "superjson";

export const getServerSideProps = async (req: any) => {
	const ssr = createServerSideHelpers({
		router: appRouter,
		ctx: await createContext(req),
		transformer: superjson,
	});

	const id = req.params?.id as string;

	await ssr.user.getUserById.prefetch(id);

	return {
		props: {
			trpcState: ssr.dehydrate(),
			id,
		},
	};
};

const Account = (props: { id: string }) => {
	const { data: user } = trpc.user.getUserById.useQuery(props.id);

	console.log("user", user);
	return (
		<div className="container">
			<div></div>
		</div>
	);
};

export default Account;
