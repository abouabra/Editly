'use client';

import { cn } from '@/lib/utils';
import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon, BoldIcon, ChevronDownIcon, HighlighterIcon, ImageIcon, ItalicIcon, Link2Icon, ListCollapseIcon, ListIcon, ListOrderedIcon, ListTodoIcon, LucideIcon, MessageSquarePlusIcon, MinusIcon, PlusIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SearchIcon, SpellCheckIcon, UnderlineIcon, Undo2Icon, UploadIcon } from 'lucide-react'
import React, {useState} from 'react'
import { useEditorStore } from "@/app/store/use-editor-store";
import { Separator } from '@/components/ui/separator';
import { type Level } from '@tiptap/extension-heading';
import { type ColorResult, SketchPicker, ChromePicker } from 'react-color';
import { DropdownMenu, DropdownMenuContent,DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from '@/components/ui/dialog';


const  LineHeightButton = () => {
  const { editor } = useEditorStore();

  const LineHeights = [
    { label: "Default", value: "normal" },
    { label: "Single", value: "1" },
    { label: "1.15", value: "1.15" },
    { label: "1.5", value: "1.5" },
    { label: "2", value: "2" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={"h-7 min-w-7 shrink-0 flex flex-col items-center justify-between rounded-sm hover:bg-neutral-200/80 py-0.5 px-1.5 overflow-hidden text-sm"}>
          <ListCollapseIcon className='size-4 h-[20px]' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
        {LineHeights.map(({label, value}) => (
          <DropdownMenuItem 
            key={value}
            onClick={() => editor?.chain().focus().setLineHeight(value).run()}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80 hover:cursor-pointer",
              editor?.getAttributes("paragraph").LineHeight === value && "bg-neutral-200/80"
              )}
          >
            <span className='text-sm'>{label}</span>
          </DropdownMenuItem>
        ))}
        
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const  FontSizeButton = () => {
  const { editor } = useEditorStore();

  const currentFontSize = editor?.getAttributes("textStyle").fontSize
    ? editor?.getAttributes("textStyle").fontSize.replace("px", "")
    : "16";

  const [fontSize, setFontSize] = useState<string>(currentFontSize);
  const [inputValue, setInputValue] = useState<string>(fontSize);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const updateFontSize = (newSize: string) => {
    const size: number = parseInt(newSize);
    if(!isNaN(size) && size > 0) {
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
    if(e.key === "Enter") {
      e.preventDefault();
      updateFontSize(inputValue);
      editor?.commands.focus();
    }
  }

  const increment = () => {
    const size = parseInt(fontSize) + 1;
    updateFontSize(size.toString());
  };

  const decrement = () => {
    const size = parseInt(fontSize) - 1;
    if(size > 0) {
      updateFontSize(size.toString());
    }
  };


  return (
    <div className='flex items-center gap-x-0.5'>
    <button 
      className={"h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"}
      onClick={decrement}
      >
      <MinusIcon className='size-4'/>
    </button>
    {isEditing ? (
      <input 
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleInputKeyDown}
        className={"h-7 w-10 text-sm border border-neutral-400 text-center rounded-sm bg-transparent focus:outline-none focus:ring-0"}
        />
    ):
    (
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
    <button 
      className={"h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"}
      onClick={increment}
      >
      <PlusIcon className='size-4'/>
    </button>
    </div>
  )
}



const  ListButton = () => {
  const { editor } = useEditorStore();

  const lists = [
    {
      label: "Bullet List",
      icon: ListIcon,
      isActive: () => editor?.isActive("bulletList"),
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
    },
    {
      label: "Ordered List",
      icon: ListOrderedIcon,
      isActive: () => editor?.isActive("orderedList"),
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={"h-7 min-w-7 shrink-0 flex flex-col items-center justify-between rounded-sm hover:bg-neutral-200/80 py-0.5 px-1.5 overflow-hidden text-sm"}>
          <ListIcon className='size-4 h-[20px]' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
        {lists.map(({label, icon: Icon, onClick, isActive}) => (
          <DropdownMenuItem 
            key={label}
            onClick={onClick}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80 hover:cursor-pointer",
              isActive() && "bg-neutral-200/80"
              )}
          >
            <Icon className='size-4' />
            <span className='text-sm'>{label}</span>
          </DropdownMenuItem>
        ))}
        
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


const  AlignButton = () => {
  const { editor } = useEditorStore();

  const alignments = [
    { label: "Align Left", value: "left", icon: AlignLeftIcon },
    { label: "Align Center", value: "center", icon: AlignCenterIcon },
    { label: "Align Right", value: "right", icon: AlignRightIcon },
    { label: "Align Justify", value: "justify", icon: AlignJustifyIcon },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={"h-7 min-w-7 shrink-0 flex flex-col items-center justify-between rounded-sm hover:bg-neutral-200/80 py-0.5 px-1.5 overflow-hidden text-sm"}>
          <AlignLeftIcon className='size-4 h-[20px]' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
        {alignments.map(({label, value, icon: Icon}) => (
          <DropdownMenuItem 
            key={value}
            onClick={() => editor?.chain().focus().setTextAlign(value).run()}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80 hover:cursor-pointer",
              editor?.isActive({ textAlign: value }) && "bg-neutral-200/80"
              )}
          >
            <Icon className='size-4' />
            <span className='text-sm'>{label}</span>
          </DropdownMenuItem>
        ))}
        
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


const ImageButton = () => {
  const { editor } = useEditorStore();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const onChange = (src: string) => {
    editor?.chain().focus().setImage({ src }).run();
  }

  const onUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if(file) {
        const imageUrl = URL.createObjectURL(file);
        onChange(imageUrl);
      }
    }

    input.click();
  };

  const handleImageSubmit = () => {
    if(imageUrl) {
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
            <ImageIcon className='size-4 h-[20px]' />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={onUpload} className='hover:cursor-pointer'>
            <UploadIcon className='size-4 h-[20px] mr-2' />
            <span>Upload Image</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDialogOpen(true)} className='hover:cursor-pointer'>
            <SearchIcon className='size-4 h-[20px] mr-2' />
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
            placeholder='Insert Image URL'
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => {
              if(e.key === "Enter") {
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
  )

}

const LinkButton = () => {
  const { editor } = useEditorStore();
  const [value, setValue] = useState<string>("");

  const onChange = (href: string) => {
    editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
    setValue("");
  }

  return (
    <DropdownMenu onOpenChange={(open) => {
      if(open) {
        setValue(editor?.getAttributes("link").href || "");
      }
    }}>
      <DropdownMenuTrigger asChild>
        <button className={"h-7 min-w-7 shrink-0 flex flex-col items-center justify-between rounded-sm hover:bg-neutral-200/80 py-0.5 px-1.5 overflow-hidden text-sm"}>
          <Link2Icon className='size-4 h-[20px]' />
          <div className='h-0.5 w-full' style={{ backgroundColor: value}} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-2.5 flex items-center gap-x-2'>
        <Input 
          placeholder='https://example.com'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button onClick={() => onChange(value)}>
          Apply
        </Button>
        
      </DropdownMenuContent>
    </DropdownMenu>
  )

}

const  HighlihtColorButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("highlight").color || "#FFFFFF";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({color: color.hex}).run();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={"h-7 min-w-7 shrink-0 flex flex-col items-center justify-between rounded-sm hover:bg-neutral-200/80 py-0.5 px-1.5 overflow-hidden text-sm"}>
          <HighlighterIcon className='size-4 h-[20px]' />
          <div className='h-0.5 w-full' style={{ backgroundColor: value}} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-0'>
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const  TextColorButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("textStyle").color || "#000000";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={"h-7 min-w-7 shrink-0 flex flex-col items-center justify-between rounded-sm hover:bg-neutral-200/80 py-0.5 px-1.5 overflow-hidden text-sm"}>
          <span className="p-0 m-0 text-sm">A</span>
          <div className='h-0.5 w-full' style={{ backgroundColor: value}} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-0'>
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

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
        <button className={"h-7 min-w-7 shrink-0 flex  items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"}>
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
      <FontSizeButton />
      {
        sections[1].map((item) => (
          <ToolBarButton key={item.label} {...item} />
        ))
      }
      <TextColorButton />
      <HighlihtColorButton />
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