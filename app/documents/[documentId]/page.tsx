import React from "react";
import Editor from "./editor";
import ToolBar from "./toolbar";
import NavBar from "./navbar";

interface DocumentsPageIdProps {
	params: Promise<{ documentId: string }>;
}

const DocumentsPageId = async ({ params }: DocumentsPageIdProps) => {
	const { documentId } = await params;

	return (
		<div className="min-h-screen bg-[#FAFBFD]">
			<NavBar />
			<ToolBar />
			<Editor />
		</div>
	);
};

export default DocumentsPageId;
