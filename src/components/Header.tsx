import { User } from "@prisma/client";
import { cx } from "class-variance-authority";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";
import SignOut from "./Signout";

const Header = () => {
	const { data } = useSession();
	const account = data?.user as User;

	const cart: any = [];
	const wishlist: any = [];

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

	return (
		<>
			<div className="bg-base-300">
				<nav className="container flex items-center justify-between gap-4 py-2">
					<Link href="/">
						<Icon
							className="w-16 h-8 fill-current btn btn-sm btn-primary"
							name="skull"
						/>
					</Link>
					<div className="flex items-center gap-2">
						{/* <ThemeButton /> */}
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
					<div className="flex flex-1">
						<label className="input-group">
							<span className="border-r-2 border-r-base-200">
								<Icon name="magnify" className="w-6 h-6 fill-current" />
							</span>
							<input
								type="text"
								placeholder="Search..."
								className="w-full input"
							/>
						</label>
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
												<div className="w-10 h-10 rounded-full">
													<Image
														src={account.avatar || ""}
														width={40}
														height={40}
														alt={"avatar"}
													/>
												</div>
											</div>
										) : (
											<div className="avatar placeholder">
												<div className="w-10 h-10 rounded-full bg-neutral-focus text-neutral-content">
													<span className="text-xl">K</span>
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
										className="flex flex-col mt-12 overflow-auto shadow-2xl dropdown-content bg-base-100 rounded-box"
									>
										<div className="flex z-10 items-center sticky w-full -top-4 -mt-0 bg-[inherit] justify-between">
											<ul className="w-56 menu bg-base-100 rounded-box">
												<li>
													<Link href="#">
														<Icon
															name="account"
															className="w-4 h-4 fill-current"
														/>
														Setting
													</Link>
												</li>
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
								{Boolean(wishlist.length) && (
									<span className="mt-1 mr-1 indicator-item badge">
										{wishlist.length}
									</span>
								)}
								<div className="btn btn-ghost btn-circle">
									<Icon name="heart" className="w-12 h-12 p-1.5 fill-current" />
								</div>
								<div
									tabIndex={0}
									className="flex flex-col dropdown-content p-4 bg-base-100 shadow-2xl rounded-box min-w-[425px] min-h-[150px] overflow-auto max-h-[800px] mt-12"
								>
									<div className="flex items-center sticky w-full -top-4 -mt-4 py-4 bg-[inherit] justify-between z-10">
										<h4 className="text-3xl font-bold">
											My Wishlist
											<span className="text-xs font-normal opacity-80">
												({wishlist.length})
											</span>
										</h4>
										<Link href="/wishlist" className="text-primary">
											View All
										</Link>
									</div>
									<div className="flex flex-col flex-1 gap-4">
										{wishlist.length === 0 && (
											<div className="flex items-center justify-center flex-1">
												<h1 className="text-3xl font-bold">Go to shop</h1>
											</div>
										)}
										{wishlist.map((_: any, i: number) => {
											return (
												<div className="flex items-center gap-4" key={100 * i}>
													<Image
														width="115"
														height="115"
														className="object-cover rounded-lg"
														src="https://fakeimg.pl/115x115/"
														alt={""}
													/>
													<div>
														<h4 className="text-sm font-bold opacity-80">
															BASEBALL PACK
														</h4>
														<h3 className="text-xl font-bold">
															STANDOUT BACKPACK
														</h3>
														<div className="flex flex-wrap my-2 text-sm gap-x-4">
															{[
																{ name: "size", value: "large" },
																{ name: "color", value: "white" },
																{ name: "color", value: "white" },
															].map(({ name, value }, i) => {
																return (
																	<div key={name + value + i}>
																		<p className="space-x-1">
																			<>
																				<span className="opacity-80">
																					{name}:
																				</span>
																				<span>{value}</span>
																			</>
																		</p>
																	</div>
																);
															})}
														</div>
														<div className="flex items-center justify-between">
															<div className="flex gap-2">
																<button className="btn btn-square btn-xs">
																	-
																</button>
																<input
																	className="w-16 text-center input input-xs bg-base-200"
																	type="text"
																	// value="1"
																/>
																<button className="btn btn-square btn-xs">
																	+
																</button>
															</div>
															<div>
																<p className="text-3xl font-bold">$12.59</p>
															</div>
														</div>
													</div>
												</div>
											);
										})}
									</div>
								</div>
							</label>
						</div>
						<div className="relative flex items-center dropdown dropdown-end">
							<label tabIndex={0} className="indicator">
								{Boolean(cart.length) && (
									<span className="mt-1 mr-1 indicator-item badge">
										{cart.length}
									</span>
								)}
								<div className="btn btn-ghost btn-circle">
									<Icon name="cart" className="w-12 h-12 p-1.5 fill-current" />
								</div>
								<div
									tabIndex={0}
									className="flex flex-col dropdown-content p-4 bg-base-100 shadow-2xl rounded-box min-w-[425px] overflow-auto max-h-[800px] mt-12"
								>
									<div className="flex items-center sticky w-full -top-4 -mt-4 py-4 bg-[inherit] justify-between z-10">
										<h4 className="text-3xl font-bold">
											My Cart
											<span className="text-xs font-normal opacity-80">
												({cart.length})
											</span>
										</h4>
										<Link href="/cart" className="text-primary">
											View All
										</Link>
									</div>
									<div className="flex flex-col flex-1 gap-4">
										{cart.length === 0 && (
											<div className="flex items-center justify-center flex-1 py-4">
												<h1 className="text-3xl font-bold">Go to shop</h1>
											</div>
										)}
										{cart.map((_: any, i: number) => {
											return (
												<div className="flex items-center gap-4" key={202 * i}>
													<div>
														<Image
															width="115"
															height="115"
															className="object-cover rounded-lg"
															src="https://fakeimg.pl/115x115/"
															alt={""}
														/>
													</div>
													<div>
														<h4 className="text-sm font-bold opacity-80">
															BASEBALL PACK
														</h4>
														<h3 className="text-xl font-bold">
															STANDOUT BACKPACK
														</h3>
														<div className="flex flex-wrap my-2 text-sm gap-x-4">
															{[
																{ name: "size", value: "large" },
																{ name: "color", value: "white" },
																{ name: "color", value: "white" },
															].map(({ name, value }, i: number) => {
																return (
																	<div key={303 * i}>
																		<p className="space-x-1">
																			<>
																				<span className="opacity-80">
																					{name}:
																				</span>
																				<span>{value}</span>
																			</>
																		</p>
																	</div>
																);
															})}
														</div>
														<div className="flex items-center justify-between">
															<div className="flex gap-2">
																<button className="btn btn-square btn-xs">
																	-
																</button>
																<input
																	className="w-16 text-center input input-xs bg-base-200"
																	type="text"
																	// value="1"
																/>
																<button className="btn btn-square btn-xs">
																	+
																</button>
															</div>
															<div>
																<p className="text-3xl font-bold">$12.59</p>
															</div>
														</div>
													</div>
												</div>
											);
										})}
									</div>
								</div>
							</label>
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
