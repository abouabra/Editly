'use client';

import { useEditorStore } from "@/app/store/use-editor-store";
import { useState } from "react";
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from '@/components/ui/dialog';
import { ImageIcon, SearchIcon, UploadIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ImageButton = () => {
	const { editor } = useEditorStore();
	const [imageUrl, setImageUrl] = useState<string>("");
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

	const onChange = (src: string) => {
		editor?.chain().focus().setImage({ src }).run();
	};

	const onUpload = () => {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = "image/*";

		input.onchange = (e) => {
			const file = (e.target as HTMLInputElement).files?.[0];
			if (file) {
				const imageUrl = URL.createObjectURL(file);
				onChange(imageUrl);
			}
		};

		input.click();
	};

	const handleImageSubmit = () => {
		if (imageUrl) {
			onChange(imageUrl);
			setImageUrl("");
			setIsDialogOpen(false);
		}
	};

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button className={"h-7 min-w-7 shrink-0 flex flex-col items-center justify-between rounded-sm hover:bg-neutral-200/80 py-0.5 px-1.5 overflow-hidden text-sm"}>
						<ImageIcon className="size-4 h-[20px]" />
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem onClick={onUpload} className="hover:cursor-pointer">
						<UploadIcon className="size-4 h-[20px] mr-2" />
						<span>Upload Image</span>
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setIsDialogOpen(true)} className="hover:cursor-pointer">
						<SearchIcon className="size-4 h-[20px] mr-2" />
						<span>Insert Link</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Insert Image</DialogTitle>
					</DialogHeader>
					<Input
						placeholder="Insert Image URL"
						value={imageUrl}
						onChange={(e) => setImageUrl(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								handleImageSubmit();
							}
						}}
					/>
					<DialogFooter>
						<Button onClick={handleImageSubmit}>Insert</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default ImageButton;