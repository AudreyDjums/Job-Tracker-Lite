const { z } = require("zod");

const applicationSchema = z.object({
  company: z.string().min(1, "Company is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  status: z.enum(["applied", "interview", "rejected", "offer"]).optional(),
  location: z.string().optional(),
  source: z.string().optional(),
  jobUrl: z.union([z.string().url("Invalid URL"), z.literal("")]).optional(),
  details: z.string().optional(),
  appliedAt: z.string().optional(),
});

const updateApplicationSchema = z.object({
  company: z.string().min(1, "Company is required").optional(),
  jobTitle: z.string().min(1, "Job title is required").optional(),
  status: z.enum(["applied", "interview", "rejected", "offer"]).optional(),
  location: z.string().optional(),
  source: z.string().optional(),
  jobUrl: z.union([z.string().url("Invalid URL"), z.literal("")]).optional(),
  details: z.string().optional(),
  appliedAt: z.string().optional(),
});

module.exports = {
  applicationSchema,
  updateApplicationSchema,
};