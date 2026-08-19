# LearnTrace Code Execution Architecture

This document describes the execution pipeline for LearnTrace coding practice.

## Overview
LearnTrace allows users to run code safely using a containerized backend. Code is submitted from the frontend UI and executed within isolated Docker containers on the backend server.

### 1. Frontend Execution Flow
- **Component**: The primary interface is handled in `src/practice.js`.
- **Health Polling**: The frontend continuously polls the backend health endpoint (`/health`) to verify if `execution === 'ready'`. If the backend is unavailable or execution isn't ready, the "Run" button is disabled.
- **Request API**: When the user clicks "Run", a `POST` request is sent to `${BACKEND_URL}/api/execute` containing:
  - `language` (e.g., 'python')
  - `code` (source code string)
  - `input` (standard input string)
  - `profileId` (user ID)
  - `problemId` (current challenge ID)

### 2. Backend Execution Flow
- **Entry Point**: The request hits the Express server (`backend/server.js`), which routes it to `/api/execute` handled by `backend/routes/executeRoutes.js`.
- **Docker Manager**: 
  - On startup, the backend pings the Docker daemon to check availability.
  - It automatically cleans up any stale execution containers left from previous crashes.
  - It verifies and pulls necessary Docker images for supported languages.
  - `executionStatus` is updated to `'ready'` once the environment is fully initialized.
- **Execution Endpoint**: 
  - Validates payload size (50KB limit for code, 10KB limit for input).
  - Matches the requested language against `LANG_CONFIG` to determine the corresponding Docker image and execution command.
  - Spawns an isolated container via `dockerode` to run the code.

### 3. Ports & Proxy
- **Frontend Port**: Typically `5173` (Vite dev server).
- **Backend Port**: `5000` (Express server).
- **Execution Service Port**: The execution service is tightly integrated into the Express server and does not use a separate port. It listens on `5000`.
- **Vite Proxy**: The frontend connects to the backend directly via the `VITE_BACKEND_URL` environment variable or fallbacks to `http://localhost:5000` if running on localhost.

### 4. Docker Usage
- **Requirement**: Docker Desktop MUST be running for execution to work.
- **Images**:
  - `python:3.10-alpine` (Python)
  - `gcc:12` (C, C++)
  - `eclipse-temurin:21-jdk-alpine` (Java)
  - `node:20-alpine` (JavaScript, TypeScript)
  - `golang:1.20-alpine` (Go)
- **Security**: 
  - `Memory`: Capped at 256MB.
  - `CpuQuota`: Limited CPU shares.
  - `NetworkMode`: set to `'none'` (No internet access for executed code).
  - File system isolated within the container.

### 5. Timeout & Error Handling
- **Timeout**: The execution is wrapped in a 10,000ms (10-second) timeout.
- **Process Cleanup**: If the container runs beyond the timeout, it is forcefully stopped (`Time Limit Exceeded`).
- **Output Limit**: Output length is capped at 512KB to prevent memory exhaustion from infinite loops.

### 6. Startup Process (`START_LEARNTRACE.bat`)
1. Checks if Docker is running via `docker info`. If not, attempts to start Docker Desktop and waits.
2. Checks if the Backend (Port 5000) is running. If not, it opens a new terminal and runs `npm run dev` in the `backend` folder.
3. Polls `http://localhost:5000/health` until the backend signals it is ready.
4. Checks if the Frontend (Port 5173) is running. If not, it opens a new terminal and runs `npm run dev`.
5. Opens the browser.

### 7. Health Check
- Endpoint: `GET /health`
- The endpoint returns system state including `docker` and `execution` statuses. The execution service will not accept code until `execution === 'ready'`.
