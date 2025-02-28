"use client";
import React, { useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const templates = [
	{
		id: "blank",
		label: "Blank Document",
		imageUrl: "/templates/blank-document.svg",
	}, {
    id: "software-proposal",
    label: "Software Proposal",
		imageUrl: "/templates/software-proposal.svg",
  }, {
    id: "project-proposal",
    label: "Project Proposal",
    imageUrl: "/templates/project-proposal.svg",
  }, {
    id: "business-letter",
    label: "Business Letter",
    imageUrl: "/templates/business-letter.svg",
  }, {
    id: "resume",
    label: "Resume",
    imageUrl: "/templates/resume.svg",
  }, {
    id: "cover-letter",
    label: "Cover Letter",
    imageUrl: "/templates/cover-letter.svg",
  }, {
    id: "letter",
    label: "Letter",
    imageUrl: "/templates/letter.svg",
  }
];

const TemplatesGallery = () => {
	const router = useRouter();
	const create = useMutation(api.documents.createDocument);
	const [isCreating, setIsCreating] = useState(false);

	const onTemplateClick = (title: string, initialContent: string) => {
		setIsCreating(true);
		create({ title, initialContent })
			.then((documentId) => {
				router.push(`/documents/${documentId}`);
			})
			.finally(() => {
				setIsCreating(false);
			});
	};



	return (
		<div className="bg-[#F1F3F4]">
			<div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-y-4">
				<h3 className="font-medium">Start a new document from a template</h3>
				<Carousel>
					<CarouselContent className="-ml-4">
						{templates.map((template) => (
							<CarouselItem key={template.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.285714%] pl-4">
								<div className={cn("aspect-[3/4] flex flex-col gap-y-2.5", isCreating && "pointer-events-none opacity-50")}>
									<button
										disabled={isCreating}
										// TODO: Proper Initial Content
										onClick={() => onTemplateClick(template.label, "")}
										style={{
											backgroundImage: `url(${template.imageUrl})`,
											backgroundSize: "cover",
											backgroundPosition: "center",
											backgroundRepeat: "no-repeat",
										}}
										className="size-full hover:border-blue-500 rounded-sm border hover:bg-blue-50 transition flex flex-col items-center justify-center gap-y-4 bg-white">
                  					</button>
									<p
										className="text-sm font-medium truncate">
										{template.label}
									</p>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
				</Carousel>
			</div>
		</div>
	);
};

export default TemplatesGallery;
