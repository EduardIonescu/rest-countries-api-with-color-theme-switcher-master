import Navbar from "./navbar/navbar";
import Head from "next/head";

export default function Layout({ children }) {
	return (
		<>
			<Head>
				<title>Rest Countries API</title>
				<meta name="description" content="Rest Countries Api" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
			</Head>
			<Navbar />
			<main className="w-full h-full py-10 px-20 bg-veryLightGray">
				{children}
			</main>
		</>
	);
}
