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

export const getCatalogs = () => {
	return Array(5)
		.fill(0)
		.map(() => {
			return {
				name: "Laptop and software",
			};
		});
};
