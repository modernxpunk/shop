import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<title>Shop</title>

				<meta name="title" content="Shop" />
				<meta name="description" content="My bachelour thesis" />

				<meta property="og:type" content="website" />
				<meta
					property="og:url"
					content="https://shop-bachelor-thesis.vercel.app/"
				/>
				<meta property="og:title" content="Shop" />
				<meta property="og:description" content="My bachelour thesis" />
				<meta property="og:image" content="/images/hello.png" />

				<meta property="twitter:card" content="summary_large_image" />
				<meta
					property="twitter:url"
					content="https://shop-bachelor-thesis.vercel.app/"
				/>
				<meta property="twitter:title" content="Shop" />
				<meta property="twitter:description" content="My bachelour thesis" />
				<meta property="twitter:image" content="/images/hello.png" />

				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/images/favicon/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/images/favicon/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/images/favicon/favicon-16x16.png"
				/>
				<link rel="manifest" href="/images/favicon/site.webmanifest" />
				<link
					rel="mask-icon"
					href="/images/favicon/safari-pinned-tab.svg"
					color="#5bbad5"
				/>
				<link rel="shortcut icon" href="/images/favicon/favicon.ico" />
				<meta name="msapplication-TileColor" content="#da532c" />
				<meta
					name="msapplication-config"
					content="/images/favicon/browserconfig.xml"
				/>
				<meta name="theme-color" content="#ffffff" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
