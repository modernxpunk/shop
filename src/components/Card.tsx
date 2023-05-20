import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";

const Card = ({ product }: { product: any }) => {
	return (
		<Link
			href={"/product/" + product.id}
			className="flex flex-col overflow-hidden transition-shadow rounded-lg shadow-lg group hover:shadow-xl"
		>
			<div className="relative flex items-center justify-center flex-1 m-2 mb-0">
				<div className="absolute top-0 right-0 z-10 hidden rounded-box group-hover:flex animate-appear btn-group btn-group-vertical">
					<div className="btn btn-sm btn-circle">
						<Icon
							className="w-8 h-8 p-1 fill-current"
							name="cards-heart-outline"
						/>
					</div>
					<div className="btn btn-sm btn-circle">
						<Icon className="w-8 h-8 p-1 fill-current" name="cart-outline" />
					</div>
				</div>
				<div className="flex bg-base-300 flex-1 h-[150px] justify-center items-center rounded-lg overflow-hidden">
					<Image
						layout="fill"
						className="object-contain rounded-[inherit]"
						src={product.image}
						alt={""}
					/>
				</div>
			</div>
			<div className="flex items-stretch p-2">
				<div className="flex-1">
					<p className="opacity-60 line-clamp-1">{product.catalog_name.name}</p>
					<p className="font-bold line-clamp-2">{product.name}</p>
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<div className="items-center rating">
								{Array(5)
									.fill(0x00)
									.map((_, i: number) => {
										return (
											<input
												type="radio"
												name="product_rank"
												className="mask mask-star"
												key={"product_rank_" + i}
												checked={i + 1 < (product.rate || 0)}
											/>
										);
									})}
							</div>
							<div className="flex items-center">
								<p className="flex-1 ml-1 text-sm opacity-60">
									{product.view} view
								</p>
							</div>
						</div>
						<div>
							<p className="text-3xl font-bold">${product.price}</p>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default Card;
