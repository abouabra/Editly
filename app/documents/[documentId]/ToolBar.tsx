'use client';

import { cn } from '@/lib/utils';
import { BoldIcon, ChevronDownIcon, ItalicIcon, ListTodoIcon, LucideIcon, MessageSquarePlusIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SpellCheckIcon, UnderlineIcon, Undo2Icon } from 'lucide-react'
import React from 'react'
import { useEditorStore } from "@/app/store/use-editor-store";
import { Separator } from '@/components/ui/separator';
import { type Level } from '@tiptap/extension-heading';

import { DropdownMenu, DropdownMenuContent,DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

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
    for(let level = 0; level < headings.length; level++) {
      if(editor?.isActive("heading", { level })) {
        return headings[level].label;
      }
    }
    return headings[0].label;
  }


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={"h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"}>
          <span className='truncate'>
            {getCurrentHeading()}
          </span> 
          <ChevronDownIcon className='ml-2 size-4 shrink-0' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
        {headings.map(({label, value, fontSize}) => (
          <DropdownMenuItem 
            key={value}
            onClick={() => {
              if(value === 0) {
                editor?.chain().focus().setParagraph().run();
              } else {
                editor?.chain().focus().toggleHeading({ level: value as Level}).run();
              }
            }}
            className={cn(
              "flex items-center gap-x-2 px-2 py-3 rounded-sm hover:bg-neutral-200/80 hover:cursor-pointer",
              (value === 0 && !editor?.isActive("heading")) || editor?.isActive("heading", { level: value }) && "bg-neutral-200/80"
              )}
            style={{fontSize}}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

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
          <span className='truncate'>
            {editor?.getAttributes("textStyle").fontFamily || "Arial"}
          </span> 
          <ChevronDownIcon className='ml-2 size-4 shrink-0' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
        {fonts.map(({label, value}) => (
          <DropdownMenuItem 
            key={value}
            onClick={() => editor?.chain().focus().setFontFamily(value).run()}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80 hover:cursor-pointer",
              editor?.getAttributes("textStyle").fontFamily === value && "bg-neutral-200/80"
              )}
            style={{fontFamily: value}}
          >
            <span className='text-sm'>{label}</span>
          </DropdownMenuItem>
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
      <FontFamilyDropDown />
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      <HeadingDropDown />
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