import { z } from "zod";

export const inboxSchema = z.object({
  agentId: z.string({ required_error: "Agent id is required" }),
  propertyId: z.string({ required_error: "PropertyId is required" }),
  fullName: z.string({ required_error: "Fullname is required" }),
  email: z
    .string({ required_error: "Email address is required" })
    .email("Invalid email format"),
  phone: z.string({ required_error: "Phone is required" }),
  comment: z.string({ required_error: "Comment is required" }),
  isRead: z.boolean().default(false),
});

export type InboxType = z.infer<typeof inboxSchema>;
export type InboxTypeWithId = InboxType & {
  _id: string;
  createdAt: string;
  updatedAt: string;
  attachments?: string[];
};
