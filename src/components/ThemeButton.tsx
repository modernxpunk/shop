"use client";
import Icon from "./Icon";

const ThemeButton = () => {
	return (
		<>
			<label className="swap">
				<input type="checkbox" />
				<Icon
					name="white-balance-sunny"
					className="w-16 h-8 fill-current swap btn btn-sm btn-ghost swap-on"
				/>
				<Icon
					name="moon-waning-crescent"
					className="w-16 h-8 fill-current swap btn btn-sm btn-ghost swap-off"
				/>
			</label>
		</>
	);
};

export default ThemeButton;
