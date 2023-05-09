import Image from "next/image";
import Icon from "src/components/Icon";
import { getCart } from "src/utils/fetch";

const Cart = () => {
	const cart = getCart();

	return (
		<div className="container">
			<h1 className="text-5xl font-bold">Cart</h1>
			<div className="flex flex-col justify-between gap-8 mt-4 lg:flex-row">
				<div className="flex flex-col flex-1 gap-4">
					<div>
						<h2 className="mb-2 text-lg font-bold">Delivery Information</h2>
						<div className="p-4 rounded-lg bg-base-200">
							<form className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-4">
								{Array(5)
									.fill(0)
									.map((_, i) => {
										return (
											<div key={i}>
												<label
													className="text-sm font-bold opacity-70"
													htmlFor="password"
												>
													PASSWORD
												</label>
												<label className="input-group">
													<span className="text-sm font-bold opacity-80">
														<Icon className="w-6 h-6" name="account" />
													</span>
													<input
														className="w-full input input-bordered"
														type="password"
													/>
												</label>
											</div>
										);
									})}
							</form>
						</div>
					</div>
					<div>
						<h2 className="mb-2 text-lg font-bold">Payment Method</h2>
						<div className="flex flex-col items-center justify-between gap-4 p-4 rounded-lg sm:flex-row bg-base-200">
							<div className="flex items-center gap-2">
								<label htmlFor="online_payment">Online Payment</label>
								<input
									id="online_payment"
									type="radio"
									className="radio"
									name="payment_method"
								/>
							</div>
							<div className="flex items-center gap-2">
								<label htmlFor="cash_on_delivery">Cash on Delivery</label>
								<input
									id="cash_on_delivery"
									type="radio"
									className="radio"
									name="payment_method"
								/>
							</div>
							<div className="flex items-center gap-2">
								<label htmlFor="POS_on_Delivery">POS on Delivery</label>
								<input
									id="POS_on_Delivery"
									type="radio"
									className="radio"
									name="payment_method"
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="flex-1">
					{cart.length === 0 && (
						<div className="flex flex-col items-center justify-center">
							<Icon className="w-32 h-32" name="heart" />
							<h1 className="text-3xl font-bold text-center">
								Oops, your wishlist is empty! Go to
								<a className="underline text-primary" href="/">
									shop
								</a>
							</h1>
						</div>
					)}
					{cart.length !== 0 && (
						<div>
							<h2 className="mb-2 text-lg font-bold">Order Summary</h2>
							<table className="table w-full overflow-hidden table-compact">
								<thead>
									<tr>
										<th />
										<th className="text-left">Name</th>
										<th className="text-center">Quantity</th>
										<th className="text-right">Price</th>
									</tr>
								</thead>
								<tbody>
									{cart.map((_, i) => {
										return (
											<tr key={i} className="hover">
												<th>
													<div className="flex items-center justify-center">
														<label className="cursor-pointer">✕</label>
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
															<div className="font-bold">STANDOUT BACKPACK</div>
															<div className="text-sm opacity-50">
																BASEBALL PACK
															</div>
														</div>
													</div>
												</td>
												<td>
													<div className="flex justify-center gap-2">
														<button className="btn btn-square btn-xs">-</button>
														<input
															className="w-16 text-center input input-xs bg-base-200"
															type="text"
															value="1"
														/>
														<button className="btn btn-square btn-xs">+</button>
													</div>
												</td>
												<td>
													<p className="text-3xl font-bold text-right">
														$12.59
													</p>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
							<div className="mt-4">
								<div className="flex items-center justify-between">
									<p className="font-bold opacity-60">Total</p>
									<p className="text-3xl font-bold">$120.49</p>
								</div>
							</div>
							<button className="w-full mt-4 btn">Confirm Order</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Cart;
