"use client";
import { cx } from "class-variance-authority";
import { useEffect, useState } from "react";
import { themeChange } from "theme-change";
import Icon from "./Icon";

const ThemeButton = () => {
	const [theme, setTheme] = useState<"light" | "dark">(
		localStorage.getItem("theme") as "light" | "dark"
	);

	useEffect(() => {
		themeChange(false);
	}, []);

	const handleTheme = () => {
		themeChange(false);
		setTheme(theme === "light" ? "dark" : "light");
	};

	return (
		<>
			<label className="gap-1 swap" onClick={handleTheme}>
				<input type="checkbox" data-toggle-theme="dark,light" />
				<Icon
					name="white-balance-sunny"
					className={cx(
						"w-16 h-8 fill-current swap btn btn-sm btn-ghost",
						theme === "dark" ? "swap-on" : "swap-off"
					)}
				/>
				<Icon
					name="moon-waning-crescent"
					className={cx(
						"w-16 h-8 fill-current swap btn btn-sm btn-ghost",
						theme === "dark" ? "swap-off" : "swap-on"
					)}
				/>
			</label>
		</>
	);
};

export default ThemeButton;
