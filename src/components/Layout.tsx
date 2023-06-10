import Breadcrumbs from "./Breadcrumbs";
import DrawerSide from "./DrawerSide";
import Footer from "./Footer";
import Header from "./Header";
import ModalAccount from "./ModalAccount";

export default function Layout({ children }: any) {
	return (
		<>
			<div className="drawer drawer-end bg-base-200">
				<input
					id="my-drawer"
					type="checkbox"
					className="drawer-toggle rating"
				/>
				<div
					className="flex flex-col min-h-screen drawer-content"
					// style={{
					// 	overflow: "overlay",
					// }}
				>
					<Header />
					<Breadcrumbs />
					<main className="flex-1 pb-8">{children}</main>
					<Footer />
				</div>
				<DrawerSide />
			</div>
			<ModalAccount />
		</>
	);
}
