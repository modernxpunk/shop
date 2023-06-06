import Link from "next/link";
import Icon from "./Icon";

const CardSkeleton = () => {
	return (
		<Link
			href={"#"}
			className="flex flex-col overflow-hidden transition-shadow rounded-lg shadow-lg group hover:shadow-xl"
		>
			<div className="relative flex items-center justify-center flex-1 m-2 mb-0">
				<div className="absolute top-0 right-0 z-10 hidden rounded-box group-hover:flex animate-appear btn-group btn-group-vertical">
					<div className="btn btn-sm btn-circle">
						<Icon className="w-8 h-8 p-1 fill-current" name="heart-outline" />
					</div>
					<div className="btn btn-sm btn-circle">
						<Icon className="w-8 h-8 p-1 fill-current" name="cart-outline" />
					</div>
				</div>
				<div className="flex bg-base-300 flex-1 h-[150px] justify-center items-center rounded-lg overflow-hidden w-full"></div>
			</div>
			<div className="flex items-stretch p-2">
				<div className="flex-1">
					<p className="w-3/4 h-4 rounded-lg line-clamp-1 animate-pulse bg-base-300"></p>
					<p className="w-1/2 h-4 mt-2 font-bold rounded-lg line-clamp-2 animate-pulse bg-base-300"></p>
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<div className="rating">
								{Array(5)
									.fill(0x00)
									.map((_, i: number) => {
										return (
											<input
												type="radio"
												name={"product_rank_" + i}
												className="mask mask-star"
												key={`product_rank_${i}_${i}`}
												readOnly
												checked={i + 1 === 3}
											/>
										);
									})}
							</div>
							<div className="flex items-center">
								<p className="flex-1 w-16 h-4 ml-1 text-sm rounded-lg bg-base-300 animate-pulse"></p>
							</div>
						</div>
						<div className="flex justify-end flex-1">
							<p className="w-3/4 text-3xl font-bold rounded-lg h-7 animate-pulse bg-base-300"></p>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default CardSkeleton;
