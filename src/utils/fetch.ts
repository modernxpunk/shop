"use server";

import { getRandomImgSrc } from "./view";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getWishlist = () => {
	return Array(5).fill(0);
};

export const getCart = () => {
	return Array(3).fill(0);
};
export const getAccount = () => {
	return {
		messages: Array(0).fill(0),
	};
};

export const getProducts = async () => {
	const products = await prisma.product.findMany({
		take: 4,
		select: {
			catalog_name: true,
			id: true,
			image: true,
			price: true,
			rate: true,
			view: true,
			name: true,
		},
	});
	return products;
};

export const getCatalogProducts = async () => {
	const products = await prisma.product.findMany({
		take: 20,
		select: {
			catalog_name: {
				select: {
					name: true,
				},
			},
			id: true,
			image: true,
			price: true,
			rate: true,
			view: true,
			name: true,
		},
	});
	return products;
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

export const getCatalogs = async () => {
	const catalogs = await prisma.catalog.findMany();
	return catalogs;
};
