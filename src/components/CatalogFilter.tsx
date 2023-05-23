"use client";
import { Catalog } from "@prisma/client";
import Link from "next/link";

const CatalogFilter = ({
	catalogs,
	currentCatalog,
}: {
	catalogs: Catalog[];
	currentCatalog: string;
}) => {
	return (
		<div className="hidden md:block flex-1 max-w-[250px]">
			<div className="sticky hidden bg-base-200 sm:block rounded-box top-20">
				<div className="collapse collapse-arrow">
					<input type="checkbox" className="peer" />
					<div className="collapse-title">Categories</div>
					<div className="collapse-content">
						<div className="space-y-2">
							{catalogs.map((catalog) => {
								return (
									<Link
										key={catalog.id + catalog.name}
										href={`/catalog?catalog=${catalog.name}`}
									>
										<label className="flex items-center gap-2" id="category">
											<input
												type="radio"
												name="category"
												className="radio radio-sm"
												readOnly
												checked={currentCatalog === catalog.name}
											/>
											<p>{catalog.name}</p>
										</label>
									</Link>
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
							readOnly
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
											<input type="checkbox" className="checkbox checkbox-sm" />
											<div className="rating rating-md">
												{Array(5)
													.fill(0)
													.map((_, j) => {
														return (
															<input
																type="radio"
																name={`rating-${20 * i + 1 + j}as`}
																readOnly
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
	);
};

export default CatalogFilter;
