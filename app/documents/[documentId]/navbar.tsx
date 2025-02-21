"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import DocumentInput from "./document-input";

import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "@/components/ui/menubar";
import { BoldIcon, FileIcon, FileJsonIcon, FilePenIcon, FilePlusIcon, FileTextIcon, GlobeIcon, ItalicIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, StrikethroughIcon, TableIcon, TextIcon, TrashIcon, UnderlineIcon, Undo2Icon } from "lucide-react";
import { BsFilePdf } from "react-icons/bs";
import { useEditorStore } from "@/app/store/use-editor-store";

type MenuItem = {
	label: string;
	icon?: React.ComponentType<{ className?: string }>;
	action?: () => void;
	shortcut?: string;
	children?: MenuItem[];
};

type MenuSection = {
	label: string;
	items: (MenuItem | "separator")[];
};

const NavBar = () => {
	const [isMac, setIsMac] = useState(false);
	const { editor } = useEditorStore();

	useEffect(() => {
		setIsMac(navigator.userAgent.includes("Mac"));
	}, []);

	const insertTable = ({ rows, cols }: { rows: number; cols: number }) => {
		editor?.chain().focus().insertTable({ rows, cols, withHeaderRow: false }).run();
	};

	const menuData: MenuSection[] = [
		{
			label: "File",
			items: [
				{
					label: "Save",
					icon: FileIcon,
					children: [
						{ label: "JSON", icon: FileJsonIcon },
						{ label: "HTML", icon: GlobeIcon },
						{ label: "PDF", icon: BsFilePdf },
						{ label: "Text", icon: FileTextIcon },
					],
				},
				{ label: "New Document", icon: FilePlusIcon },
				"separator",
				{ label: "Rename", icon: FilePenIcon },
				{ label: "Remove", icon: TrashIcon },
				"separator",
				{
					label: "Print",
					icon: PrinterIcon,
					shortcut: `${isMac ? "⌘" : "Ctrl"} P`,
					action: () => window.print(),
				},
			],
		},
		{
			label: "Edit",
			items: [
				{
					label: "Undo",
					icon: Undo2Icon,
					shortcut: `${isMac ? "⌘" : "Ctrl"} Z`,
					action: () => editor?.chain().focus().undo().run(),
				},
				{
					label: "Redo",
					icon: Redo2Icon,
					shortcut: `${isMac ? "⇧⌘" : "Ctrl+Shift"} Z`,
					action: () => editor?.chain().focus().redo().run(),
				},
			],
		},
		{
			label: "Insert",
			items: [
				{
					label: "Table",
					icon: TableIcon,
					children: [
						{ label: "1 x 1", action: () => insertTable({ rows: 1, cols: 1 }) },
						{ label: "2 x 2", action: () => insertTable({ rows: 2, cols: 2 }) },
						{ label: "3 x 3", action: () => insertTable({ rows: 3, cols: 3 }) },
						{ label: "4 x 4", action: () => insertTable({ rows: 4, cols: 4 }) },
						{ label: "5 x 5", action: () => insertTable({ rows: 5, cols: 5 }) },
					],
				},
			],
		},
		{
			label: "Format",
			items: [
				{
					label: "Text",
					icon: TextIcon,
					children: [
						{ label: "Bold", icon: BoldIcon, shortcut: `${isMac ? "⌘" : "Ctrl"} B` },
						{ label: "Italic", icon: ItalicIcon, shortcut: `${isMac ? "⌘" : "Ctrl"} I` },
						{ label: "Underline", icon: UnderlineIcon, shortcut: `${isMac ? "⌘" : "Ctrl"} U` },
						{ label: "Strikethrough\u00A0\u00A0", icon: StrikethroughIcon, shortcut: `${isMac ? "⌘" : "Ctrl"} ⇧ S` },
					],
				},
				{
					label: "Clear Formatting",
					icon: RemoveFormattingIcon,
				},
			],
		},
	];

	return (
		<nav className="flex items-center justify-between">
			<div className="flex gap-2 items-center">
				<Link href="/">
					<Image src={"/logo.svg"} alt="Logo" width={36} height={36} />
				</Link>
				<div className="flex flex-col">
					<DocumentInput />
					<div className="flex">
						<Menubar className="border-none bg-transparent shadow-none h-auto p-0">
							{menuData.map((menu, index) => (
								<MenubarMenu key={index}>
									<MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">{menu.label}</MenubarTrigger>
									<MenubarContent className={menu.label === "File" ? "print:hidden" : ""}>
										{menu.items.map((item, i) =>
											item === "separator" ? (
												<MenubarSeparator key={i} />
											) : item.children ? (
												<MenubarSub key={i}>
													<MenubarSubTrigger>
														{item.icon && <item.icon className="size-4 mr-2" />}
														{item.label}
													</MenubarSubTrigger>
													<MenubarSubContent>
														{item.children.map((child, j) => (
															<MenubarItem key={j} onClick={child.action}>
																{child.icon && <child.icon className="size-4 mr-2" />}
																{child.label}
																{child.shortcut && <MenubarShortcut>{child.shortcut}</MenubarShortcut>}
															</MenubarItem>
														))}
													</MenubarSubContent>
												</MenubarSub>
											) : (
												<MenubarItem key={i} onClick={item.action}>
													{item.icon && <item.icon className="size-4 mr-2" />}
													{item.label}
													{item.shortcut && <MenubarShortcut>{item.shortcut}</MenubarShortcut>}
												</MenubarItem>
											)
										)}
									</MenubarContent>
								</MenubarMenu>
							))}
						</Menubar>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
