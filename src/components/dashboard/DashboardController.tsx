"use client";

import { ReactNode, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown, Code, Plus, Share2, Users } from "lucide-react";
import CreateHubDialog from "../CreateHubDialog";

type activeTab = "hubs" | "feedbacks";
export type openDialog = "createHub" | "joinHub" | "createOpenFeedback" | null;

const DashboardController = ({
  hubList,
  openFeedbackList,
}: {
  hubList: ReactNode;
  openFeedbackList: ReactNode;
}) => {
  const [activeTab, setActiveTab] = useState<activeTab>("hubs");
  const [openDialog, setOpenDialog] = useState<openDialog>(null);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab("hubs")}
            className={`px-2 xxs:px-3 py-1.5 xs:px-6 sm:py-2 rounded-md text-sm font-medium transition-all duration-300 cursor-pointer ${
              activeTab === "hubs"
                ? "bg-gray-100 text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Your Hubs
          </button>
          <button
            onClick={() => setActiveTab("feedbacks")}
            className={`px-2 xxs:px-3 py-1.5 xs:px-6 sm:py-2 rounded-md text-sm font-medium transition-all duration-300 cursor-pointer ${
              activeTab === "feedbacks"
                ? "bg-gray-100 text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Open Feedbacks
          </button>
        </div>

        {/* Create New Button */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="px-1">
              <Plus />
              <span className="hidden xs:block">Create New</span>
              <ChevronDown className="xs:hidden" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-52 mt-1" align="end">
            <DropdownMenuItem onSelect={() => setOpenDialog("createHub")}>
              {/* Create New Hub Button */}
              <div className="flex items-center mb-0.5 gap-x-2 cursor-pointer">
                <Users className="text-gray-600" />
                <span className="font-semibold">Create New Hub</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setOpenDialog("joinHub")}>
              {/* Join Hub Button */}
              <div className="flex items-center mb-0.5 gap-x-2 cursor-pointer">
                <Code className="text-gray-600" />
                <span className="font-semibold">Join Hub</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setOpenDialog("createOpenFeedback")}>
              {/* Create Open Feedback Button */}
              <div className="flex items-center gap-x-2 cursor-pointer">
                <Share2 className="text-gray-600" />
                <span className="font-semibold">Create Open Feedback</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* List */}
      <div>{activeTab === "hubs" ? hubList : openFeedbackList}</div>

      {/* Dialogs */}
      { openDialog === "createHub" && <CreateHubDialog setOpenDialog={setOpenDialog} /> }
    </div>
  );
};
export default DashboardController;
