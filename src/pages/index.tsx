import Image from "next/image";
import Card from "src/components/Card";
import Icon from "src/components/Icon";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { getRandomImgSrc } from "src/utils/view";
import Link from "next/link";
import { trpc } from "src/utils/trpc";
import appRouter from "src/server/routes/_app";
import { createContext } from "src/server/context";
import superjson from "superjson";
import { GetServerSidePropsContext } from "next";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";

export const getServerSideProps = async (
	context: GetServerSidePropsContext & CreateNextContextOptions
) => {
	const ssr = createServerSideHelpers({
		router: appRouter,
		ctx: await createContext(context),
		transformer: superjson,
	});

	await ssr.catalog.getAll.prefetch();
	await ssr.product.getAll.prefetch();

	return {
		props: {
			trpcState: ssr.dehydrate(),
		},
	};
};

const Home = () => {
	const catalogs = trpc.catalog.getAll.useQuery();
	const products = trpc.product.getAll.useQuery();

	return (
		<div className="container">
			<div className="grid grid-rows-2 sm:grid-cols-[minmax(200px,auto),1fr] sm:grid-rows-1 gap-4 sm:max-h-[400px]">
				<div className="order-1 col-span-1 row-span-1 overflow-x-hidden rounded-lg sm:-order-none sm:max-h-none">
					<ul className="menu bg-base-100 rounded-box">
						{catalogs.data &&
							catalogs.data.map((catalog: any, i: number) => {
								return (
									<li key={i}>
										<Link href={`/catalog?catalog=${catalog.name}`}>
											<Icon
												className="w-8 h-8 fill-current"
												name="controller"
											/>
											<p className="flex-1">{catalog.name}</p>
										</Link>
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
								<Link href="/catalog" className="btn btn-sm">
									see more
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="mt-8 space-y-6">
				<div className="flex items-end justify-between gap-4">
					<h3 className="text-4xl font-bold">Popular products</h3>
					<Link href="/catalog" className="btn btn-sm btn-outline">
						View All
					</Link>
				</div>
				<div className="grid gap-4 mt-2 grid-cols-item">
					{products.data &&
						products.data.map((product: any) => {
							return <Card product={product} key={product.id} />;
						})}
				</div>
			</div>
		</div>
	);
};

export default Home;
