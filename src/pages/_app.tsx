import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Layout from "src/components/Layout";
import "../styles/globals.css";

export default function MyApp({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps) {
	return (
		<SessionProvider session={session}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</SessionProvider>
	);
}
