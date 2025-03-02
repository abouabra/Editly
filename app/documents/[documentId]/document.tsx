"use client";

import React from "react";
import Editor from "./editor";
import ToolBar from "./toolbar";
import { NavBar } from "./navbar";
import { Room } from "./room";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

interface DocumentIdProps {
	preloadedDocument: Preloaded<typeof api.documents.getDocumentByID>;
}

const Document = ({ preloadedDocument }: DocumentIdProps) => {
	const document = usePreloadedQuery(preloadedDocument);

	return (
		<Room>
			<div className="min-h-screen bg-[#FAFBFD]">
				<div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden">
					<NavBar data={document} />
					<ToolBar />
				</div>
				<div className="pt-[114px] print:pt-0">
					<Editor />
				</div>
			</div>
		</Room>
	);
};

export default Document;
