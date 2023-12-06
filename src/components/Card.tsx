import { Product } from "@prisma/client";
import Image from "next/image";
import { trpc } from "src/utils/trpc";
import Icon from "./Icon";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

// @ts-ignore
const Card: any = React.forwardRef(({ product }, ref) => {
	const router = useRouter();
	const { data } = useSession();

	const { data: cart } = trpc.cart.get.useQuery(undefined, {
		enabled: !!data?.user,
	});

	const { data: wishlist } = trpc.wishlist.get.useQuery(undefined, {
		enabled: !!data?.user,
	});

	const isProductCart = cart?.some(
		(cartProduct) => cartProduct.product.id === product.id
	);

	const isProductWishlist = wishlist?.some(
		(wishlistProduct) => wishlistProduct.product.id === product.id
	);

	const utils = trpc.useContext();

	const { mutate: addProductToCart } = trpc.cart.add.useMutation({
		onSuccess() {
			utils.cart.get.invalidate();
		},
	});
	const { mutate: removeProductFromCart } = trpc.cart.delete.useMutation({
		onSuccess() {
			utils.cart.get.invalidate();
		},
	});

	const { mutate: addProductToWishlist } = trpc.wishlist.add.useMutation({
		onSuccess() {
			utils.wishlist.get.invalidate();
		},
	});
	const { mutate: removeProductFromWishlist } =
		trpc.wishlist.delete.useMutation({
			onSuccess() {
				utils.wishlist.get.invalidate();
			},
		});

	const handleClickWishlist = async (e: any) => {
		e.stopPropagation();
		if (isProductWishlist) {
			const wishlistId: any = wishlist?.find(
				(x) => x.product.id === product.id
			)?.id;
			removeProductFromWishlist(wishlistId);
		} else {
			addProductToWishlist(product.id);
		}
	};

	const handleClickCart = async (e: any) => {
		e.stopPropagation();
		if (isProductCart) {
			const cartId: any = cart?.find((x) => x.product.id === product.id)?.id;
			removeProductFromCart(cartId);
		} else {
			addProductToCart(product.id);
		}
	};

	const rate = (
		product.commented.reduce(
			(a: number, b: Product & { rate: number }) => a + b.rate,
			0
		) / product.commented.length
	).toFixed(1);

	return (
		<button
			className="flex flex-col flex-1 w-full overflow-hidden transition-shadow rounded-lg shadow-lg bg-base-100 group hover:shadow-xl"
			onClick={() => router.push("/product/" + product.id)}
			// @ts-ignore
			ref={ref}
		>
			<div className="relative flex items-center justify-center flex-1 w-full p-2 pb-0">
				<div className="absolute top-0 right-0 hidden p-2 rounded-box group-hover:flex animate-appear btn-group btn-group-vertical">
					<div className="btn btn-sm btn-circle" onClick={handleClickWishlist}>
						{!data?.user ? (
							<label htmlFor="modal-account">
								<Icon
									className="w-8 h-8 p-1 fill-current"
									name={isProductWishlist ? "heart-fill" : "heart-outline"}
								/>
							</label>
						) : (
							<Icon
								className="w-8 h-8 p-1 fill-current"
								name={isProductWishlist ? "heart-fill" : "heart-outline"}
							/>
						)}
					</div>
					<div className="btn btn-sm btn-circle" onClick={handleClickCart}>
						{!data?.user ? (
							<label htmlFor="modal-account">
								<Icon
									className="w-8 h-8 p-1 fill-current"
									name={isProductCart ? "cart" : "cart-outline"}
								/>
							</label>
						) : (
							<Icon
								className="w-8 h-8 p-1 fill-current"
								name={isProductCart ? "cart" : "cart-outline"}
							/>
						)}
					</div>
				</div>
				<div className="flex items-center justify-center flex-1 overflow-hidden rounded-lg bg-base-300">
					<Image
						width={200}
						height={150}
						className="object-contain p-2 flex-1 h-[150px] w-[200px]"
						src={product.image}
						alt={product.name}
					/>
				</div>
			</div>
			<div className="flex items-stretch w-full p-2 text-left">
				<div className="flex-1">
					<p className="opacity-60 line-clamp-1">{product.catalog_name.name}</p>
					<p className="font-bold line-clamp-2">{product.name}</p>
					<div className="flex items-center justify-between">
						<div className="flex items-center items-">
							<div className="rating">
								<input
									type="radio"
									name={"product_rank_" + product.id}
									className="hidden mask mask-star rating-hidden"
									readOnly
									checked
								/>
								{Array(5)
									.fill(0x00)
									.map((_, i: number) => {
										return (
											<input
												type="radio"
												name={"product_rank_" + product.id}
												className="mask mask-star"
												key={`product_rank_${product.id}_${i}`}
												readOnly
												checked={i + 1 === Math.floor(+rate)}
											/>
										);
									})}
							</div>
							<div className="flex items-center">
								<p className="flex-1 ml-1 text-sm opacity-60">
									{product.view} view
								</p>
							</div>
						</div>
						<div>
							<p className="text-3xl font-bold">${product.price}</p>
						</div>
					</div>
				</div>
			</div>
		</button>
	);
});

Card.displayName = "Card";

export default Card;
