const getRandomNumber = (min: number, max: number): number => {
	return Math.ceil((min + Math.floor(Math.random() * (max - min))) / 100) * 100;
};

export const getRandomImgSrc = (
	x: number | null = null,
	y: number | null = null
) => {
	let width = x;
	let height = y;
	if (!width) {
		width = getRandomNumber(100, 1000);
	}
	if (!height) {
		height = getRandomNumber(100, 1000);
	}
	return `https://fakeimg.pl/${width}x${height}/`;
};
