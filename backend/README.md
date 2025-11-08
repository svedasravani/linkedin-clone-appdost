# Backend - LinkedIn Clone (Express + MongoDB)

## Setup
1. Copy `.env.example` to `.env` and fill `MONGO_URI` and `JWT_SECRET`.
2. Install dependencies: `npm install`
3. Start server: `npm run dev` (requires nodemon) or `npm start`

## Endpoints
- `POST /api/auth/register` { name, email, password } -> { token, user }
- `POST /api/auth/login` { email, password } -> { token, user }
- `GET /api/posts` -> list of posts
- `POST /api/posts` { text } (Authorization: Bearer <token>) -> create post
- `POST /api/posts/:id/like` (Authorization) -> toggle like
- `DELETE /api/posts/:id` (Authorization) -> delete post
