import { cx } from "class-variance-authority";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { trpc } from "src/utils/trpc";
import Icon from "./Icon";
import SignOut from "./Signout";

const languages = [
	{
		image:
			"https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1ec-1f1e7.svg",
		label: "English",
		isActive: true,
	},
	{
		image:
			"https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1ea-1f1f8.svg",
		label: "Español",
		isActive: false,
	},
	{
		image:
			"https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1eb-1f1f7.svg",
		label: "Français",
		isActive: false,
	},
];

const Header = () => {
	const { data } = useSession();
	const account: any = data?.user;

	const { data: cart }: any = trpc.cart.get.useQuery(undefined, {
		enabled: !!account,
	});

	const { data: wishlist } = trpc.wishlist.get.useQuery(undefined, {
		enabled: !!account,
	});

	return (
		<>
			<div className="bg-base-300">
				<nav className="container flex items-center justify-between gap-4 py-2">
					<Link href="/">
						<Icon
							className="w-16 h-8 fill-current btn btn-sm btn-primary"
							name="logo"
						/>
					</Link>
					<div className="flex items-center gap-2">
						<div className="flex items-center dropdown dropdown-end">
							<div tabIndex={0} className="gap-2 btn btn-sm btn-ghost">
								<Icon name="translate" className="w-6 h-6 fill-current" />
								<Icon name="chevron-down" className="w-4 h-4 fill-current" />
							</div>
							<div className="w-56 mt-8 overflow-y-auto shadow-2xl dropdown-content bg-base-200 text-base-content rounded-t-box rounded-b-box top-px">
								<ul className="gap-1 p-3 menu menu-compact" tabIndex={0}>
									{languages.map(({ label, image, isActive }) => {
										return (
											<li key={label}>
												<button
													className={cx("flex", isActive ? "isActive" : "")}
												>
													<Image
														loading="lazy"
														width="20"
														height="20"
														alt="English"
														src={image}
													/>
													<span className="flex justify-between flex-1">
														{label}
													</span>
												</button>
											</li>
										);
									})}
								</ul>
							</div>
						</div>
					</div>
				</nav>
			</div>

			<div className="sticky top-0 z-20 bg-base-200">
				<div className="container flex items-center justify-between gap-2 py-2">
					<div className="relative flex flex-1">
						<label className="z-50 input-group">
							<span className="z-[inherit]">
								<Icon name="magnify" className="w-6 h-6 fill-current" />
							</span>
							<input
								type="text"
								placeholder="Search..."
								className="w-full input z-[inherit] rounded-lg"
							/>
						</label>
						{/* <div className="absolute z-50 w-full top-14">
							<div className="p-2 rounded-lg bg-base-300">asd</div>
						</div>
						<div className="fixed inset-0 z-40 bg-black opacity-60"></div> */}
					</div>
					<div className="items-center hidden gap-1 sm:flex">
						<div
							className={cx(
								"relative flex items-center",
								account && "dropdown dropdown-end"
							)}
						>
							<label
								tabIndex={0}
								htmlFor={account ? "" : "modal-account"}
								className="indicator"
							>
								<div className="btn btn-ghost btn-circle">
									{account ? (
										account?.avatar ? (
											<div className="avatar online">
												<div className="w-10 h-10 rounded-full bg-base-200">
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
												<div className="w-10 h-10 rounded-full bg-neutral-focus text-neutral-content">
													<span className="text-xl">
														{account.email
															? account.email[0]
															: account.username[0]}
													</span>
												</div>
											</div>
										)
									) : (
										<Icon
											name="account"
											className="w-12 h-12 p-1.5 fill-current"
										/>
									)}
								</div>
								{account && (
									<div
										tabIndex={0}
										className="flex flex-col overflow-auto shadow-2xl top-14 dropdown-content bg-base-100 rounded-box"
									>
										<div className="flex z-10 items-center sticky  w-full -top-4 -mt-0 bg-[inherit] justify-between">
											<ul className="menu bg-base-100 rounded-box">
												<li>
													<div className="flex items-center">
														<div className="avatar online">
															<div className="w-10 h-10 rounded-full bg-base-200">
																{account.avatar ? (
																	<Image
																		src={account.avatar}
																		width={24}
																		height={24}
																		alt={"avatar"}
																	/>
																) : (
																	<div className="avatar online placeholder">
																		<div className="w-10 h-10 rounded-full bg-neutral-focus text-neutral-content">
																			<span className="text-xl">
																				{account.email
																					? account.email[0]
																					: account.username[0]}
																			</span>
																		</div>
																	</div>
																)}
															</div>
														</div>
														<div>
															<p className="text-sm">{account.username}</p>
															<p className="text-sm opacity-60">
																{account.email}
															</p>
														</div>
													</div>
												</li>
												{/* <li>
													<Link href="#">
														<Icon
															name="account"
															className="w-4 h-4 fill-current"
														/>
														Setting
													</Link>
												</li> */}
												<li>
													<SignOut />
												</li>
											</ul>
										</div>
									</div>
								)}
							</label>
						</div>
						<div className="relative flex items-center dropdown dropdown-end">
							<label tabIndex={0} className="indicator">
								{wishlist && Boolean(wishlist.length) && (
									<span className="mt-1 mr-1 indicator-item badge">
										{wishlist.length}
									</span>
								)}

								<div className="btn btn-ghost btn-circle">
									{!account ? (
										<label tabIndex={0} htmlFor="modal-account">
											<Icon
												name="heart"
												className="w-12 h-12 p-1.5 fill-current"
											/>
										</label>
									) : (
										<Icon
											name="heart"
											className="w-12 h-12 p-1.5 fill-current"
										/>
									)}
								</div>
							</label>

							{account && (
								<div
									tabIndex={0}
									className="flex flex-col dropdown-content p-4 bg-base-100 shadow-2xl rounded-box min-w-[420px] min-h-[150px] overflow-auto max-h-[800px] top-14"
								>
									<div className="flex items-center sticky w-full -top-4 -mt-4 py-4 bg-[inherit] justify-between z-10">
										<h4 className="text-3xl font-bold">
											My Wishlist
											<span className="text-xs font-normal opacity-80">
												({wishlist && wishlist.length})
											</span>
										</h4>
										<Link href="/wishlist" className="text-primary">
											View All
										</Link>
									</div>
									<div className="flex flex-col flex-1 gap-2">
										{wishlist && wishlist.length === 0 && (
											<div className="flex items-center justify-center flex-1">
												<h1 className="text-3xl font-bold">Go to shop</h1>
											</div>
										)}
										{wishlist &&
											wishlist.map(({ product }: any) => {
												const rate = (
													product.commented.reduce(
														(a: number, b: any & { rate: number }) =>
															a + b.rate,
														0
													) / product.commented.length || 0
												).toFixed(1);
												return (
													<Link
														className="flex items-center gap-4 p-2 transition-colors rounded-lg hover:bg-base-200"
														href={`/product/${product.id}`}
														key={product.id + product.catalogId}
													>
														<div className="flex bg-base-300 h-[100px] justify-center items-center rounded-lg overflow-hidden">
															<Image
																width="115"
																height="115"
																className="object-contain rounded-[inherit]"
																src={product.image}
																alt={product.name}
															/>
														</div>
														<div className="flex-1">
															<h4 className="text-sm font-bold opacity-80">
																{product.catalog_name.name}
															</h4>
															<h3 className="text-xl font-bold">
																{product.name}
															</h3>
															<div className="flex items-center">
																<div className="rating rating-sm">
																	<input
																		type="radio"
																		name={"product_rank_" + product.id}
																		className="hidden mask mask-star rating-hidden"
																		readOnly
																		checked={true}
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
																<div className="flex justify-end flex-1 text-2xl font-bold">
																	${product.price}
																</div>
															</div>
														</div>
													</Link>
												);
											})}
									</div>
								</div>
							)}
						</div>
						<div className="relative flex items-center dropdown dropdown-end">
							<label tabIndex={0} className="indicator">
								{cart && Boolean(cart.length) && (
									<span className="mt-1 mr-1 indicator-item badge">
										{cart.length}
									</span>
								)}

								<div className="btn btn-ghost btn-circle">
									{!account ? (
										<label tabIndex={0} htmlFor="modal-account">
											<Icon
												name="cart"
												className="w-12 h-12 p-1.5 fill-current"
											/>
										</label>
									) : (
										<Icon
											name="cart"
											className="w-12 h-12 p-1.5 fill-current"
										/>
									)}
								</div>
							</label>

							{account && (
								<div
									tabIndex={0}
									className="flex flex-col dropdown-content p-4 bg-base-100 shadow-2xl rounded-box min-w-[420px] overflow-auto max-h-[800px] top-14"
								>
									<div className="flex items-center sticky w-full -top-4 -mt-4 py-4 bg-[inherit] justify-between z-10">
										<h4 className="text-3xl font-bold">
											My Cart
											<span className="text-xs font-normal opacity-80">
												({cart && cart.length})
											</span>
										</h4>
										<Link href="/cart" className="text-primary">
											View All
										</Link>
									</div>
									<div className="flex flex-col flex-1 gap-2">
										{cart && cart.length === 0 && (
											<div className="flex items-center justify-center flex-1 py-4">
												<h1 className="text-3xl font-bold">Go to shop</h1>
											</div>
										)}
										{cart &&
											cart.map(({ product }: any) => {
												const rate = (
													product.commented.reduce(
														(a: number, b: any & { rate: number }) =>
															a + b.rate,
														0
													) / product.commented.length || 0
												).toFixed(1);
												return (
													<Link
														className="flex items-center gap-4 p-2 transition-colors rounded-lg hover:bg-base-200"
														href={`/product/${product.id}`}
														key={product.id + product.catalog_name.id}
													>
														<div className="flex bg-base-300 h-[100px] justify-center items-center rounded-lg overflow-hidden">
															<Image
																width="115"
																height="115"
																className="object-contain rounded-[inherit]"
																src={product.image}
																alt={product.name}
															/>
														</div>
														<div className="flex-1">
															<h4 className="text-sm font-bold opacity-80">
																{product.catalog_name.name}
															</h4>
															<h3 className="text-xl font-bold">
																{product.name}
															</h3>
															<div className="flex items-center">
																<div className="rating rating-sm">
																	<input
																		type="radio"
																		name={"product_rank_" + product.id}
																		className="hidden mask mask-star rating-hidden"
																		readOnly
																		checked={true}
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
																<div className="flex justify-end flex-1 text-2xl font-bold">
																	${product.price}
																</div>
															</div>
														</div>
													</Link>
												);
											})}
									</div>
								</div>
							)}
						</div>
					</div>
					<div className="flex items-center sm:hidden">
						<label htmlFor="my-drawer" className="btn btn-circle">
							<Icon name="menu" className="w-12 h-12 p-1.5 fill-current" />
						</label>
					</div>
				</div>
			</div>
		</>
	);
};

export default Header;
