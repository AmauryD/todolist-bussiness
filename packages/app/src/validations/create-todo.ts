import { InferType, object, string } from "yup";

export type todoValidationSchemaType = InferType<typeof todoValidationSchema>;

export const todoValidationSchema = object({
	name: string().required()
});
  