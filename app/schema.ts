import { z } from "zod";

export const schema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required").max(65535)
});

export const patchIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255).optional(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(65535)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "Assigned to User Id is required")
    .max(255)
    .optional()
    .nullable(),
  feedback: z.string().min(1, "Feedback").max(255).optional()
});
