# LinkedIn Clone - AppDost Assignment

This repository contains a simple LinkedIn-like social media web app with:
- User signup & login (JWT)
- Create post (text)
- Public feed showing posts from all users (latest first)
- Like/unlike posts, delete own posts

## Structure
- `backend/` - Express + MongoDB API
- `frontend/` - React app

## Quick local run (development)
1. Backend:
   - cd backend
   - copy `.env.example` to `.env` and fill `MONGO_URI` and `JWT_SECRET`
   - npm install
   - npm run dev

2. Frontend:
   - cd frontend
   - copy `.env.example` to `.env` and (optionally) set REACT_APP_API_URL
   - npm install
   - npm start

## Deploy
- Push both folders to GitHub in one repository.
- Deploy backend on Render / Railway / Heroku (set env vars: MONGO_URI, JWT_SECRET, PORT)
- Deploy frontend on Netlify or Vercel (set REACT_APP_API_URL to backend URL)

## Email to HR (sample)
Subject: Submission - LinkedIn Clone Assignment

Hi Rohit,

I've completed the LinkedIn Clone assignment and deployed it. Here are the links:

- GitHub repo: <YOUR_GITHUB_REPO_URL>
- Frontend (live): <FRONTEND_DEPLOY_URL>
- Backend (live API): <BACKEND_DEPLOY_URL>

Best regards,
<Your Name>
