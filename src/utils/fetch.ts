"use server";

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

export const getCatalogProducts = async (category: string) => {
	const products = await prisma.product.findMany({
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
		where: {
			catalog_name: {
				name: category,
			},
		},
	});
	return products;
};

export const getProduct = async (id: string) => {
	const product = await prisma.product.findUnique({
		select: {
			catalog_name: {
				select: {
					name: true,
				},
			},
			id: true,
			commented: true,
			description: true,
			image: true,
			isInStock: true,
			name: true,
			poster: true,
			price: true,
			rate: true,
			rated: true,
			view: true,
			tags_name: true,
		},
		where: {
			id: id,
		},
	});
	return product;
};

export const getCatalogs = async () => {
	const catalogs = await prisma.catalog.findMany();
	return catalogs;
};
