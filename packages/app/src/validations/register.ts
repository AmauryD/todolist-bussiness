import { object, string } from "yup";

export const registerSchema = object({
	email: string().email().required(),
	username: string().required()
});
  