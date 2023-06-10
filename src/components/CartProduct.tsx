import Image from "next/image";
import { trpc } from "src/utils/trpc";

const CartProduct = ({ product, cartProductId }: any) => {
	const utils = trpc.useContext();

	const { mutate: editCountCart } = trpc.cart.editCount.useMutation({
		onSuccess: async () => {
			utils.cart.get.invalidate();
		},
	});

	const deleteCart = trpc.cart.delete.useMutation({
		onSuccess: async () => {
			utils.cart.get.invalidate();
		},
	});

	return (
		<tr className="hover">
			<th>
				<div className="flex items-center justify-center w-4 h-4">
					<label
						className="flex-1 cursor-pointer"
						onClick={() => deleteCart.mutate(cartProductId)}
					>
						✕
					</label>
				</div>
			</th>
			<td>
				<div className="flex items-center space-x-3">
					<div className="avatar">
						<div className="w-12 h-12 mask mask-squircle">
							<Image
								width={48}
								height={48}
								src="https://fakeimg.pl/48x48/"
								alt="Avatar Tailwind CSS Component"
							/>
						</div>
					</div>
					<div className="flex-1">
						<div className="font-bold">{product.catalog_name.name}</div>
						<div className="text-sm opacity-50">{product.name}</div>
					</div>
				</div>
			</td>
			<td>
				<div className="flex justify-center gap-2">
					<button
						className="btn btn-square btn-xs"
						onClick={() => {
							if (product.count === 1) {
								deleteCart.mutate(cartProductId);
							} else {
								editCountCart({
									cartProductId,
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
							editCountCart({
								cartProductId,
								newCount: (+e.target.value as number) || 1,
							})
						}
					/>
					<button
						className="btn btn-square btn-xs"
						onClick={() =>
							editCountCart({
								cartProductId,
								newCount: product.count + 1,
							})
						}
					>
						+
					</button>
				</div>
			</td>
			<td>
				<p className="text-3xl font-bold text-right">${product.price}</p>
			</td>
		</tr>
	);
};

export default CartProduct;
