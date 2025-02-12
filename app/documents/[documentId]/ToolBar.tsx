'use client';

import { cn } from '@/lib/utils';
import { BoldIcon, ChevronDownIcon, ItalicIcon, ListTodoIcon, LucideIcon, MessageSquarePlusIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SpellCheckIcon, UnderlineIcon, Undo2Icon } from 'lucide-react'
import React from 'react'
import { useEditorStore } from "@/app/store/use-editor-store";
import { Separator } from '@/components/ui/separator';

import { DropdownMenu, DropdownMenuContent,DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const FontFamilyButton = () => {
  const { editor } = useEditorStore();

  const fonts = [
    { label: "Arial", value: "Arial" },
    { label: "Arial Black", value: "Arial Black" },
    { label: "Calibri", value: "Calibri" },
    { label: "Cambria", value: "Cambria" },
    { label: "Comic Sans MS", value: "Comic Sans MS" },
    { label: "Consolas", value: "Consolas" },
    { label: "Corsiva", value: "Corsiva" },
    { label: "Courier New", value: "Courier New" },
    { label: "Georgia", value: "Georgia" },
    { label: "Impact", value: "Impact" },
    { label: "Lora", value: "Lora" },
    { label: "Merriweather", value: "Merriweather" },
    { label: "Open Sans", value: "Open Sans" },
    { label: "PT Sans", value: "PT Sans" },
    { label: "PT Serif", value: "PT Serif" },
    { label: "Roboto", value: "Roboto" },
    { label: "Pacifico", value: "Pacifico" },
    { label: "Source Sans Pro", value: "Source Sans Pro" },
    { label: "Spectral", value: "Spectral" },
    { label: "Times New Roman", value: "Times New Roman" },
    { label: "Trebuchet MS", value: "Trebuchet MS" },
    { label: "Ubuntu", value: "Ubuntu" },
    { label: "Verdana", value: "Verdana" },
    { label: "Work Sans", value: "Work Sans" }
  ].sort((a, b) => a.label.localeCompare(b.label));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={"h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"}>
          <span className='truncate'>
            {editor?.getAttributes("textStyle").fontFamily || "Arial"}
          </span>
          <ChevronDownIcon className='ml-2 size-4 shrink-0' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
        {fonts.map(({label, value}) => (
          <button 
            key={value}
            onClick={() => editor?.chain().focus().setFontFamily(value).run()}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              editor?.getAttributes("textStyle").fontFamily === value && "bg-neutral-200/80"
              )}
            style={{fontFamily: value}}
          >
            <span className='text-sm'>{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>

    )
}

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
        onClick: () => console.log("Comment"),
        isActive: false // TODO: Implement isActive
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
      <FontFamilyButton />
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      {/* TODO: Heading */}
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      {/* TODO: Font size */}
      {
        sections[1].map((item) => (
          <ToolBarButton key={item.label} {...item} />
        ))
      }
      {/* TODO: Text color */}
      {/* TODO: Highlight color */}
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />

      {/* TODO: Link */}
      {/* TODO: Image */}
      {/* TODO: Align */}
      {/* TODO: Line height */}
      {/* TODO: List */}
      {
        sections[2].map((item) => (
          <ToolBarButton key={item.label} {...item} />
        ))
      }


      </div>
  )
}

export default ToolBar