# Week 3 Todo CRUD API

## Run the project

```bash
npm install
npm start
```

The server runs at `http://localhost:3002`.

## Endpoints

- `GET /todos` — get all todos
- `GET /todos/active` — get todos that are not completed
- `GET /todos/completed` — get completed todos
- `GET /todos/:id` — get one todo by ID
- `POST /todos` — create a todo; `task` is required
- `PATCH /todos/:id` — update a todo
- `DELETE /todos/:id` — delete a todo

### POST example

```json
{
  "task": "Finish Week 3 assignment",
  "completed": false
}
```
