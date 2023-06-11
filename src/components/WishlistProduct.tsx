import Image from "next/image";
import Link from "next/link";
import { trpc } from "src/utils/trpc";
import Icon from "./Icon";

const WishlistProduct = ({ product, wishlistProductId }: any) => {
	const utils = trpc.useContext();

	const { mutate: editCountWishlist } = trpc.wishlist.editCount.useMutation({
		onSuccess: async () => {
			utils.wishlist.get.invalidate();
		},
	});

	const { mutate: removeProductFromWishlist } =
		trpc.wishlist.delete.useMutation({
			onSuccess() {
				utils.wishlist.get.invalidate();
			},
		});

	return (
		<tr className="hover">
			<th>
				<label className="cursor-pointer">
					<button
						className="btn btn-sm btn-circle"
						onClick={() => removeProductFromWishlist(wishlistProductId)}
					>
						<Icon className="w-8 h-8 p-1 fill-current" name="close" />
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
					<button
						className="btn btn-square btn-xs"
						onClick={() => {
							if (product.count === 1) {
								removeProductFromWishlist(wishlistProductId);
							} else {
								editCountWishlist({
									wishlistProductId,
									newCount: product.count - 1,
								});
							}
						}}
					>
						-
					</button>
					<input
						className="w-16 text-center input input-xs bg-base-200"
						type="text"
						value={product.count}
						onChange={(e) =>
							editCountWishlist({
								wishlistProductId,
								newCount: (+e.target.value as number) || 1,
							})
						}
					/>
					<button
						className="btn btn-square btn-xs"
						onClick={() =>
							editCountWishlist({
								wishlistProductId,
								newCount: product.count + 1,
							})
						}
					>
						+
					</button>
				</div>
			</td>
			<td>
				<p className="text-3xl font-bold text-center">${product.price}</p>
			</td>
			<th>
				<Link href={`/product/${product.id}`} className="btn btn-ghost btn-xs">
					details
				</Link>
			</th>
		</tr>
	);
};

export default WishlistProduct;
