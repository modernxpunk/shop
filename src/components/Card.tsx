import Image from "next/image";
import { getRandomImgSrc } from "src/utils/view";
import Icon from "./Icon";

const Card = () => {
	return (
		<a
			href="/product"
			className="flex flex-col overflow-hidden transition-shadow rounded-lg shadow-lg group hover:shadow-xl"
		>
			<div className="relative flex items-center justify-center flex-1 m-2 mb-0">
				<div className="absolute top-0 left-0 right-0 justify-end hidden group-hover:flex animate-appear">
					<div className="btn btn-md btn-circle btn-ghost">
						<Icon
							className="w-8 h-8 text-slate-700"
							name="cards-heart-outline"
						/>
						{/* <Sprite
							class="w-8 h-8 text-slate-700"
							pack="mdi"
							name="cards-heart-outline"
						/> */}
					</div>
					<div className="btn btn-md btn-circle btn-ghost">
						<Icon className="w-8 h-8 text-slate-700" name="cart-outline" />
						{/* <Sprite
							class="w-8 h-8 text-slate-700"
							pack="mdi"
							name="cart-outline"
						/> */}
					</div>
				</div>
				<div className="flex bg-base-300 flex-1 h-[150px] justify-center items-center rounded-lg overflow-hidden">
					<Image
						width="400"
						height="400"
						className="object-cover rounded-[inherit]"
						src={getRandomImgSrc()}
						alt={""}
					/>
				</div>
			</div>
			<div className="flex items-stretch p-2">
				<div className="flex-1">
					<p className="opacity-60">Electronics</p>
					<p className="font-bold break-all">
						Lorem ipsum dolor sit amet, asd f adipisicing elit
					</p>
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<div className="items-center rating">
								<input
									type="radio"
									name="rating-1"
									className="mask mask-star"
								/>
								<input
									type="radio"
									name="rating-1"
									className="mask mask-star"
									checked
								/>
								<input
									type="radio"
									name="rating-1"
									className="mask mask-star"
								/>
								<input
									type="radio"
									name="rating-1"
									className="mask mask-star"
								/>
								<input
									type="radio"
									name="rating-1"
									className="mask mask-star"
								/>
							</div>
							<div className="flex items-center">
								<p className="flex-1 ml-1 text-sm opacity-60">103 view</p>
							</div>
						</div>
						<div>
							<p className="text-3xl font-bold">$29.59</p>
						</div>
					</div>
				</div>
			</div>
		</a>
	);
};

export default Card;
