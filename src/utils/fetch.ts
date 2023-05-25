// "use server";

import { prisma } from "./db";

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
			view: true,
			name: true,
			commented: {
				select: {
					rate: true,
				},
			},
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
			view: true,
			name: true,
			commented: {
				select: {
					rate: true,
				},
			},
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
			id: true,
			description: true,
			image: true,
			isInStock: true,
			name: true,
			poster: true,
			price: true,
			view: true,
			catalog_name: {
				select: {
					name: true,
				},
			},
			tags_name: {
				select: {
					id: true,
					name: true,
				},
			},
			commented: {
				take: 3,
				select: {
					id: true,
					content: true,
					createdAt: true,
					likes: true,
					rate: true,
					User: {
						select: {
							avatar: true,
							username: true,
						},
					},
				},
			},
		},
		where: {
			id: id,
		},
	});
	const rating = await prisma.comment.aggregate({
		_avg: {
			rate: true,
		},
		_count: {
			_all: true,
		},
		where: {
			productId: id,
		},
	});
	const balling = await prisma.product.findUnique({
		select: {
			commented: {
				select: {
					rate: true,
				},
			},
		},
		where: {
			id: id,
		},
	});
	return {
		...product,
		...rating,
		balling: balling?.commented,
	};
};

export const getCatalogs = async () => {
	const catalogs = await prisma.catalog.findMany();
	return catalogs;
};
