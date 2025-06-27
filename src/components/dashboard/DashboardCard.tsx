import { HubProps, OpenFeedbackProps } from "@/types/HubAndOpenFeedback";
import { Button } from "../ui/button";

type DashboardCardProps = HubProps | OpenFeedbackProps;

const DashboardCard = (props: DashboardCardProps) => {
  let tagClasses: string = "";
  const role = props.type === "hub" ? props.role : null;
  if (role) {
    if (role === "ADMIN") tagClasses = "text-indigo-700 bg-indigo-100";
    else if (role === "MODERATOR") tagClasses = "text-blue-700 bg-blue-100";
    else if (role === "MEMBER") tagClasses = "text-green-700 bg-green-100";
  }

  return (
    <div className="p-4 md:p-6 rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition duration-300 bg-gray-50 w-full">
      {/* Title + Role */}
      <div className="flex flex-col xs:flex-row justify-between md:items-center mb-2 gap-2">
        <h3 className="text-lg xs:text-xl font-semibold text-gray-900">
          {props.title}
        </h3>
        {props.type === "hub" && (
          <span
            className={`w-fit self-start px-3 py-1 text-xs md:text-sm font-medium ${tagClasses} rounded-full`}
          >
            {props.roleDisplayName || props.role}
          </span>
        )}
      </div>

      {/* Description */}
      {props.description && (
        <p className="text-sm text-gray-600 mb-4 leading-5 line-clamp-2">
          {props.description}
        </p>
      )}

      {/* Created Date */}
      <div className="text-sm text-gray-500 mb-1">
        Created on:{" "}
        {props.createdOn.toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </div>

      {/* Stats */}
      {props.type === "hub" ? (
        <div className="flex flex-wrap items-center text-sm text-gray-500 gap-x-6 gap-y-2 mb-4">
          <span>Members: {props.memberCount}</span>
          <span>Feedback Spaces: {props.feedbackSpaceCount}</span>
        </div>
      ) : (
        <span>Feedbacks: {props.feedbackCount}</span>
      )}

      {/* Buttons */}
      <div className="flex flex-col xs:flex-row gap-3 mt-2">
        <Button className="w-full xs:w-auto">
          {props.type === "hub" ? "View Hub" : "View Feedbacks"}
        </Button>
      </div>
    </div>
  );
};

export default DashboardCard;