import Icon from "./Icon";

const DrawerSide = () => {
	const menu = [
		{
			iconName: "account",
			label: "Account",
			href: "/wishlist",
		},
		{
			iconName: "heart",
			label: "Wishlist",
			href: "/cart",
		},
		{
			iconName: "cart",
			label: "Cart",
			href: "/cart",
		},
	];
	return (
		<div className="drawer-side">
			<label htmlFor="my-drawer" className="drawer-overlay"></label>
			<ul className="p-4 menu w-52 bg-base-100 text-base-content">
				{menu.map((item) => {
					return (
						<li key={item.label}>
							<a className="font-bold" href={item.href}>
								<Icon className="w-8 h-8 fill-current" name={item.iconName} />
								{item.label}
							</a>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default DrawerSide;
