'use client';

import { useEditorStore } from '@/app/store/use-editor-store';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { HighlighterIcon } from 'lucide-react';
import { type ColorResult, SketchPicker } from 'react-color';


const HighlightColorButton = () => {
	const { editor } = useEditorStore();

	const value = editor?.getAttributes("highlight").color || "#FFFFFF";

	const onChange = (color: ColorResult) => {
		editor?.chain().focus().setHighlight({ color: color.hex }).run();
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className={"h-7 min-w-7 shrink-0 flex flex-col items-center justify-between rounded-sm hover:bg-neutral-200/80 py-0.5 px-1.5 overflow-hidden text-sm"}>
					<HighlighterIcon className="size-4 h-[20px]" />
					<div className="h-0.5 w-full" style={{ backgroundColor: value }} />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-0">
				<SketchPicker color={value} onChange={onChange} />
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default HighlightColorButton;