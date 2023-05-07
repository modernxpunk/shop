const getRandomNumber = (min: number, max: number): number => {
	return Math.ceil((min + Math.floor(Math.random() * (max - min))) / 100) * 100;
};

export const getRandomImgSrc = () => {
	return `https://fakeimg.pl/${getRandomNumber(100, 1000)}x${getRandomNumber(
		100,
		1000
	)}/`;
};
