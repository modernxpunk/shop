import Icon from "./Icon";

const DrawerSide = () => {
	return (
		<div className="drawer-side">
			<label htmlFor="my-drawer" className="drawer-overlay"></label>
			<ul className="p-4 menu w-52 bg-base-100 text-base-content">
				<li>
					<a className="font-bold" href="/account">
						<Icon className="w-8 h-8" name="account" />
						Account
					</a>
				</li>
				<li>
					<a className="font-bold" href="/wishlist">
						<Icon className="w-8 h-8" name="heart" />
						Wishlist
					</a>
				</li>
				<li>
					<a className="font-bold" href="/cart">
						<Icon className="w-8 h-8" name="account" />
						Cart
					</a>
				</li>
			</ul>
		</div>
	);
};

export default DrawerSide;
