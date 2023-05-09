import Image from "next/image";
import Icon from "src/components/Icon";

const Wishlist = () => {
	const wishlist = Array(5).fill(0);

	return (
		<div className="container">
			<h1 className="text-5xl font-bold">Wishlist</h1>
			{wishlist.length === 0 && (
				<div className="flex flex-col items-center justify-center">
					<Icon className="w-32 h-32 fill-current" name="heart" />
					<h1 className="text-3xl font-bold text-center">
						Oops, your wishlist is empty! Go to
						<a className="underline text-primary" href="/">
							shop
						</a>
					</h1>
				</div>
			)}
			{wishlist.length !== 0 && (
				<table className="table w-full mt-6">
					<thead>
						<tr>
							<th>
								<label className="cursor-pointer">✕</label>
							</th>
							<th>Name</th>
							<th>Quantity</th>
							<th>Price</th>
							<th />
						</tr>
					</thead>
					<tbody>
						{wishlist.map((_, i) => {
							return (
								<tr key={i} className="hover">
									<th>
										<label className="cursor-pointer">✕</label>
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
											<div>
												<div className="font-bold">STANDOUT BACKPACK</div>
												<div className="text-sm opacity-50">BASEBALL PACK</div>
											</div>
										</div>
									</td>
									<td>
										<div className="flex gap-2">
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
										<p className="text-3xl font-bold">$12.59</p>
									</td>
									<th>
										<button className="btn btn-ghost btn-xs">details</button>
									</th>
								</tr>
							);
						})}
					</tbody>
					<tfoot>
						<tr>
							<th />
							<th>Name</th>
							<th>Quantity</th>
							<th>
								<p className="text-3xl font-bold">$52.59</p>
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
