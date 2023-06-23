import Icon from "./Icon";
import { usePathname } from "next/navigation";

const Breadcrumbs = () => {
	let pathname = usePathname();
	pathname = pathname || "";
	if (pathname.at(-1) === "/") {
		pathname = pathname.slice(0, pathname.length - 1);
	}

	const breadcrumbs = pathname.split("/").map((path: string) => {
		if (path === "cart") {
			return {
				href: "/cart",
				label: "Cart",
				iconName: "cart",
			};
		} else if (path === "wishlist") {
			return {
				href: "/wishlist",
				label: "Wishlist",
				iconName: "heart",
			};
		} else if (path === "shop") {
			return {
				href: "/shop",
				label: "Shop",
				iconName: "shop",
			};
		} else if (path === "product") {
			return {
				href: "/product",
				label: "Product",
				iconName: "cart",
			};
		} else if (path === "catalog") {
			return {
				href: "/catalog",
				label: "Catalog",
				iconName: "shopping",
			};
		} else if (path === "") {
			return {
				href: "/",
				label: "Home",
				iconName: "home",
			};
		} else if (path === "account") {
			return {
				href: "/account",
				label: "Account",
				iconName: "account",
			};
		} else {
			return {
				href: "",
				label: "",
				iconName: "",
			};
		}
	});

	return (
		<div className="container">
			<div className="breadcrumbs">
				<ul className="text-sm breadcrumbs-items">
					{breadcrumbs.map(({ href, label, iconName }: any) => {
						return (
							<li key={href}>
								<a href={href}>
									<Icon className="w-4 h-4 mr-1 fill-current" name={iconName} />
									{label}
								</a>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default Breadcrumbs;
