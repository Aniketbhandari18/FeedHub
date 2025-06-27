type BaseType = {
  title: string;
  description: string | null;
  createdOn: Date;
}

export type HubProps = BaseType & {
  type: "hub";
  role: "ADMIN" | "MODERATOR" | "MEMBER";
  roleDisplayName: string | null;
  memberCount: number;
  feedbackSpaceCount: number;
}

export type OpenFeedbackProps = BaseType & {
  type: "feedback";
  feedbackCount: number;
}