import { Catalog } from "@prisma/client";
import Card from "src/components/Card";
import CatalogFilter from "src/components/CatalogFilter";
import Icon from "src/components/Icon";
import { getCatalogProducts, getCatalogs } from "src/utils/fetch";

const Catalogs = async ({
	searchParams,
}: {
	params: { slug: string };
	searchParams?: { [key: string]: string | string[] | undefined };
}) => {
	const { catalog } = searchParams as any;
	const catalogs: Catalog[] = await getCatalogs();
	const products = await getCatalogProducts(catalog);
	return (
		<>
			<div className="container flex h-full gap-4">
				<CatalogFilter catalogs={catalogs} currentCatalog={catalog} />
				<div className="flex-1 rounded-box">
					<div className="sticky z-20 top-16">
						<div className="flex items-center justify-between shadow-2xl backdrop-blur-lg">
							<h1 className="text-[2.5rem] font-bold">
								Catalog
								<span className="text-sm opacity-60">({products.length})</span>
							</h1>
							<div className="flex items-center justify-end gap-2">
								<div className="hidden btn-group md:inline-flex">
									<button className="btn btn-sm btn-active">
										<Icon className="w-4 h-4 fill-current" name="dots-grid" />
									</button>
									<button className="btn btn-sm">
										<Icon className="w-4 h-4 fill-current" name="menu" />
									</button>
								</div>
								<select
									className="hidden max-w-xs select select-sm select-bordered md:inline-flex"
									defaultValue={"sort by"}
								>
									<option value={"sort by"} disabled>
										Sort by
									</option>
									<option value={"popular"}>Popular</option>
									<option value={"rank"}>Rank</option>
								</select>
							</div>
						</div>
					</div>
					<div>
						<div className="grid gap-4 grid-cols-item">
							{products.map((product) => (
								<Card product={product} key={product.id} />
							))}
						</div>
					</div>
				</div>
			</div>
			<div className="z-20 flex gap-4 btm-nav md:hidden">
				<button className="ml-4">
					<span className="w-full btm-nav-label btn">Sort</span>
				</button>
				<button className="mr-4">
					<span className="w-full btm-nav-label btn">Filters</span>
				</button>
			</div>
		</>
	);
};

export default Catalogs;
