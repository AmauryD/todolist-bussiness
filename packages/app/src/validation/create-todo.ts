import { boolean, object, string } from "yup";

export const createTodoSchema = object().shape({
    id: string().required(),
    title: string().required(),
    done: boolean().required()
  });
  