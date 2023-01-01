import { InferType, object, string } from "yup";

export type RegisterValidationSchemaType = InferType<typeof registerSchema>;

export const registerSchema = object({
	email: string().email().required(),
	username: string().required()
});
  