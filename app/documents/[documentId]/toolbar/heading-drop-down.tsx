'use client';

import { useEditorStore } from "@/app/store/use-editor-store";
import { DropdownMenu, DropdownMenuContent,DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from "@/lib/utils";
import { type Level } from "@tiptap/extension-heading";
import { ChevronDownIcon } from "lucide-react";


const HeadingDropDown = () => {
	const { editor } = useEditorStore();

	const headings = [
		{
			label: "Normal text",
			value: 0,
			fontSize: "1rem",
		},
		{
			label: "Heading 1",
			value: 1,
			fontSize: "2.25rem",
		},
		{
			label: "Heading 2",
			value: 2,
			fontSize: "1.75rem",
		},
		{
			label: "Heading 3",
			value: 3,
			fontSize: "1.5rem",
		},
		{
			label: "Heading 4",
			value: 4,
			fontSize: "1.25rem",
		},
		{
			label: "Heading 5",
			value: 5,
			fontSize: "1.1rem",
		},
		{
			label: "Heading 6",
			value: 6,
			fontSize: "1rem",
		},
	];

	const getCurrentHeading = () => {
		for (let level = 0; level < headings.length; level++) {
			if (editor?.isActive("heading", { level })) {
				return headings[level].label;
			}
		}
		return headings[0].label;
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className={"h-7 min-w-7 shrink-0 flex  items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"}>
					<span className="truncate">{getCurrentHeading()}</span>
					<ChevronDownIcon className="ml-2 size-4 shrink-0" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-1 flex flex-col gap-y-1">
				{headings.map(({ label, value, fontSize }) => (
					<DropdownMenuItem
						key={value}
						onClick={() => {
							if (value === 0) {
								editor?.chain().focus().setParagraph().run();
							} else {
								editor
									?.chain()
									.focus()
									.toggleHeading({ level: value as Level })
									.run();
							}
						}}
						className={cn("flex items-center gap-x-2 px-2 py-3 rounded-sm hover:bg-neutral-200/80 hover:cursor-pointer", (value === 0 && !editor?.isActive("heading")) || (editor?.isActive("heading", { level: value }) && "bg-neutral-200/80"))}
						style={{ fontSize: fontSize }}
					>
						{label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default HeadingDropDown;