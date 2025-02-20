'use client';

import { useEditorStore } from "@/app/store/use-editor-store";
import { DropdownMenu, DropdownMenuContent,DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from "@/lib/utils";
import { ListIcon, ListOrderedIcon } from "lucide-react";

const ListButton = () => {
	const { editor } = useEditorStore();

	const lists = [
		{
			label: "Bullet List",
			icon: ListIcon,
			isActive: () => editor?.isActive("bulletList"),
			onClick: () => editor?.chain().focus().toggleBulletList().run(),
		},
		{
			label: "Ordered List",
			icon: ListOrderedIcon,
			isActive: () => editor?.isActive("orderedList"),
			onClick: () => editor?.chain().focus().toggleOrderedList().run(),
		},
	];

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className={"h-7 min-w-7 shrink-0 flex flex-col items-center justify-between rounded-sm hover:bg-neutral-200/80 py-0.5 px-1.5 overflow-hidden text-sm"}>
					<ListIcon className="size-4 h-[20px]" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-1 flex flex-col gap-y-1">
				{lists.map(({ label, icon: Icon, onClick, isActive }) => (
					<DropdownMenuItem key={label} onClick={onClick} className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80 hover:cursor-pointer", isActive() && "bg-neutral-200/80")}>
						<Icon className="size-4" />
						<span className="text-sm">{label}</span>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ListButton;