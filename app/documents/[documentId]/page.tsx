import React from "react";
import Editor from "./editor";
import ToolBar from "./toolbar";
import NavBar from "./navbar";
import { Room } from "./room";

interface DocumentsPageIdProps {
	params: Promise<{ documentId: string }>;
}

const DocumentsPageId = async ({ params }: DocumentsPageIdProps) => {
	const { documentId } = await params;

	return (
		<Room>
			<div className="min-h-screen bg-[#FAFBFD]">
				<div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden">
					<NavBar />
					<ToolBar />
				</div>
				<div className="pt-[114px] print:pt-0">
					<Editor />
				</div>
			</div>
		</Room>
	);
};

export default DocumentsPageId;
