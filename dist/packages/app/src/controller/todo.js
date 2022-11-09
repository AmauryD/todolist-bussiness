export const createTodo = (controller) => (req, response) => {
    const body = controller.create(req.body);
    response.json(body);
};
