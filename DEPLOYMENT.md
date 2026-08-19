# LearnTrace Production Deployment Guide

## Architecture

LearnTrace's Coding Practice engine relies on Docker for secure, isolated code execution. Because of this, the backend **cannot** be deployed to platforms that do not support Docker daemons (e.g., standard Render Web Services, standard Heroku dynos without Docker-in-Docker setup).

For production, you have two main options:

1. **Virtual Private Server (VPS)**: Deploy the backend on a VPS (like DigitalOcean Droplet, AWS EC2, or Hetzner) where you have root access to install and expose the Docker daemon.
2. **Container-as-a-Service**: Deploy the backend as a container to a service that allows accessing the Docker socket (e.g., AWS ECS, Google Cloud Run with specific configurations, or Railway with Docker enabled).

## Environment Variables

### Backend (`backend/.env`)

```env
PORT=5000
FRONTEND_URL=https://your-learntrace-frontend.onrender.com
SUPABASE_URL=https://your-supabase-url.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
GROK_API_KEY=your-grok-api-key
```

### Frontend (`.env` or build configuration)

Currently, the frontend uses a direct `script.js` and `practice.js` setup. Ensure the `BACKEND_URL` in your frontend code points to the production backend URL (e.g. `https://your-learntrace-backend.onrender.com`).

## Docker Setup on VPS

If deploying on a VPS, follow these steps to ensure the execution engine works:

1. Install Docker on your VPS.
2. The Node.js backend must have permission to use the Docker socket (`/var/run/docker.sock`).
   - If running the backend natively (without Docker), add the `node` user to the `docker` group, or run as root (not recommended).
   - If containerizing the backend itself, you must mount the Docker socket: `-v /var/run/docker.sock:/var/run/docker.sock`.

## CORS Configuration

The backend explicitly whitelists the `FRONTEND_URL` via CORS. If the frontend is hosted on a different domain, you **must** set the `FRONTEND_URL` environment variable for the backend, otherwise execution requests will fail with CORS errors.
