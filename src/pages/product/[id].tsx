import Image from "next/image";
import Card from "src/components/Card";
import Icon from "src/components/Icon";
import { cx } from "class-variance-authority";
import { trpc } from "src/utils/trpc";
import { createServerSideHelpers } from "@trpc/react-query/server";
import appRouter from "src/server/routes/_app";
import { createContext } from "src/server/context";
import superjson from "superjson";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export const getServerSideProps = async (req: any) => {
	const { id } = req.query;

	const ssr = createServerSideHelpers({
		router: appRouter,
		ctx: await createContext(req),
		transformer: superjson,
	});

	await ssr.product.getAll.prefetch();
	await ssr.comment.getByProductId.prefetch(id);
	await ssr.product.getById.prefetch(id);

	return {
		props: {
			id,
			trpcState: ssr.dehydrate(),
		},
	};
};

const Product = ({ id }: any) => {
	const [activeTab, setActiveTab] = useState<string>("All");

	useEffect(() => {
		if (typeof window !== "undefined") {
			document.querySelector(".drawer-content")?.scrollTo({ top: 0 });
		}
	}, [activeTab]);

	const { data: product }: any = trpc.product.getById.useQuery(id);

	const utils = trpc.useContext();

	const { data: user } = useSession();
	const account = user?.user as any;

	const { data: cart } = trpc.cart.get.useQuery(undefined, {
		enabled: !!account,
	});
	const isProductInCart = cart?.some(
		(cartProduct) => cartProduct.product.id === product.id
	);

	const { data: wishlist } = trpc.wishlist.get.useQuery(undefined, {
		enabled: !!account,
	});
	const isProductInWishist = wishlist?.some(
		(wishlistProduct) => wishlistProduct.product.id === product.id
	);

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

	const handleClickWishlist = async () => {
		if (isProductInWishist) {
			const wishlistId: any = wishlist?.find((x) => x.product.id === id)?.id;
			removeProductFromWishlist(wishlistId);
		} else {
			addProductToWishlist(product.id);
		}
	};

	const handleClickCart = async () => {
		if (isProductInCart) {
			const cartId: any = cart?.find((x) => x.product.id === id)?.id;
			removeProductFromCart(cartId);
		} else {
			addProductToCart(product.id);
		}
	};

	const { data: products }: any = trpc.product.getAll.useQuery();

	const { data }: any = trpc.comment.getByProductId.useQuery(id);
	const comments = data.comments;
	const rateAll = data.rateAll;
	const currentRank = data.rate;
	const balling = data.balling;

	const { mutate: addComment }: any = trpc.comment.add.useMutation({
		onSuccess() {
			utils.comment.getByProductId.invalidate();
		},
	});

	const { mutate: likeComment }: any = trpc.comment.like.useMutation({
		onSuccess() {
			utils.comment.getByProductId.invalidate();
		},
	});

	const [comment, setComment] = useState("");
	const [rate, setRate] = useState(3);

	const commentLimit = 200;

	const handleSubmitComment = async () => {
		addComment({
			content: comment,
			productId: product.id,
			rate: rate,
		});
	};

	const handleLikeComment = async (commentId: string) => {
		likeComment(commentId);
	};

	return (
		<>
			<div className="container">
				<div className="flex flex-col justify-between mb-2 gap-x-4 lg:items-end lg:flex-row">
					<div>
						<h1 className="text-5xl font-bold">{product.name}</h1>
					</div>
					<div className="mt-2 rating">
						<div className="flex items-center">
							<div className="flex items-center gap-1">
								<Icon className="w-4 h-4 fill-current" name="star" />
								<p className="flex text-sm opacity-60 whitespace-nowrap">
									{(currentRank || 0).toFixed(1)} / 5
								</p>
							</div>
							<div className="mx-0 divider divider-horizontal"></div>
							<div className="flex items-center gap-1">
								<Icon className="w-4 h-4 fill-current" name="comment" />
								<p className="flex text-sm opacity-60 whitespace-nowrap">
									{comments.length} comments
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="sticky z-[15] bg-base-300 top-16">
				<div className="container py-2 pb-0 my-4 mb-4">
					<div className="overflow-auto tabs flex-nowrap">
						{["All", "Сharacteristics", "Reviews", "Images", "Video"].map(
							(tab: string) => {
								return (
									<a
										className={`tab tab-bordered ${
											tab === activeTab ? "tab-active" : ""
										}`}
										key={tab}
										onClick={() => setActiveTab(tab)}
									>
										{tab}
									</a>
								);
							}
						)}
					</div>
				</div>
			</div>

			<div className="container">
				{activeTab === "All" && (
					<div>
						<div className="flex flex-col gap-8 md:flex-row">
							<div className="flex-1">
								<div className="sticky w-full top-28">
									<div className="rounded-lg">
										<Image
											width="600"
											height="700"
											className="object-cover h-[560px] w-full rounded-[inherit]"
											src={product.poster}
											alt={""}
										/>
									</div>
									{/* <div className="gap-4 mt-4 carousel carousel-center">
								{product.carousel.map((imgSrc, i) => {
									return (
										<div key={i} className="rounded-lg carousel-item">
											<Image
												width="600"
												height="700"
												className="object-cover h-[180px] w-full rounded-[inherit]"
												src={imgSrc}
												alt={""}
											/>
										</div>
									);
								})}
							</div> */}
								</div>
							</div>
							<div className="flex-1">
								<div className="space-x-1">
									<span
										className={cx(
											"badge",
											product.isInStock ? "badge-success" : " badge-error"
										)}
									>
										{product.isInStock ? "in stock" : "not in stock"}
									</span>
									{product.tags_name.map((tag: any) => {
										return (
											<span key={tag.id} className="cursor-pointer badge">
												{tag.name}
											</span>
										);
									})}
								</div>
								<div className="mt-2">
									<p>{product.description}</p>
								</div>
								<div className="flex items-center justify-between my-4">
									<div>
										<p className="text-4xl font-bold">${product.price}</p>
									</div>
									<div className="flex gap-2">
										{!account ? (
											<label
												tabIndex={0}
												htmlFor="modal-account"
												className="btn btn-sm btn-primary"
											>
												<Icon
													className="w-6 h-6 p-0.5 fill-current"
													name="cart-outline"
												/>
											</label>
										) : (
											<button
												className="btn btn-sm btn-primary"
												onClick={handleClickCart}
											>
												<Icon
													className="w-6 h-6 p-0.5 fill-current"
													name={isProductInCart ? "cart" : "cart-outline"}
												/>
											</button>
										)}
										{/* <button className="btn btn-sm btn-primary">
									<Icon
										className="w-6 h-6 p-0.5 fill-current"
										name="compare-horizontal"
									/>
								</button> */}

										{!account ? (
											<label
												tabIndex={0}
												htmlFor="modal-account"
												className="btn btn-sm btn-primary"
											>
												<Icon
													className="w-6 h-6 p-0.5 fill-current"
													name="heart-outline"
												/>
											</label>
										) : (
											<button
												className="btn btn-sm btn-primary"
												onClick={handleClickWishlist}
											>
												<Icon
													className="w-6 h-6 p-0.5 fill-current"
													name={isProductInWishist ? "heart" : "heart-outline"}
												/>
											</button>
										)}
									</div>
								</div>
								{/* <div className="flex flex-col gap-4">
							{Array(1)
								.fill(0)
								.map((_, i) => {
									return (
										<div
											key={i}
											className="flex flex-col gap-4 p-4 border shadow-lg bg-base-100 border-base-200 rounded-box"
										>
											{Array(2)
												.fill(0)
												.map((_, j) => {
													return (
														<div className="flex gap-2" key={j}>
															<Icon
																className="w-8 h-8 fill-current"
																name="cart"
															/>
															<div className="flex-1">
																<h4 className="text-lg font-bold">
																	asdfadf asdf as f
																</h4>
																<p>
																	Lorem ipsum dolor, sit amet consectetur
																	adipisicing elit. Velit alias quam vitae!
																	Atque dicta dolor assumenda facere inventore
																	tenetur voluptatibus at temporibus ducimus,
																	autem id porro voluptatum quam nesciunt
																	reiciendis.
																</p>
															</div>
														</div>
													);
												})}
										</div>
									);
								})}
						</div> */}
							</div>
						</div>
						<div className="flex flex-col gap-4 mt-8 md:flex-row">
							<div className="flex-1">
								<div>
									<h3 className="text-4xl font-bold">Characteristics</h3>
								</div>
								<div className="relative grid flex-1 grid-cols-1 gap-8 p-4 mt-2 border shadow-lg sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 bg-base-100 rounded-xl border-base-200">
									{product.Characteristic.map(({ attribute, value }: any) => {
										return (
											<div key={attribute + value} className="flex gap-4">
												<div>
													<p
														className="flex items-center text-left cursor-pointer tooltip"
														data-tip="Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum"
													>
														<span className="font-bold">{attribute}:</span>
														<Icon
															className="w-4 h-4 fill-current opacity-60"
															name="help-circle"
														/>
													</p>
												</div>
												<div className="flex-1 text-right">
													<p>{value}</p>
												</div>
											</div>
										);
									})}
								</div>
							</div>
							<div className="flex flex-1">
								<div className="flex-1">
									<div className="flex items-center">
										<div className="flex-1">
											<h3 className="text-4xl font-bold">Reviews</h3>
										</div>
										{/* <div>
									<div className="dropdown dropdown-end">
										<label tabIndex={0} className="btn btn-sm btn-outline">
											category
											<Icon
												className="w-6 h-6 fill-current opacity-60"
												name="chevron-down"
											/>
										</label>
										<ul
											tabIndex={0}
											className="min-w-full p-2 shadow-lg dropdown-content menu menu-compact bg-base-100 rounded-box"
										>
											{[{ label: "Date" }, { label: "Popularity" }].map(
												({ label }) => {
													return (
														<li key={label} tabIndex={0}>
															<label>{label}</label>
														</li>
													);
												}
											)}
										</ul>
									</div>
								</div> */}
									</div>
									<div className="w-full mt-2 shadow-lg stats">
										<div className="flex flex-1">
											<div className="flex flex-1 gap-4 stat">
												<div>
													<div className="stat-title">Average rating</div>
													<div className="text-5xl stat-value">
														{(currentRank || 0).toFixed(1)}
													</div>
													<div className="items-center rating">
														<input
															type="radio"
															name="averate-rating"
															className="hidden rating-hidden"
															checked={!currentRank}
														/>
														{Array(5)
															.fill(0x00)
															.map((_, i) => {
																return (
																	<input
																		type="radio"
																		name="average-rating"
																		className="mask mask-star"
																		readOnly
																		checked={Math.floor(currentRank) - 1 === i}
																		key={"average" + i}
																	/>
																);
															})}
													</div>
													<div className="flex items-center">
														<div className="flex items-center gap-1">
															<Icon
																className="w-4 h-4 fill-current"
																name="comment"
															/>
															<p className="flex text-sm opacity-60 whitespace-nowrap">
																{rateAll} comments
															</p>
														</div>
													</div>
												</div>
												<div className="flex-1 stat-desc">
													<div className="flex flex-col gap-1">
														{Array(6)
															.fill(0x00)
															.map((_, i) => {
																return (
																	<div
																		className="flex items-center gap-1"
																		key={5 - i}
																	>
																		<p>{5 - i}</p>
																		<progress
																			className="flex-1 w-full progress progress-primary"
																			value={balling.reduce(
																				(a: number, b: { rate: number }) =>
																					b.rate === 5 - i ? a + 1 : a,
																				0
																			)}
																			max={Math.max(
																				...balling.map(
																					(x: { rate: number }) => x.rate
																				)
																			)}
																		></progress>
																	</div>
																);
															})}
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="relative flex flex-col gap-4 p-4 mt-4 border shadow-lg bg-base-100 rounded-xl border-base-200">
										<div className="flex items-start flex-1 gap-2">
											<div>
												{account ? (
													account?.avatar ? (
														<div className="avatar online">
															<div className="w-12 h-12 rounded-full bg-base-200">
																{account.avatar && (
																	<Image
																		src={account.avatar}
																		width={40}
																		height={40}
																		alt={"avatar"}
																	/>
																)}
															</div>
														</div>
													) : (
														<div className="avatar online placeholder">
															<div className="w-12 h-12 rounded-full bg-neutral-focus text-neutral-content">
																<span className="text-xl">
																	{account.username
																		? account.username[0].toUpperCase()
																		: account.email[0].toUpperCase()}
																</span>
															</div>
														</div>
													)
												) : (
													<div className="rounded-full bg-base-200">
														<Icon
															name="account"
															className="w-12 h-12 p-1.5 fill-current"
														/>
													</div>
												)}
											</div>
											<div className="flex-1">
												{account?.username && (
													<div className="text-lg font-bold">
														{account.username}
													</div>
												)}
												<div className="rating rating-sm">
													{Array(5)
														.fill(0x00)
														.map((_, i) => {
															return (
																<input
																	type="radio"
																	name="rating-product"
																	className="mask mask-star"
																	key={"rating-product-" + i}
																	checked={rate === i + 1}
																	onChange={() => setRate(i + 1)}
																/>
															);
														})}
												</div>
												<div className="relative">
													<textarea
														className={cx(
															"w-full h-32 text-base resize-none textarea textarea-bordered",
															comment.length >= commentLimit
																? "textarea-error"
																: ""
														)}
														placeholder="Add comment..."
														value={comment}
														onChange={(e) => setComment(e.target.value)}
													></textarea>
													<div className="absolute bottom-0 right-0 flex items-center justify-end px-2 py-3">
														{!account ? (
															<label
																htmlFor="modal-account"
																className=" btn btn-sm"
															>
																Publish
															</label>
														) : (
															<button
																className="btn btn-sm"
																disabled={comment.length >= commentLimit}
																onClick={handleSubmitComment}
															>
																Publish
															</button>
														)}
													</div>
												</div>
												<label className="label">
													<span className="label-text-alt">
														<div className="flex flex-1 gap-1 carousel">
															{["Thanks for sharing", "Perfect!"].map(
																(text: string) => {
																	return (
																		<div
																			className={cx(
																				"cursor-pointer carousel-item badge hover:shadow-lg",
																				text === comment ? "badge-outline" : ""
																			)}
																			key={text}
																			onClick={() => setComment(text)}
																		>
																			{text}
																		</div>
																	);
																}
															)}
														</div>
													</span>
													<span
														className={cx(
															"label-text-alt whitespace-nowrap",
															comment.length >= commentLimit ? "text-error" : ""
														)}
													>
														{comment.length} / {commentLimit}
													</span>
												</label>
											</div>
										</div>

										{comments.length === 0 && (
											<div className="text-2xl font-bold text-center">
												Be first
											</div>
										)}
										{comments.slice(0, 3).map((comment: any) => {
											return (
												<div
													key={comment.id}
													className="flex items-start gap-2"
												>
													<div>
														{comment.User.avatar ? (
															<div className="avatar online">
																<div className="w-12 h-12 rounded-full bg-base-200">
																	<Image
																		src={comment.User.avatar}
																		width={40}
																		height={40}
																		alt={"avatar"}
																	/>
																</div>
															</div>
														) : (
															<div className="avatar online placeholder">
																<div className="w-12 h-12 rounded-full bg-neutral-focus text-neutral-content">
																	<span className="text-xl">
																		{comment.User?.username
																			? comment.User.username[0].toUpperCase()
																			: comment.User.email[0].toUpperCase()}
																	</span>
																</div>
															</div>
														)}
													</div>

													<div className="flex flex-col justify-center flex-1">
														<div className="flex items-center gap-2">
															<div>
																<div className="flex items-baseline gap-2">
																	<h4 className="text-lg font-bold">
																		{comment.User.username}
																	</h4>
																	<span className="text-sm opacity-60 whitespace-nowrap">
																		{new Date(comment.createdAt).toDateString()}
																	</span>
																</div>
																<div className="items-center rating rating-sm">
																	{Array(5)
																		.fill(0x00)
																		.map((_, i: number) => {
																			return (
																				<input
																					type="radio"
																					name={comment.id}
																					className="mask mask-star"
																					readOnly
																					key={comment.id + i}
																					checked={comment.rate === i + 1}
																				/>
																			);
																		})}
																</div>
															</div>
															{/* <div className="flex justify-end flex-1">
														<div>
															<Icon
																className="w-8 h-8 fill-current"
																name="reply"
															/>
														</div>
													</div> */}
														</div>
														<div className="flex gap-2">
															<p className="line-clamp-4">{comment.content}</p>
														</div>
														<div className="mt-2">
															{!account ? (
																<label
																	htmlFor="modal-account"
																	className="btn btn-sm group"
																>
																	<Icon
																		className="w-8 h-8 p-1.5 fill-current"
																		name={"thumb-up-outline"}
																	/>
																	{comment.Like.length}
																</label>
															) : (
																<div
																	className="btn btn-sm group"
																	onClick={() => handleLikeComment(comment.id)}
																>
																	<Icon
																		className="w-8 h-8 p-1.5 fill-current"
																		name={
																			comment.Like.some(
																				(like: any) =>
																					like.userId === account.id
																			)
																				? "thumb-up"
																				: "thumb-up-outline"
																		}
																	/>
																	{comment.Like.length}
																</div>
															)}
														</div>
													</div>
												</div>
											);
										})}

										{comments.length > 3 && (
											<div className="absolute bottom-0 left-0 right-0 rounded-[inherit]">
												<div className="flex justify-center rounded-[inherit] pt-16 pb-4 bg-gradient-to-b from-transparent via-base-200 to-base-300">
													<button
														className="btn btn-primary"
														onClick={() => setActiveTab("Reviews")}
													>
														Read more
													</button>
												</div>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
						<div className="mt-4">
							<h3 className="text-4xl font-bold">Popular products</h3>
							<div className="grid gap-4 mt-4 grid-cols-item">
								{products.map((product: any) => {
									return <Card product={product} key={product.id} />;
								})}
							</div>
						</div>
					</div>
				)}
				{activeTab !== "All" && (
					<div className="flex gap-4">
						<div className="flex-1">
							{activeTab === "Сharacteristics" && (
								<div className="relative grid flex-1 grid-cols-1 gap-8 p-4 border shadow-lg md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 bg-base-100 rounded-xl border-base-200">
									{product.Characteristic.map(({ attribute, value }: any) => {
										return (
											<div key={attribute + value} className="flex gap-4">
												<div>
													<p
														className="flex items-center text-left cursor-pointer tooltip"
														data-tip="Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum"
													>
														<span className="font-bold">{attribute}:</span>
														<Icon
															className="w-4 h-4 fill-current opacity-60"
															name="help-circle"
														/>
													</p>
												</div>
												<div className="flex-1 text-right">
													<p>{value}</p>
												</div>
											</div>
										);
									})}
								</div>
							)}
							{activeTab === "Reviews" && (
								<div>
									<div className="w-full shadow-lg stats">
										<div className="flex flex-1">
											<div className="flex flex-1 gap-4 stat">
												<div>
													<div className="stat-title">Average rating</div>
													<div className="text-5xl stat-value">
														{(currentRank || 0).toFixed(1)}
													</div>
													<div className="items-center rating">
														<input
															type="radio"
															name="averate-rating"
															className="hidden rating-hidden"
															checked={!currentRank}
														/>
														{Array(5)
															.fill(0x00)
															.map((_, i) => {
																return (
																	<input
																		type="radio"
																		name="average-rating"
																		className="mask mask-star"
																		readOnly
																		checked={Math.floor(currentRank) - 1 === i}
																		key={"average" + i}
																	/>
																);
															})}
													</div>
													<div className="flex items-center">
														<div className="flex items-center gap-1">
															<Icon
																className="w-4 h-4 fill-current"
																name="comment"
															/>
															<p className="flex text-sm opacity-60 whitespace-nowrap">
																{rateAll} comments
															</p>
														</div>
													</div>
												</div>
												<div className="flex-1 stat-desc">
													<div className="flex flex-col gap-1">
														{Array(6)
															.fill(0x00)
															.map((_, i) => {
																return (
																	<div
																		className="flex items-center gap-1"
																		key={5 - i}
																	>
																		<p>{5 - i}</p>
																		<progress
																			className="flex-1 w-full progress progress-primary"
																			value={balling.reduce(
																				(a: number, b: { rate: number }) =>
																					b.rate === 5 - i ? a + 1 : a,
																				0
																			)}
																			max={Math.max(
																				...balling.map(
																					(x: { rate: number }) => x.rate
																				)
																			)}
																		></progress>
																	</div>
																);
															})}
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="relative flex flex-col gap-4 p-4 mt-4 border shadow-lg bg-base-100 rounded-xl border-base-200">
										<div className="flex items-start flex-1 gap-2">
											<div>
												{account ? (
													account?.avatar ? (
														<div className="avatar online">
															<div className="w-12 h-12 rounded-full bg-base-200">
																{account.avatar && (
																	<Image
																		src={account.avatar}
																		width={40}
																		height={40}
																		alt={"avatar"}
																	/>
																)}
															</div>
														</div>
													) : (
														<div className="avatar online placeholder">
															<div className="w-12 h-12 rounded-full bg-neutral-focus text-neutral-content">
																<span className="text-xl">
																	{account.username
																		? account.username[0].toUpperCase()
																		: account.email[0].toUpperCase()}
																</span>
															</div>
														</div>
													)
												) : (
													<div className="rounded-full bg-base-200">
														<Icon
															name="account"
															className="w-12 h-12 p-1.5 fill-current"
														/>
													</div>
												)}
											</div>
											<div className="flex-1">
												{account?.username && (
													<div className="text-lg font-bold">
														{account.username}
													</div>
												)}
												<div className="rating rating-sm">
													{Array(5)
														.fill(0x00)
														.map((_, i) => {
															return (
																<input
																	type="radio"
																	name="rating-product"
																	className="mask mask-star"
																	key={"rating-product-" + i}
																	checked={rate === i + 1}
																	onChange={() => setRate(i + 1)}
																/>
															);
														})}
												</div>
												<div className="relative">
													<textarea
														className={cx(
															"w-full h-32 text-base resize-none textarea textarea-bordered",
															comment.length >= commentLimit
																? "textarea-error"
																: ""
														)}
														placeholder="Add comment..."
														value={comment}
														onChange={(e) => setComment(e.target.value)}
													></textarea>
													<div className="absolute bottom-0 right-0 flex items-center justify-end px-2 py-3">
														{!account ? (
															<label
																htmlFor="modal-account"
																className=" btn btn-sm"
															>
																Publish
															</label>
														) : (
															<button
																className="btn btn-sm"
																disabled={comment.length >= commentLimit}
																onClick={handleSubmitComment}
															>
																Publish
															</button>
														)}
													</div>
												</div>
												<label className="label">
													<span className="label-text-alt">
														<div className="flex flex-1 gap-1 carousel">
															{["Thanks for sharing", "Perfect!"].map(
																(text: string) => {
																	return (
																		<div
																			className={cx(
																				"cursor-pointer carousel-item badge hover:shadow-lg",
																				text === comment ? "badge-outline" : ""
																			)}
																			key={text}
																			onClick={() => setComment(text)}
																		>
																			{text}
																		</div>
																	);
																}
															)}
														</div>
													</span>
													<span
														className={cx(
															"label-text-alt whitespace-nowrap",
															comment.length >= commentLimit ? "text-error" : ""
														)}
													>
														{comment.length} / {commentLimit}
													</span>
												</label>
											</div>
										</div>
										{comments.length === 0 && (
											<div className="text-2xl font-bold text-center">
												Be first
											</div>
										)}
										{comments.map((comment: any) => {
											return (
												<div
													key={comment.id}
													className="flex items-start gap-2"
												>
													<div>
														{comment.User.avatar ? (
															<div className="avatar online">
																<div className="w-12 h-12 rounded-full bg-base-200">
																	<Image
																		src={comment.User.avatar}
																		width={40}
																		height={40}
																		alt={"avatar"}
																	/>
																</div>
															</div>
														) : (
															<div className="avatar online placeholder">
																<div className="w-12 h-12 rounded-full bg-neutral-focus text-neutral-content">
																	<span className="text-xl">
																		{comment.User?.username
																			? comment.User.username[0].toUpperCase()
																			: comment.User.email[0].toUpperCase()}
																	</span>
																</div>
															</div>
														)}
													</div>

													<div className="flex flex-col justify-center flex-1">
														<div className="flex items-center gap-2">
															<div>
																<div className="flex items-baseline gap-2">
																	<h4 className="text-lg font-bold">
																		{comment.User.username}
																	</h4>
																	<span className="text-sm opacity-60 whitespace-nowrap">
																		{new Date(comment.createdAt).toDateString()}
																	</span>
																</div>
																<div className="items-center rating rating-sm">
																	{Array(5)
																		.fill(0x00)
																		.map((_, i: number) => {
																			return (
																				<input
																					type="radio"
																					name={comment.id}
																					className="mask mask-star"
																					readOnly
																					key={comment.id + i}
																					checked={comment.rate === i + 1}
																				/>
																			);
																		})}
																</div>
															</div>
															{/* <div className="flex justify-end flex-1">
														<div>
															<Icon
																className="w-8 h-8 fill-current"
																name="reply"
															/>
														</div>
													</div> */}
														</div>
														<div className="flex gap-2">
															<p className="line-clamp-4">{comment.content}</p>
														</div>
														<div className="mt-2">
															{!account ? (
																<label
																	htmlFor="modal-account"
																	className="btn btn-sm group"
																>
																	<Icon
																		className="w-8 h-8 p-1.5 fill-current"
																		name={"thumb-up-outline"}
																	/>
																	{comment.Like.length}
																</label>
															) : (
																<div
																	className="btn btn-sm group"
																	onClick={() => handleLikeComment(comment.id)}
																>
																	<Icon
																		className="w-8 h-8 p-1.5 fill-current"
																		name={
																			comment.Like.some(
																				(like: any) =>
																					like.userId === account.id
																			)
																				? "thumb-up"
																				: "thumb-up-outline"
																		}
																	/>
																	{comment.Like.length}
																</div>
															)}
														</div>
													</div>
												</div>
											);
										})}
									</div>
								</div>
							)}
						</div>
						<div className="flex-1 max-w-sm">
							<div className="sticky p-4 border rounded-lg shadow-xl top-28 bg-base-100">
								<div className="flex gap-2">
									<div className="rounded-lg w-[100px] h-[100px]">
										<Image
											width="100"
											height="100"
											className="object-cover w-[100px] h-[100px] rounded-[inherit]"
											src={product.poster}
											alt={""}
										/>
									</div>
									<div className="flex-1">
										<div>
											<p className="text-sm opacity-60">
												{product.catalog_name.name}
											</p>
											<h1 className="text-2xl font-bold line-clamp-3">
												{product.name}
											</h1>
										</div>
									</div>
								</div>
								<div className="flex items-center justify-between mt-2">
									<p className="text-4xl font-bold">${product.price}</p>
									<div className="flex gap-2">
										{!account ? (
											<label
												tabIndex={0}
												htmlFor="modal-account"
												className="btn btn-sm btn-primary"
											>
												<Icon
													className="w-6 h-6 p-0.5 fill-current"
													name="cart-outline"
												/>
											</label>
										) : (
											<button
												className="btn btn-sm btn-primary"
												onClick={handleClickCart}
											>
												<Icon
													className="w-6 h-6 p-0.5 fill-current"
													name={isProductInCart ? "cart" : "cart-outline"}
												/>
											</button>
										)}
										{!account ? (
											<label
												tabIndex={0}
												htmlFor="modal-account"
												className="btn btn-sm btn-primary"
											>
												<Icon
													className="w-6 h-6 p-0.5 fill-current"
													name="heart-outline"
												/>
											</label>
										) : (
											<button
												className="btn btn-sm btn-primary"
												onClick={handleClickWishlist}
											>
												<Icon
													className="w-6 h-6 p-0.5 fill-current"
													name={isProductInWishist ? "heart" : "heart-outline"}
												/>
											</button>
										)}
									</div>
								</div>
								<span
									className={cx(
										"badge",
										product.isInStock ? "badge-success" : " badge-error"
									)}
								>
									{product.isInStock ? "in stock" : "not in stock"}
								</span>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default Product;
