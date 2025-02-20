'use client';

import { useEditorStore } from '@/app/store/use-editor-store';
import { DropdownMenu, DropdownMenuContent,DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { ChevronDownIcon } from 'lucide-react';

const FontFamilyDropDown = () => {
	const { editor } = useEditorStore();

	const fonts = [
		{ label: "Arial", value: "Arial" },
		{ label: "Arial Black", value: "Arial Black" },
		{ label: "Comic Sans MS", value: "Comic Sans MS" },
		{ label: "Courier New", value: "Courier New" },
		{ label: "Impact", value: "Impact" },
		{ label: "Times New Roman", value: "Times New Roman" },
		{ label: "Trebuchet MS", value: "Trebuchet MS" },
		{ label: "Verdana", value: "Verdana" },
	].sort((a, b) => a.label.localeCompare(b.label));

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className={"h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"}>
					<span className="truncate">{editor?.getAttributes("textStyle").fontFamily || "Arial"}</span>
					<ChevronDownIcon className="ml-2 size-4 shrink-0" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-1 flex flex-col gap-y-1">
				{fonts.map(({ label, value }) => (
					<DropdownMenuItem
						key={value}
						onClick={() => editor?.chain().focus().setFontFamily(value).run()}
						className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80 hover:cursor-pointer", editor?.getAttributes("textStyle").fontFamily === value && "bg-neutral-200/80")}
						style={{ fontFamily: value }}
					>
						<span className="text-sm">{label}</span>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default FontFamilyDropDown;