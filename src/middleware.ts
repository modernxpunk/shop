import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

const WHITELISTED_PAGES = [
	"/blocked",
	"/terms-of-service.pdf",
	"/privacy-notice.pdf",
];

const BLOCKED_REGIONS = [
	"UA-11", // Autonomous Republic of Crimea
	"UA-05", // Donetsk Oblast
	"UA-14", // Luhansk Oblast
	"UA-20", // Sevastopol Municipality
	"US-AS", // American Samoa
	"US-GU", // Guam
	"US-PR", // Puerto Rico
	"US-MP", // Northern Mariana Islands
	"US-VI", // US Virgin Islands
];

const BLOCKED_COUNTRIES = [
	"AF", // Afghanistan
	"VE", // Venezuela
	"BI", // Burundi
	"KP", // North Korea (Democratic People’s Republic of Korea)
	"CD", // Democratic Republic of the Congo
	"IQ", // Iraq
	"IR", // Iran (Islamic Republic of Iran)
	"LB", // Lebanon
	"LY", // Libya
	"ML", // Mali
	"MM", // Myanmar
	"BY", // Belarus
	"CU", // Cuba
	"RU", // Russia (Russian Federation)
	"SO", // Somalia
	"SS", // South Sudan
	"SD", // Sudan
	"SY", // Syria (Syrian Arab Republic)
	"YE", // Yemen
	"ZW", // Zimbabwe
];

export function middleware(req: NextRequest) {
	const country = req.headers.get("cf-ipcountry") || "";
	const region = req.headers.get("cf-region-code") || "";

	console.log(`Country: ${country}, Region: ${region}`);


	if (BLOCKED_COUNTRIES.includes(country) || BLOCKED_REGIONS.includes(region)) {
		const pathname = new URL(req.url).pathname;

		if (!WHITELISTED_PAGES.includes(pathname)) {
			return Response.redirect(new URL("/blocked", req.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: "/((?!api|static|monitoring|.*\\..*|_next).*)",
};
