---
description: How to deploy the portfolio or application to Render.com
---

1. Create a GitHub account if you don't have one and push your code to a new repository.
2. Sign up for a free account on [Render.com](https://render.com).
3. Click **Dashboard** -> **New +** -> **Web Service**.
4. Connect your GitHub account and select your `portfolio` repository.
5. In the configuration:
   - **Name**: Choose a name for your app.
   - **Environment**: `Node`
   - **Region**: Choose the one closest to your location.
   - **Branch**: `main` (or yours)
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Click **Advanced** and add your **Environment Variables** (from your `.env` file):
   - `EMAIL_USER`: Your email
   - `EMAIL_PASS`: Your app password
7. Click **Create Web Service**.
8. Wait for the build to finish. Your app will be live at the provided URL!
