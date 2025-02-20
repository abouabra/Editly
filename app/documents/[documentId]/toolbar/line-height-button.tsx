'use client';

import { useEditorStore } from "@/app/store/use-editor-store";
import { DropdownMenu, DropdownMenuContent,DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from "@/lib/utils";
import { ListCollapseIcon } from "lucide-react";


const LineHeightButton = () => {
	const { editor } = useEditorStore();

	const LineHeights = [
		{ label: "Default", value: "normal" },
		{ label: "Single", value: "1" },
		{ label: "1.15", value: "1.15" },
		{ label: "1.5", value: "1.5" },
		{ label: "2", value: "2" },
	];

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className={"h-7 min-w-7 shrink-0 flex flex-col items-center justify-between rounded-sm hover:bg-neutral-200/80 py-0.5 px-1.5 overflow-hidden text-sm"}>
					<ListCollapseIcon className="size-4 h-[20px]" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-1 flex flex-col gap-y-1">
				{LineHeights.map(({ label, value }) => (
					<DropdownMenuItem
						key={value}
						onClick={() => editor?.chain().focus().setLineHeight(value).run()}
						className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80 hover:cursor-pointer", editor?.getAttributes("paragraph").LineHeight === value && "bg-neutral-200/80")}
					>
						<span className="text-sm">{label}</span>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default LineHeightButton;
