import { FC } from "react";

type Props = {
	name: string;
	className?: string;
};

const Icon: FC<Props> = ({ name, className }) => {
	return (
		<svg className={className}>
			<use xlinkHref={`/images/sprite.svg#${name}`} />
		</svg>
	);
};

export default Icon;
