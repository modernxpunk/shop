import Image from "next/image";
import Icon from "src/components/Icon";
import Link from "next/link";
import { createServerSideHelpers } from "@trpc/react-query/server";
import appRouter from "src/server/routes/_app";
import { createContext } from "src/server/context";
import superjson from "superjson";
import { trpc } from "src/utils/trpc";

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
	const utils = trpc.useContext();

	const { mutate: removeProductFromWishlist } =
		trpc.wishlist.delete.useMutation({
			onSuccess() {
				utils.wishlist.get.invalidate();
			},
		});

	const handleClickCross = (productId: string) => {
		removeProductFromWishlist(productId);
	};

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
						{wishlist.map(({ product }) => {
							console.log(product);
							return (
								<tr key={product.id} className="hover">
									<th>
										<label className="cursor-pointer">
											<button
												className="btn btn-sm btn-circle"
												onClick={() => handleClickCross(product.id)}
											>
												<Icon
													className="w-8 h-8 p-1 fill-current"
													name="close"
												/>
											</button>
										</label>
									</th>
									<td>
										<div className="flex items-center space-x-3">
											<div className="avatar">
												<div className="w-12 h-12 mask mask-squircle">
													<Image
														width={48}
														height={48}
														src="https://fakeimg.pl/48x48/"
														alt="avatar"
													/>
												</div>
											</div>
											<div>
												<div className="font-bold">{product.name}</div>
												<div className="text-sm opacity-50">
													{product.catalog_name.name}
												</div>
											</div>
										</div>
									</td>
									<td className="">
										<div className="flex justify-center gap-2">
											<button className="btn btn-square btn-xs">-</button>
											<input
												className="w-16 text-center input input-xs bg-base-200"
												type="text"
												// value="1"
											/>
											<button className="btn btn-square btn-xs">+</button>
										</div>
									</td>
									<td>
										<p className="text-3xl font-bold text-center">
											${product.price}
										</p>
									</td>
									<th>
										<Link
											href={`/product/${product.id}`}
											className="btn btn-ghost btn-xs"
										>
											details
										</Link>
									</th>
								</tr>
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
