import React from "react";
import Editor from "./Editor";

interface DocumentsPageIdProps {
	params: Promise<{ documentId: string }>;
}

const DocumentsPageId = async ({ params }: DocumentsPageIdProps) => {
	const { documentId } = await params;

	return (
		<div className="min-h-screen bg-[#FAFBFD]">
			<Editor />
		</div>
	);
};

export default DocumentsPageId;
