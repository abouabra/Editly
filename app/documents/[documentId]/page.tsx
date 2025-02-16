import React from "react";
import Editor from "./editor";
import ToolBar from "./toolbar";

interface DocumentsPageIdProps {
	params: Promise<{ documentId: string }>;
}

const DocumentsPageId = async ({ params }: DocumentsPageIdProps) => {
	const { documentId } = await params;

	return (
		<div className="min-h-screen bg-[#FAFBFD]">
			<ToolBar />
			<Editor />
		</div>
	);
};

export default DocumentsPageId;
