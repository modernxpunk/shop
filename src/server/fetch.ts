import prisma from "./prisma";

export const getUser = async (userId: string) => {
	const user: any = await prisma.user.findUnique({
		where: {
			id: userId,
		},
		select: {
			avatar: true,
			Cart: {
				select: {
					product: {
						select: {
							id: true,
							name: true,
							image: true,
							price: true,
							isInStock: true,
							catalog_name: true,
							view: true,
							commented: {
								select: {
									rate: true,
								},
							},
						},
					},
				},
			},
			Wishlist: {
				select: {
					product: {
						select: {
							id: true,
							name: true,
							image: true,
							price: true,
							isInStock: true,
							catalog_name: true,
							view: true,
							commented: {
								select: {
									rate: true,
								},
							},
						},
					},
				},
			},
			id: true,
			email: true,
			username: true,
		},
	});
	return user;
};

export const getWishlist = async (userId: string) => {
	const wishlist = await prisma.wishlist.findMany({
		select: {
			id: true,
			count: true,
			product: {
				select: {
					id: true,
					name: true,
					image: true,
					price: true,
					isInStock: true,
					catalog_name: true,
					view: true,
					commented: {
						select: {
							rate: true,
						},
					},
				},
			},
		},
		where: {
			userId: userId,
		},
	});
	return wishlist;
};

export const addProductToWishlist = async (
	userId: string,
	productId: string
) => {
	await prisma.wishlist.create({
		data: {
			userId,
			productId,
		},
	});
};

export const getCommentsByProductId = async (productId: string) => {
	const comments = await prisma.comment.findMany({
		select: {
			id: true,
			content: true,
			createdAt: true,
			rate: true,
			Like: {
				select: {
					userId: true,
					id: true,
				},
			},
			User: {
				select: {
					avatar: true,
					username: true,
					email: true,
				},
			},
		},
		where: {
			productId,
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
			productId: productId,
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
			id: productId,
		},
	});
	return {
		comments,
		rate: rating._avg.rate,
		rateAll: rating._count._all,
		balling: balling?.commented,
	};
};

export const addComment = async (
	userId: string,
	content: string,
	rate: number,
	productId: string
) => {
	await prisma.comment.create({
		data: {
			rate,
			content,
			userId,
			productId,
		},
	});
};

export const likeComment = async (userId: string, commentId: string) => {
	const like = await prisma.like.findMany({
		where: {
			commentId: commentId,
			userId: userId,
		},
	});
	if (like.length !== 0) {
		await prisma.like.deleteMany({
			where: {
				userId: userId,
				commentId: commentId,
			},
		});
	} else {
		await prisma.like.create({
			data: {
				userId: userId,
				commentId: commentId,
			},
		});
	}
};

export const getCart = async (userId: string) => {
	const cart = await prisma.cart.findMany({
		select: {
			id: true,
			count: true,
			product: {
				select: {
					id: true,
					name: true,
					image: true,
					price: true,
					isInStock: true,
					catalog_name: true,
					view: true,
					commented: {
						select: {
							rate: true,
						},
					},
				},
			},
		},
		where: {
			userId: userId,
		},
	});
	return cart;
};

export const addProductToCart = async (userId: string, productId: string) => {
	await prisma.cart.create({
		data: {
			userId,
			productId,
		},
	});
};

export const editedCountProductToCart = async (
	cartProductId: string,
	newCount: number
) => {
	await prisma.cart.updateMany({
		data: {
			count: newCount,
		},
		where: {
			id: cartProductId,
		},
	});
};

export const deleteProductFromCartById = async (id: string) => {
	await prisma.cart.deleteMany({
		where: {
			id,
		},
	});
};

export const deleteProductFromWishlistById = async (id: string) => {
	await prisma.wishlist.deleteMany({
		where: {
			id,
		},
	});
};

export const editedCountProductToWishlist = async (
	wishlistProductId: string,
	newCount: number
) => {
	await prisma.wishlist.updateMany({
		data: {
			count: newCount,
		},
		where: {
			id: wishlistProductId,
		},
	});
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
		...(category && {
			where: {
				catalog_name: {
					name: category,
				},
			},
		}),
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
			Characteristic: {
				select: {
					attribute: true,
					value: true,
				},
			},
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
			// commented: {
			// 	take: 3,
			// 	select: {
			// 		id: true,
			// 		content: true,
			// 		createdAt: true,
			// 		likes: true,
			// 		rate: true,
			// 		User: {
			// 			select: {
			// 				avatar: true,
			// 				username: true,
			// 			},
			// 		},
			// 	},
			// },
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
