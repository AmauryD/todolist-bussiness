import { InferType, object, string } from "yup";

export type LoginValidationSchemaType = InferType<typeof loginSchema>;

export const loginSchema = object({
	email: string().email().required(),
	password: string().required()
});
  