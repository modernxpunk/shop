"use client";
import { cx } from "class-variance-authority";
import { useEffect, useState } from "react";
import { themeChange } from "theme-change";
import Icon from "./Icon";

const ThemeButton = () => {
	const [theme, setTheme] = useState<"light" | "dark">("light");

	useEffect(() => {
		themeChange(false);
	}, []);

	return (
		<>
			<label className="gap-1 swap">
				<input
					type="checkbox"
					checked={theme === "light"}
					onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
				/>
				<button
					className="swap-on"
					data-toggle-theme="light"
					data-set-theme="light"
				>
					<Icon
						name="white-balance-sunny"
						className={cx("w-16 h-8 fill-current swap btn btn-sm btn-ghost")}
					/>
				</button>
				<button
					className="swap-off"
					data-toggle-theme="dark"
					data-set-theme="dark"
				>
					<Icon
						name="moon-waning-crescent"
						className={cx("w-16 h-8 fill-current swap btn btn-sm btn-ghost")}
					/>
				</button>
			</label>
		</>
	);
};

export default ThemeButton;
