# Portfolio Deployment Guide

This project is now set up for decoupled deployment with separate frontend and backend services.

## Architecture

- **Frontend**: React app deployed as a static site (Vercel/Netlify)
- **Backend**: Node.js API server deployed on Render
- **Communication**: Frontend makes API calls to backend via environment variables

## Backend Deployment (Render)

### 1. Deploy Backend
1. Push your code to GitHub
2. Create a new Web Service on Render
3. Connect your GitHub repository
4. Set the following:
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Environment**: Node

### 2. Environment Variables (Backend)
Set these in your Render dashboard:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password
NODE_ENV=production
```

### 3. Get Backend URL
After deployment, note your backend URL (e.g., `https://your-app.onrender.com`)

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set root directory to `client`

2. **Environment Variables**
   - Add `VITE_API_URL` with your backend URL
   - Example: `https://your-app.onrender.com`

3. **Build Settings**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

### Option 2: Netlify

1. **Connect Repository**
   - Go to [netlify.com](https://netlify.com)
   - Import your GitHub repository
   - Set root directory to `client`

2. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Environment Variables**
   - Add `VITE_API_URL` with your backend URL

### Option 3: Render Static Site

1. Create a new Static Site on Render
2. Connect your GitHub repository
3. Set root directory to `client`
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Add environment variable `VITE_API_URL`

## Update CORS Settings

After deploying frontend, update the backend CORS settings in `server/server.js`:

```javascript
const allowedOrigins = [
  'http://localhost:5173',
  'https://your-frontend-domain.vercel.app', // Add your frontend URL
  'https://your-frontend-domain.netlify.app', // Add your frontend URL
];
```

## Testing

1. **Backend Health Check**: Visit `https://your-backend.onrender.com/api/health`
2. **Frontend**: Visit your frontend URL and test all features
3. **API Calls**: Check browser console for any CORS or API errors

## Troubleshooting

### Common Issues

1. **CORS Errors**: Update allowed origins in backend
2. **API 404**: Check if backend URL is correct in frontend environment
3. **Build Failures**: Ensure all dependencies are in package.json

### Environment Variables

- Frontend: `VITE_API_URL=https://your-backend.onrender.com`
- Backend: All MongoDB and JWT secrets

## Local Development

1. **Backend**: `cd server && npm start`
2. **Frontend**: `cd client && npm run dev`
3. Frontend will automatically use `http://localhost:5000` as API URL

## File Structure After Deployment

```
Repository/
├── client/          # Frontend (deployed separately)
│   ├── dist/        # Built files (not in repo)
│   └── ...
├── server/          # Backend (deployed separately)
│   └── ...
└── render.yaml      # Backend deployment config
``` 