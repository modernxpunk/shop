import { createServerSideHelpers } from "@trpc/react-query/server";
import Icon from "src/components/Icon";
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

	return (
		<div className="container">
			<div className="flex gap-4">
				<ul className="w-56 menu bg-base-100 rounded-box">
					<li>
						<a>
							<Icon className="w-8 h-8 fill-current" name="controller" />
							<p>Item 1</p>
						</a>
					</li>
					<li>
						<a>
							<Icon className="w-8 h-8 fill-current" name="controller" />
							<p>Item 1</p>
						</a>
					</li>
					<li>
						<a>
							<Icon className="w-8 h-8 fill-current" name="controller" />
							<p>Item 1</p>
						</a>
					</li>
				</ul>
				<div className="flex-1 p-4 rounded-lg bg-base-100">asdf</div>
			</div>
		</div>
	);
};

export default Account;
