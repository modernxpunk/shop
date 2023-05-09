import type { Metadata } from "next";
import Image from "next/image";
import Card from "src/components/Card";
import Icon from "src/components/Icon";
import { getCatalogs, getProducts } from "src/utils/fetch";
import { getRandomImgSrc } from "src/utils/view";

export const metadata: Metadata = {
	title: "Home",
	description: "Welcome to Next.js",
};

const Home = () => {
	const catalogs = getCatalogs();
	const products = getProducts();
	return (
		<div className="container">
			<div className="flex flex-col-reverse gap-4 sm:flex-row">
				<div className="flex-1 max-w-xs rounded-lg">
					<ul className="menu bg-base-300 rounded-box">
						{catalogs.map((catalog, i) => {
							return (
								<li key={i}>
									<a href="#">
										<Icon className="w-4 h-4" name="controller" />
										<p>{catalog.name}</p>
									</a>
								</li>
							);
						})}
					</ul>
				</div>
				<div className="flex-1 rounded-lg bg-base-200">
					<div className="carousel carousel-center space-x-4 rounded-box p-4 h-[480px]">
						{Array(10)
							.fill(0)
							.map((_, i) => {
								return (
									<div key={i} className="carousel-item">
										<Image
											width="400"
											height="480"
											src={getRandomImgSrc()}
											className="object-cover rounded-box"
											alt={""}
										/>
									</div>
								);
							})}
					</div>
				</div>
			</div>
			<div className="mt-8 space-y-6">
				{Array(2)
					.fill(0)
					.map((_, i) => {
						return (
							<div key={i}>
								<div className="flex items-end justify-between gap-4">
									<h3 className="text-4xl font-bold">Popular products</h3>
									<button className="btn btn-sm btn-outline">View All</button>
								</div>
								<div className="grid gap-4 mt-2 grid-cols-item">
									{products.map((product, i) => {
										return <Card product={product} key={i} />;
									})}
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default Home;
