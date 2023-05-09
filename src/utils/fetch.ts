import { getRandomImgSrc } from "./view";

export const getWishlist = () => {
	return Array(5).fill(0);
};

export const getCart = () => {
	return Array(0).fill(0);
};

export const getAccount = () => {
	return {
		messages: Array(0).fill(0),
	};
};

export const getProducts = () => {
	return Array(5)
		.fill(0)
		.map(() => {
			return {
				image: getRandomImgSrc(),
				catalog: "Electronics",
				description: "Lorem ipsum dolor sit amet, asd f adipisicing elit",
				view: 103,
				price: 25.99,
				rate: 4,
			};
		});
};

export const getProduct = () => {
	return {
		rate: 3.8,
		rated: 54,
		commented: 4,
		poster: getRandomImgSrc(),
		tags: [
			"Smartphone",
			"Wi-Fi 6",
			"LTPO",
			"FaceID",
			"2022",
			"without microSD",
		],
		isInStock: true,
		carousel: Array(5)
			.fill(0x00)
			.map(() => getRandomImgSrc()),
		name: "Apple iPhone 14 Pro Max",
		price: 29.59,
		desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum,
		dolorem eveniet dolore laboriosam minima magni suscipit
		quibusdam nobis iure quidem veniam architecto pariatur ea
		tenetur adipisci laudantium. Necessitatibus, ipsum quod?`,
	};
};

export const getCatalogs = () => {
	return Array(20)
		.fill(0)
		.map(() => {
			return {
				name: "Laptop and software",
			};
		});
};
