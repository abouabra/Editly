"use client";

import React from "react";
import { ClientSideSuspense } from "@liveblocks/react";
import { useInboxNotifications } from "@liveblocks/react/suspense";
import { InboxNotification, InboxNotificationList } from "@liveblocks/react-ui";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BellIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Inbox = () => {
	return (
            <ClientSideSuspense fallback={
                <>
                    <Button 
                        variant={"ghost"}
                        disabled
                        className="relative focus-visible:ring-0 focus-visible:ring-transparent focus:outline-none"
                        size={"icon"}
                    >
                        <BellIcon className="size-5" />
                    </Button>
                    <Separator orientation="vertical" className="h-6" />
                </>
            }>
                <InboxMenu />
            </ClientSideSuspense>
	);
};

export default Inbox;

const InboxMenu = () => {
    const { inboxNotifications } = useInboxNotifications();


	return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button 
                        variant={"ghost"}
                        className="relative focus-visible:ring-0 focus-visible:ring-transparent focus:outline-none"
                        size={"icon"}
                    >
                        <BellIcon className="size-5" />
                        {inboxNotifications.length > 0 && (
                            <span className="absolute -top-1 -right-1 size-4 bg-sky-500 rounded-full text-xs text-white flex items-center justify-center" >
                                {inboxNotifications.length}
                            </span>
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-auto">
                    {inboxNotifications.length > 0 ? (
                        <InboxNotificationList>
                            {inboxNotifications.map((notification) => (
                                <InboxNotification
                                    key={notification.id}
                                    inboxNotification={notification}
                                />
                            ))} 
                        </InboxNotificationList>
                    ) : (
                        <div className="p-2 text-center w-[400px] text-sm text-muted-foreground">
                            No notifications
                        </div>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            <Separator orientation="vertical" className="h-6" />
        </>
    );
};
