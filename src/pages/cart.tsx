import Icon from "src/components/Icon";
import Link from "next/link";
import { createServerSideHelpers } from "@trpc/react-query/server";
import appRouter from "src/server/routes/_app";
import { createContext } from "src/server/context";
import { trpc } from "src/utils/trpc";
import superjson from "superjson";
import CartProduct from "../components/CartProduct";
import { useState } from "react";

export const getServerSideProps = async (req: any) => {
	const ssr = createServerSideHelpers({
		router: appRouter,
		ctx: await createContext(req),
		transformer: superjson,
	});

	await ssr.cart.get.prefetch();

	return {
		props: {
			trpcState: ssr.dehydrate(),
		},
	};
};

const Cart = () => {
	const utils = trpc.useContext();

	const { data: cart } = trpc.cart.get.useQuery();
	const { mutate: confirmOrder } = trpc.cart.confirmOrder.useMutation({
		onSuccess: async () => {
			utils.cart.get.invalidate();
		},
	});

	const [fullName, setFullName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [where, setWhere] = useState("");
	const [paymentMethod, setPaymentMethod] = useState("online_payment");

	const [isConfirmed, setIsConfirmed] = useState(false);

	const submitForm = (e: any) => {
		e.preventDefault();
		setIsConfirmed(true);
		setFullName("");
		setPhone("");
		setEmail("");
		setWhere("");
		confirmOrder();
	};

	return (
		<div className="container">
			<input
				type="checkbox"
				id="good"
				checked={isConfirmed}
				className="modal-toggle"
			/>
			<div className="modal">
				<div className="modal-box">
					<div className="flex items-center gap-2">
						<Icon className="w-16 h-16 p-1.5 fill-current" name="logo" />
						<h3 className="text-lg font-bold">Thank you for your purchase</h3>
					</div>
					<div className="modal-action">
						<label
							htmlFor="good"
							onClick={() => setIsConfirmed(false)}
							className="btn"
						>
							Close
						</label>
					</div>
				</div>
			</div>

			<h1 className="text-5xl font-bold">Cart</h1>
			<div className="flex flex-col justify-between gap-8 mt-4 lg:flex-row">
				<div className="flex flex-col flex-1 gap-4">
					<div>
						<h2 className="mb-2 text-lg font-bold">Delivery Information</h2>
						<div className="p-4 rounded-lg bg-base-200">
							<form
								id="confirm_order"
								className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-4"
								onSubmit={submitForm}
							>
								{[
									{ state: fullName, change: setFullName, label: "Full name" },
									{ state: phone, change: setPhone, label: "Phone" },
									{ state: email, change: setEmail, label: "Email" },
									{ state: where, change: setWhere, label: "Deliver to" },
								].map(({ state, change, label }: any, i) => {
									return (
										<div key={i}>
											<label
												className="text-sm font-bold opacity-70"
												htmlFor="password"
											>
												{label.toUpperCase()}
											</label>

											<input
												className="w-full input"
												required
												value={state}
												type={
													label === "Email"
														? "email"
														: label === "Phone"
														? "tel"
														: "text"
												}
												onChange={(e) => change(e.target.value)}
											/>
										</div>
									);
								})}
							</form>
						</div>
					</div>
					<div>
						<h2 className="mb-2 text-lg font-bold">Payment Method</h2>
						<div className="flex flex-col items-center justify-between gap-4 p-4 rounded-lg sm:flex-row bg-base-200">
							{[
								{ label: "Online Payment", id: "online_payment" },
								{ label: "Cash on Delivery", id: "cash_on_delivery" },
								{ label: "POS on Delivery", id: "POS_on_Delivery" },
							].map(({ label, id }) => {
								return (
									<div
										className="flex items-center gap-2"
										key={id}
										onClick={() => setPaymentMethod(id)}
									>
										<label htmlFor={id}>{label}</label>
										<input
											id={id}
											type="radio"
											className="radio"
											name="payment_method"
											checked={paymentMethod === id}
										/>
									</div>
								);
							})}
						</div>
					</div>
				</div>
				<div className="flex-1">
					{cart && cart.length === 0 && (
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
					{cart && cart.length !== 0 && (
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
									{cart
										.sort((a, b) => (a.id < b.id ? -1 : 1))
										.map((cartProduct: any) => {
											return (
												<CartProduct
													key={cartProduct.id}
													product={{
														...cartProduct.product,
														count: cartProduct.count,
													}}
													cartProductId={cartProduct.id}
												/>
											);
										})}
								</tbody>
							</table>
							<div className="mt-4">
								<div className="flex items-center justify-between">
									<p className="font-bold opacity-60">Total</p>
									<p className="text-3xl font-bold">
										$
										{cart.reduce(
											(a: number, b: any) => a + b.product.price * b.count,
											0
										)}
									</p>
								</div>
							</div>
							<button className="w-full mt-4 btn" form="confirm_order">
								Confirm Order
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Cart;
