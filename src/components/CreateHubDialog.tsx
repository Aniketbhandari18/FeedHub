"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Dispatch, SetStateAction, useState } from "react";
import { openDialog } from "./dashboard/DashboardController";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useAuth } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

type CreateHubDialog = Dispatch<SetStateAction<openDialog>>;

const CreateHubDialog = ({
  setOpenDialog,
}: {
  setOpenDialog: CreateHubDialog;
}) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const maxTitleLength = 30;
  const maxDescriptionLength = 200;

  const handleCreateHub = async () => {
    if (!title.trim()) {
      toast.error("Title cannot be empty.");
      return;
    }

    if (title.trim().length < 3) {
      toast.error("Title must be at least 3 characters long.");
      return;
    }

    if (title.trim().length > maxTitleLength) {
      toast.error(`Title cannot exceed ${maxTitleLength} characters.`);
      return;
    }

    if (description.trim().length > maxDescriptionLength) {
      toast.error(
        `Description cannot exceed ${maxDescriptionLength} characters.`
      );
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/hubs", {
        method: "POST",
        body: JSON.stringify({ title, description }),
      });

      if (!res.ok) {
        throw new Error("Error creating New Hub");
      }

      const data = await res.json();
      console.log("hub:", data.newHub);

      if (res.ok) {
        toast.success("Hub created successfully");
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      toast.error("Error creating New Hub");
      if (error instanceof Error) {
        console.error(error.message);
      }
    } finally {
      setOpenDialog(null);
    }
  };

  return (
    <Dialog open={true} onOpenChange={() => !isLoading && setOpenDialog(null)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Hub</DialogTitle>
          <DialogDescription>
            Provide a name and description to create a new Hub.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2">
          {/* title */}
          <div>
            <Label htmlFor="title" className="mb-2 text-gray-600">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={maxTitleLength}
            />

            <div className="flex justify-end mt-1 mb-1">
              <p
                className={`text-xs text-gray-500 ${
                  title.length === maxTitleLength && "text-red-500"
                }`}
              >
                {title.length}/{maxTitleLength}
              </p>
            </div>
          </div>

          {/* description */}
          <div>
            <Label htmlFor="description" className="mb-2 text-gray-600">
              Description
              <span className="text-gray-500 text-xs">(Optional)</span>
            </Label>
            <Input
              id="description"
              placeholder="Enter hub description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isLoading}
              maxLength={maxDescriptionLength}
            />

            <div className="flex justify-end mt-1">
              <p
                className={`text-xs text-gray-500 ${
                  description.length === maxDescriptionLength && "text-red-500"
                }`}
              >
                {description.length}/{maxDescriptionLength}
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose disabled={isLoading} asChild>
            <Button variant="outline" disabled={isLoading}>
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleCreateHub} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Hub"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default CreateHubDialog;
