'use client';

import { useEditorStore } from "@/app/store/use-editor-store";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent,DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link2Icon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LinkButton = () => {
	const { editor } = useEditorStore();
	const [value, setValue] = useState<string>("");

	const onChange = (href: string) => {
		editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
		setValue("");
	};

	return (
		<DropdownMenu
			onOpenChange={(open) => {
				if (open) {
					setValue(editor?.getAttributes("link").href || "");
				}
			}}
		>
			<DropdownMenuTrigger asChild>
				<button className={"h-7 min-w-7 shrink-0 flex flex-col items-center justify-between rounded-sm hover:bg-neutral-200/80 py-0.5 px-1.5 overflow-hidden text-sm"}>
					<Link2Icon className="size-4 h-[20px]" />
					<div className="h-0.5 w-full" style={{ backgroundColor: value }} />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-2.5 flex items-center gap-x-2">
				<Input placeholder="https://example.com" value={value} onChange={(e) => setValue(e.target.value)} />
				<Button onClick={() => onChange(value)}>Apply</Button>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default LinkButton;