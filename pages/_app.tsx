import Layout from "@/components/Layout";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import RegisterModal from "@/components/modals/RegisterModal";
import LoginModal from "@/components/modals/LoginModal";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import EditModal from "@/components/modals/EditModal";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider session={pageProps.session}>
			<Toaster />
			<EditModal />
			<LoginModal />
			<RegisterModal />
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</SessionProvider>
	);
}
