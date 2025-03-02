"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Image from '@tiptap/extension-image'
import ImageResize from 'tiptap-extension-resize-image';
import Underline from '@tiptap/extension-underline'
import FontFamily from '@tiptap/extension-font-family'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Strike from '@tiptap/extension-strike'
import { useLiveblocksExtension } from "@liveblocks/react-tiptap";
import { useEditorStore } from "@/app/store/use-editor-store";
import { LineHeight } from "@/app/extensions/line-height";
import { FontSize } from "@/app/extensions/font-size";
import Ruler from "./ruler";
import { Threads } from "./threads";
import { useStorage } from "@liveblocks/react";
import { LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT } from "@/constants/margins";

interface EditorProps {
	initialContent?: string | undefined;
}

const Editor = ({ initialContent } : EditorProps) => {
	const leftMargin = useStorage((root) => root.leftMargin) ?? LEFT_MARGIN_DEFAULT;
	const rightMargin = useStorage((root) => root.rightMargin) ?? RIGHT_MARGIN_DEFAULT;

	const { setEditor } = useEditorStore();
	const liveblocks = useLiveblocksExtension({
		initialContent,
		offlineSupport_experimental: true,
	});
	const editor = useEditor({
		immediatelyRender: false,
		onCreate({ editor }) {
			setEditor(editor);
		},
		onDestroy() {
			setEditor(null);
		},
		onUpdate({ editor }) {
			setEditor(editor);
		},
		onSelectionUpdate({editor}) {
			setEditor(editor);
		},
		onTransaction({ editor }) {
			setEditor(editor);
		},
		onFocus({ editor }) {
			setEditor(editor);
		},
		onBlur({ editor }) {
			setEditor(editor);
		},
		onContentError({ editor }) {
			setEditor(editor);
		},
		editorProps: {
			attributes: {
				style: `padding-left: ${leftMargin}px; padding-right: ${rightMargin}px;`,
				class: "focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text",
			},
		},
		extensions: [
			liveblocks,
			StarterKit.configure({
				history: false,
			}),
			FontSize,
			Color,
			Strike,
			LineHeight.configure({
				types: ['heading', 'paragraph'],
				defaultLineHeight: 'normal',
			}),
			TextAlign.configure({
				types: ['heading', 'paragraph'],
			}),
			Highlight.configure({
				multicolor: true,
			}),
			Link.configure({
				openOnClick: true,
				autolink: true,
				defaultProtocol: 'https',
			}),
			Underline,
			FontFamily,
			TextStyle,
			TaskItem.configure({
				nested: true,
			}),
			TaskList,
			Table,
			TableRow,
			TableHeader,
			TableCell,
			Image,
			ImageResize,
		],
		content: `
		Hey there! 👋
      `,
	});

	return (
		<div className="size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible">
			<Ruler />
			<div className="min-w-full flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
				<EditorContent editor={editor} />
				<Threads editor={editor} />
			</div>
		</div>
	);
};

export default Editor;
