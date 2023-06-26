import { Catalog } from "@prisma/client";
import { createServerSideHelpers } from "@trpc/react-query/server";
import Card from "src/components/Card";
import Icon from "src/components/Icon";
import { createContext } from "src/server/context";
import appRouter from "src/server/routes/_app";
import { trpc } from "src/utils/trpc";
import superjson from "superjson";
import { useEffect, useState } from "react";
import CardSkeleton from "src/components/CardSkeleton";
import { useInView } from "react-intersection-observer";

const LIMIT = 20;

export const getServerSideProps = async (req: any) => {
	const catalog = req.query.catalog || "";

	const ssr = createServerSideHelpers({
		router: appRouter,
		ctx: await createContext(req),
		transformer: superjson,
	});

	await ssr.catalog.getAll.prefetch();
	await ssr.catalog.getProductByCatalogName.prefetch(catalog);
	await ssr.catalog.infinityAll.prefetch({
		limit: LIMIT,
		category: catalog,
	});

	return {
		props: {
			catalog,
			trpcState: ssr.dehydrate(),
		},
	};
};

const Catalogs = ({ catalog }: { catalog: string }) => {
	const [selectedCatalog, setSelectedCatalog] = useState(catalog);
	const [selectedFilter, setSelectedFilter] = useState("sort by");

	const { ref, inView } = useInView();
	const {
		data: productsResponse,
		isLoading: isLoadingProducts,
		isFetchingNextPage: isFetchingNextPageProducts,
		isSuccess: isSuccessProducts,
		hasNextPage,
		fetchNextPage,
	} = trpc.catalog.infinityAll.useInfiniteQuery(
		{
			limit: LIMIT,
			category: selectedCatalog,
		},
		{
			getNextPageParam: (lastPage) => {
				return lastPage.nextCursor;
			},
		}
	);
	let products: any = productsResponse?.pages.reduce(
		(allProducts: any, currentPage: any) => [
			...allProducts,
			...currentPage.items,
		],
		[]
	);

	useEffect(() => {
		if (typeof window !== "undefined" && typeof document !== "undefined") {
			document.querySelector(".drawer-content")?.scrollTo({ top: 0 });
		}
	}, [selectedCatalog]);

	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage();
		}
	}, [inView, fetchNextPage, hasNextPage]);

	const { data: catalogs } = trpc.catalog.getAll.useQuery();

	return (
		<>
			<div className="container flex h-full gap-4">
				<div className="hidden md:block flex-1 max-w-[250px]">
					<div className="sticky hidden bg-base-200 sm:block rounded-box top-20">
						<div className="collapse collapse-arrow">
							<input
								type="checkbox"
								className="peer"
								defaultChecked={!!catalog}
							/>
							<div className="collapse-title">Categories</div>
							<div className="collapse-content">
								{catalogs &&
									catalogs.map((catalog: Catalog) => {
										return (
											<label
												className="flex items-center gap-2 py-1"
												id="category"
												key={catalog.id + catalog.name}
												onClick={() => setSelectedCatalog(catalog.name)}
											>
												<input
													type="radio"
													name="category"
													className="radio radio-sm"
													readOnly
													checked={selectedCatalog === catalog.name}
												/>
												<p>{catalog.name}</p>
											</label>
										);
									})}
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
				<div className="flex-1 rounded-box">
					<div className="sticky z-10 top-16">
						<div className="flex items-center justify-between backdrop-blur-lg">
							<h1 className="text-[2.5rem] font-bold">
								Catalog
								{products && (
									<span className="text-sm opacity-60">
										({products && products.length})
									</span>
								)}
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
									value={selectedFilter}
									onChange={(e) => setSelectedFilter(e.target.value)}
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
							{isSuccessProducts &&
								products.map((product: any, i: number) => {
									if (products.length === i + 1) {
										return (
											<Card ref={ref} product={product} key={product.id} />
										);
									}
									return <Card product={product} key={product.id} />;
								})}
							{(isFetchingNextPageProducts || isLoadingProducts) &&
								Array(LIMIT)
									.fill(0x00)
									.map((_, i) => (
										<CardSkeleton key={`product_skeleton_${i}`} />
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
