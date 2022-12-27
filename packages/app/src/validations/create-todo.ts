import { object, string } from "yup";

export const todoValidationSchema = object({
	name: string().required()
});
  