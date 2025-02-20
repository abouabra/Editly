'use client';

import { useEditorStore } from "@/app/store/use-editor-store";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";


const FontSizeButton = () => {
	const { editor } = useEditorStore();
	const currentFontSize = editor?.getAttributes("textStyle").fontSize ? editor?.getAttributes("textStyle").fontSize.replace("px", "") : "16";

	const [fontSize, setFontSize] = useState<string>(currentFontSize);
	const [inputValue, setInputValue] = useState<string>(fontSize);
	const [isEditing, setIsEditing] = useState<boolean>(false);

	const updateFontSize = (newSize: string) => {
		const size: number = parseInt(newSize);
		if (!isNaN(size) && size > 0) {
			editor?.chain().focus().setFontSize(`${size}px`).run();
			setFontSize(newSize);
			setInputValue(newSize);
			setIsEditing(false);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const handleInputBlur = () => {
		updateFontSize(inputValue);
	};

	const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			updateFontSize(inputValue);
			editor?.commands.focus();
		}
	};

	const increment = () => {
		const size = parseInt(fontSize) + 1;
		updateFontSize(size.toString());
	};

	const decrement = () => {
		const size = parseInt(fontSize) - 1;
		if (size > 0) {
			updateFontSize(size.toString());
		}
	};

	return (
		<div className="flex items-center gap-x-0.5">
			<button className={"h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"} onClick={decrement}>
				<MinusIcon className="size-4" />
			</button>
			{isEditing ? (
				<input type="text" value={inputValue} onChange={handleInputChange} onBlur={handleInputBlur} onKeyDown={handleInputKeyDown} className={"h-7 w-10 text-sm border border-neutral-400 text-center rounded-sm bg-transparent focus:outline-none focus:ring-0"} />
			) : (
				<button
					className={"h-7 w-10 text-sm border border-neutral-400 text-center rounded-sm bg-transparent cursor-text"}
					onClick={() => {
						setIsEditing(true);
						setFontSize(currentFontSize);
					}}
				>
					{currentFontSize}
				</button>
			)}
			<button className={"h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"} onClick={increment}>
				<PlusIcon className="size-4" />
			</button>
		</div>
	);
};

export default FontSizeButton;
