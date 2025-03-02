import { BsCloudCheck, BsCloudSlash } from "react-icons/bs";
import React, { useRef, useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useDebounce } from "@/hooks/use-debounce";
import { toast } from "sonner";
import { set } from "date-fns";
import { useStatus } from "@liveblocks/react";
import { LoaderIcon } from "lucide-react";

interface DocumentInputProps {
	title: string;
	id: Id<"documents">;
}

const DocumentInput = ({ title, id}: DocumentInputProps ) => {
	const status = useStatus();
	
	const [value, setValue] = useState(title);
	const [isPending, setIsPending] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const mutate = useMutation(api.documents.updateDocumentByID);
	
	const showLoader = isPending || status === "connecting" || status === "reconnecting";
	const showError = status === "disconnected";

	const debounceUpdate = useDebounce((newValue: string) => {
		if (newValue === title) {
			return;
		}

		setIsPending(true);
		mutate({id, title: newValue})
			.then(() => toast.success("Document updated"))
			.catch(() => toast.error("Something went wrong"))
			.finally(() => setIsPending(false));
	}, 500);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setIsPending(true);
		mutate({id, title: value})
			.then(() => {
				toast.success("Document updated");
				setIsEditing(false);
			})
			.catch(() => toast.error("Something went wrong"))
			.finally(() => setIsPending(false));
	};


	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setValue(newValue);
		debounceUpdate(newValue);
	};

	return (
		<div className="flex items-center gap-2">
			{isEditing ? (
				<form onSubmit={handleSubmit} className="relative w-fit max-w-[50ch]">
					<span className="invisible whitespace-pre px-1.5 text-lg">
						{value || " "}
					</span>
					<input
						ref={inputRef}
						value={value}
						className="absolute inset-0 text-lg text-black px-1.5 bg-transparent truncate"
						onChange={onChange}
						onBlur={() => setIsEditing(false)}
					/>
				</form>
			) : (
				<span 
					className="text-lg px-1.5 cursor-pointer truncate"
					onClick={() => {
						setIsEditing(true);
						setTimeout(() => inputRef.current?.focus(), 0);
					}}
					>
					{title}
				</span>
			)}
			{showError && <BsCloudSlash className="size-4" />}
			{!showError && !showLoader && <BsCloudCheck className="size-4" />}
			{showLoader && <LoaderIcon className="animate-spin size-4  text-muted-foreground" />}
		</div>
	);
};

export default DocumentInput;
