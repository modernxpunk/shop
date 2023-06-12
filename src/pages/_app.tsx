import { trpc } from "../utils/trpc";
import { AppProps } from "next/app";
import Layout from "src/components/Layout";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<SessionProvider session={pageProps.session}>
			<Layout>
				<Component {...pageProps} />
				<Analytics />
			</Layout>
		</SessionProvider>
	);
};

export default trpc.withTRPC(MyApp);
