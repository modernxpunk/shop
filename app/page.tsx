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

export const dynamic = "force-dynamic";

const Home = async () => {
	const catalogs = await getCatalogs();
	const products = await getProducts();
	return (
		<div className="container">
			<div className="grid grid-rows-2 sm:grid-cols-[max-content,1fr] sm:grid-rows-1 gap-4 sm:h-[400px]">
				<div className="order-1 sm:-order-none col-span-1 row-span-1 overflow-auto rounded-lg max-h-[250px] sm:max-h-none">
					<ul className="menu bg-base-200 rounded-box">
						{catalogs.map((catalog, i) => {
							return (
								<li key={i}>
									<a href={`/catalog?catalog=${catalog.name}`}>
										<Icon className="w-8 h-8 fill-current" name="controller" />
										<p className="flex-1">{catalog.name}</p>
									</a>
								</li>
							);
						})}
					</ul>
				</div>
				<div className="col-span-1 row-span-1 gap-4 rounded-lg carousel">
					<div className="relative w-full carousel-item">
						<Image
							className="flex-1 object-cover w-full h-full rounded-lg"
							width={1200}
							height={400}
							src={getRandomImgSrc(1200, 400)}
							alt={""}
						/>
						<div className="absolute bottom-0 left-0 right-0 flex justify-end">
							<div className="p-2 ml-auto">
								<a href="/catalog" className="btn btn-sm">
									see more
								</a>
							</div>
						</div>
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
									<a href="/catalog" className="btn btn-sm btn-outline">
										View All
									</a>
								</div>
								<div className="grid gap-4 mt-2 grid-cols-item">
									{products.map((product) => {
										return <Card product={product} key={product.id} />;
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
