import React from "react";
import Header from "src/components/Header";
import "src/styles/globals.css";
import ModalAccount from "src/components/ModalAccount";
import Breadcrumbs from "../src/components/Breadcrumbs";
import Footer from "src/components/Footer";
import DrawerSide from "src/components/DrawerSide";

export default function RootLayout({
	children,
}: {
	children: React.ReactElement;
}) {
	return (
		<html lang="en">
			<head>
				<meta name="theme-color" content="#2a303c" />
				<title>Document</title>
			</head>
			<body>
				<div className="drawer drawer-end">
					<input
						id="my-drawer"
						type="checkbox"
						className="drawer-toggle rating"
					/>
					<div
						className="flex flex-col min-h-screen drawer-content"
						style={{
							overflow: "overlay",
						}}
					>
						{/* @ts-expect-error Server Component */}
						<Header />
						<Breadcrumbs />
						<main className="flex-1 pb-8">{children}</main>
						<Footer />
					</div>
					<DrawerSide />
				</div>
				<ModalAccount />
			</body>
		</html>
	);
}
