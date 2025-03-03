'use client';

import { cn } from '@/lib/utils';
import { BoldIcon, ItalicIcon, ListTodoIcon, LucideIcon, MessageSquarePlusIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SpellCheckIcon, UnderlineIcon, Undo2Icon } from 'lucide-react'
import React from 'react'
import { useEditorStore } from "@/app/store/use-editor-store";
import { Separator } from '@/components/ui/separator';
import LineHeightButton from './toolbar/line-height-button';
import FontSizeButton from './toolbar/font-size-button';
import ListButton from './toolbar/list-button';
import AlignButton from './toolbar/align-button';
import ImageButton from './toolbar/image-button';
import LinkButton from './toolbar/link-button';
import HighlightColorButton from './toolbar/highlight-color-button';
import TextColorButton from './toolbar/text-color-button';
import HeadingDropDown from './toolbar/heading-drop-down';
import FontFamilyDropDown from './toolbar/font-family-drop-down';



interface ToolBarButtonProps {
  icon: LucideIcon;
  onClick?: () => void
  isActive?: boolean
}

const ToolBarButton = ({ icon: Icon, onClick, isActive }: ToolBarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
        isActive && "bg-neutral-200/80",
      )}
      >
      <Icon className='size-4' />
      </button>
    )
}


const ToolBar = () => {
  const { editor } = useEditorStore();

  const sections: { 
    label: string; 
    icon: LucideIcon, 
    onClick: () => void, 
    isActive?: boolean 
  }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
      {
        label: "Spell Check",
        icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute("spellcheck", current === "true" ? "false" : "true");
        }
      }
    ],
    [
      {
        label: "Bold",
        icon: BoldIcon,
        isActive: editor?.isActive("bold"),
        onClick: () => editor?.chain().focus().toggleBold().run(),
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        isActive: editor?.isActive("italic"),
        onClick: () => editor?.chain().focus().toggleItalic().run(),
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        isActive: editor?.isActive("underline"),
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
      }
    ],
    [
      {
        label: "Comment",
        icon: MessageSquarePlusIcon,
        onClick: () => editor?.chain().focus().addPendingComment().run(),
        isActive: editor?.isActive("LiveblocksCommentMark")
      },
      {
        label: "List Todo",
        icon: ListTodoIcon,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("taskList")
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      }
    ]
  ]


  return (
    <div className='bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto'>
      {
        sections[0].map((item) => (
          <ToolBarButton key={item.label} {...item} />
        ))
      }
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      <FontFamilyDropDown />
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      <HeadingDropDown />
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      <FontSizeButton />
      {
        sections[1].map((item) => (
          <ToolBarButton key={item.label} {...item} />
        ))
      }
      <TextColorButton />
      <HighlightColorButton />
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />

      <LinkButton />
      <ImageButton />
      <AlignButton />
      <LineHeightButton />
      <ListButton />
      {
        sections[2].map((item) => (
          <ToolBarButton key={item.label} {...item} />
        ))
      }


      </div>
  )
}

export default ToolBar