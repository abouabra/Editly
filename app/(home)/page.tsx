"use client";
import React from "react";
import NavBar from "./navbar";
import TemplatesGallery from "./templates-gallery";
import { usePaginatedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import DocumentsTable from "./documents-table";
import { useSearchParams } from "@/hooks/use-search-params";

const Home = () => {
	const [ search ] = useSearchParams();
	const { results, status, loadMore } = usePaginatedQuery(api.documents.getDocuments, { search }, { initialNumItems: 5 });

	return (
		<div className="min-h-screen flex flex-col">
			<div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
				<NavBar />
			</div>
			<div className="mt-16">
				<TemplatesGallery />
				<DocumentsTable
					documents={results}
					loadMore={loadMore}
					status={status}
					/>
			</div>
		</div>
	);
};

export default Home;
