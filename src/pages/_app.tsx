import { trpc } from "../utils/trpc";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Layout from "src/components/Layout";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<SessionProvider session={pageProps.session}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</SessionProvider>
	);
};

export default trpc.withTRPC(MyApp);
