import Card from "src/components/Card";
import Icon from "src/components/Icon";
import { getCatalogProducts, getCatalogs } from "src/utils/fetch";

const Catalog = async () => {
	const catalogs = await getCatalogs();
	const products = await getCatalogProducts();
	return (
		<>
			<div className="container flex h-full gap-4">
				<div className="hidden md:block flex-1 max-w-[250px]">
					<div className="sticky hidden bg-base-200 sm:block rounded-box top-20">
						<div className="collapse collapse-arrow">
							<input type="checkbox" className="peer" />
							<div className="collapse-title">Categories</div>
							<div className="collapse-content">
								<div className="space-y-2">
									{catalogs.map((catalog) => {
										return (
											<label
												key={catalog.id + catalog.name}
												className="flex items-center gap-2"
												id="category"
											>
												<input
													type="radio"
													name="category"
													className="radio radio-sm"
												/>
												<p>{catalog.name}</p>
											</label>
										);
									})}
								</div>
							</div>
						</div>
						<div className="collapse collapse-arrow">
							<input type="checkbox" className="peer" />
							<div className="collapse-title">Price</div>
							<div className="collapse-content">
								<input
									type="range"
									min="0"
									max="100"
									value="25"
									className="range"
									step="25"
								/>
								<div className="flex justify-between w-full px-2 text-xs">
									<span>|</span>
									<span>|</span>
									<span>|</span>
									<span>|</span>
									<span>|</span>
								</div>
							</div>
						</div>
						<div className="collapse collapse-arrow">
							<input type="checkbox" className="peer" />
							<div className="collapse-title">Rank</div>
							<div className="collapse-content">
								<div className="flex flex-col gap-4">
									{Array(5)
										.fill(0)
										.map((_, i) => {
											return (
												<div key={i} className="flex items-center gap-2">
													<input
														type="checkbox"
														className="checkbox checkbox-sm"
													/>
													<div className="rating rating-md">
														{Array(5)
															.fill(0)
															.map((_, j) => {
																return (
																	<input
																		type="radio"
																		name={`rating-${20 * i + 1 + j}as`}
																		className="mask mask-star"
																		checked={4 - i <= j}
																		key={j}
																	/>
																);
															})}
													</div>
												</div>
											);
										})}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="flex-1 rounded-box">
					<div className="flex items-center justify-between">
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
							<select className="hidden max-w-xs select select-sm select-bordered md:inline-flex">
								<option disabled selected>
									Sort by
								</option>
								<option>Popular</option>
								<option>Rank</option>
							</select>
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
			<div className="flex gap-4 btm-nav md:hidden">
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

export default Catalog;
