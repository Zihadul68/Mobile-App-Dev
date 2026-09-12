# StudentDirectory REST API

Week 8 server required by the lab manual.

## Run

```bash
npm install
node index.js
```

The API listens on `http://localhost:3000`.

## Routes

- `GET /students` — list all students; supports `?q=` server-side search.
- `GET /students/:id` — return one student or `404`.
- `POST /students` — create a student; the server assigns the id and returns `201`.
- `PATCH /students/:id` — merge partial updates and return the updated student.
- `DELETE /students/:id` — delete a student and return `204`, or `404` if missing.

The server uses an in-memory array as requested by the Week 8 manual, so data resets when the server process restarts.
