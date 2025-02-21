import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import React from "react";

const SearchInput = () => {
	return (
		<div className="flex-1 flex items-center justify-center">
			<form className="relative max-w-[720px] w-full">
				<Input placeholder="Search" className="md:text-base placeholder:text-neutral-800 px-14 w-full border-none focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,.3),0_1px_3px_1px_rgba(65,69,73,.15)] bg-[#F0F4F8] rounded-full h-[48px] focus-visible:ring-0 focus-visible:bg-white" />
                {/* <Button>
                    <SearchIcon></SearchIcon>
                </Button> */}
            </form>
		</div>
	);
};

export default SearchInput;
