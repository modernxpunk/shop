import Icon from "src/components/Icon";
import Link from "next/link";
import { createServerSideHelpers } from "@trpc/react-query/server";
import appRouter from "src/server/routes/_app";
import { createContext } from "src/server/context";
import superjson from "superjson";
import { trpc } from "src/utils/trpc";
import WishlistProduct from "src/components/WishlistProduct";

export const getServerSideProps = async (req: any) => {
	const ssr = createServerSideHelpers({
		router: appRouter,
		ctx: await createContext(req),
		transformer: superjson,
	});

	await ssr.wishlist.get.prefetch();

	return {
		props: {
			trpcState: ssr.dehydrate(),
		},
	};
};

const Wishlist = () => {
	const { data: wishlist } = trpc.wishlist.get.useQuery();

	return (
		<div className="container">
			<h1 className="text-5xl font-bold">Wishlist</h1>
			{wishlist && wishlist.length === 0 && (
				<div className="flex flex-col items-center justify-center">
					<Icon className="w-32 h-32 fill-current" name="heart" />
					<h1 className="text-3xl font-bold text-center">
						Oops, your wishlist is empty! Go to
						<Link className="underline text-primary" href="/">
							shop
						</Link>
					</h1>
				</div>
			)}
			{wishlist && wishlist.length !== 0 && (
				<table className="table w-full mt-6">
					<thead>
						<tr>
							<th></th>
							<th>Name</th>
							<th className="text-center">Quantity</th>
							<th className="text-center">Price</th>
							<th />
						</tr>
					</thead>
					<tbody>
						{wishlist
							.sort((a, b) => (a.id < b.id ? -1 : 1))
							.map((wishlistProduct: any) => {
								return (
									<WishlistProduct
										key={wishlistProduct.id}
										product={{
											...wishlistProduct.product,
											count: wishlistProduct.count,
										}}
										wishlistProductId={wishlistProduct.id}
									/>
								);
							})}
					</tbody>
					<tfoot>
						<tr>
							<th />
							<th>Name</th>
							<th className="text-center">Quantity</th>
							<th>
								<p className="text-3xl font-bold text-center">
									${wishlist.reduce((a, b) => a + b.product.price, 0)}
								</p>
							</th>
							<th />
						</tr>
					</tfoot>
				</table>
			)}
		</div>
	);
};

export default Wishlist;
