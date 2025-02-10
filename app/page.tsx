import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Home = () => {
	return (
		<div className="w-screen h-screen flex items-center justify-center flex-col gap-4">
			<Button>
				<Link href="/documents/123">Go To dummy document</Link>
			</Button>
			<div>Home</div>
		</div>
	);
};

export default Home;
