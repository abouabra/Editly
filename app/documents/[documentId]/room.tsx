"use client";

import { ReactNode, use, useEffect, useMemo, useState } from "react";
import {
	LiveblocksProvider,
	RoomProvider,
	ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import FullScreenLoader from "@/components/fullscreen-loader";
import { getUsers, getDocumentsTitles } from "./actions";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";
import { LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT } from "@/constants/margins";


type User = {
	id: string;
	name: string;
	avatar: string;
};

export function Room({ children }: { children: ReactNode }) {
	const params = useParams();
	const [users, setUsers] = useState<User[]>([]);

	const fetchUsers = useMemo(() => async () => {
		try {
			const list = await getUsers();
			setUsers(list);
		} catch (error) {
			toast.error("Failed to fetch users");
		}
	}
	, []);

	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);

    return (
		<LiveblocksProvider
			throttle={16}
			authEndpoint={async () => {
				const endpoint = "/api/liveblocks-auth";
				const room = params.documentId as string;

				const response = await fetch(endpoint, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ room }),
				});

				return await response.json();
			}}
			resolveUsers={({userIds}) => {
				return userIds.map((id) => users.find((user) => user.id === id) ?? undefined);
			}}
			resolveMentionSuggestions={({ text }) => {
				let filteredUsers = users;

				if(text) {
					filteredUsers = users.filter((user) => user.name.toLowerCase().includes(text.toLowerCase()));
				}

				return filteredUsers.map((user) => user.id);
			}}
			resolveRoomsInfo={async ({ roomIds }) => {
				const documents = await getDocumentsTitles(roomIds as Id<"documents">[]);
				return documents.map((document) => ({
					id: document.id,
					name: document.name
				}));
			}}
		>
			<RoomProvider 
				id={params.documentId as string}
				initialStorage={{leftMargin: LEFT_MARGIN_DEFAULT, rightMargin: RIGHT_MARGIN_DEFAULT}}
			>
				<ClientSideSuspense 
					fallback={<FullScreenLoader label="Room Loading ..." />}>
					{children}
				</ClientSideSuspense>
			</RoomProvider>
		</LiveblocksProvider>
	);
}
