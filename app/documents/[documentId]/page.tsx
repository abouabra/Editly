import React from "react";
import { Id } from "@/convex/_generated/dataModel";
import { auth } from "@clerk/nextjs/server";
import Document from "./document";
import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

interface DocumentsPageIdProps {
	params: Promise<{ documentId: Id<"documents"> }>;
}

const DocumentIdPage = async ({ params }: DocumentsPageIdProps) => {
	const { documentId } = await params;
	const { getToken } = await auth();
	const token = await getToken({ template: "convex" }) ?? undefined;

	if(!token) {
		throw new Error("Unauthorized");
	}

	const preloadedDocument = await preloadQuery(
		api.documents.getDocumentByID,
		{ id: documentId },
		{ token }
	);

	if(!preloadedDocument) {
		throw new Error("Document not found");
	}

	return (
		<Document preloadedDocument={preloadedDocument} />
	);
};

export default DocumentIdPage;