# LearnTrace Code Execution Troubleshooting

This document outlines common issues when the "Code execution is unavailable" error appears and how to resolve them.

## Common Failures

### 1. "Code execution is unavailable" or Backend not running
- **Symptom**: The "Run" button shows an alert and the terminal says execution is unavailable.
- **Cause**: The backend server is not running on port 5000 or the Express server crashed on startup.
- **Fix**: Check the backend terminal for crash logs. Start it manually via `cd backend && npm run dev`. 

### 2. Port Conflict
- **Symptom**: The backend fails to start with `EADDRINUSE`.
- **Cause**: Another service is using port 5000 (often macOS Control Center or another dev project).
- **Fix**: Stop the conflicting service or manually change the backend port in `.env` and `src/practice.js`.

### 3. Docker Unavailable
- **Symptom**: The execution health check says `docker: "unavailable"`.
- **Cause**: Docker Desktop is not running or the backend cannot reach the Docker socket.
- **Fix**: Open Docker Desktop and wait for it to report "Engine running". Restart the backend to ensure it connects properly.

### 4. "Service Unavailable" on Run
- **Symptom**: Code execution returns `Error: Execution service is not ready`.
- **Cause**: The backend is still pulling required Docker images.
- **Fix**: Wait a few moments. This typically happens only on the first startup as large compiler images (e.g. Java, GCC) are downloaded.

### 5. Execution Timeout
- **Symptom**: Execution fails with `Time Limit Exceeded`.
- **Cause**: Infinite loop in user code, or reading from standard input without passing anything in the Input box.
- **Fix**: Fix the code's infinite loop. If reading user input (e.g., `input()` in Python), ensure text is provided in the Input area before running.

### 6. Invalid Code / Compilation Error
- **Symptom**: Output shows "Compilation Error".
- **Cause**: Syntax errors in strongly typed languages like C, C++, or Java.
- **Fix**: Read the compilation error details in the output terminal to fix syntax.

### 7. Startup Script Failure
- **Symptom**: `START_LEARNTRACE.bat` hangs or loops infinitely on "Waiting for Backend to be ready...".
- **Cause**: The backend was started by the batch script but immediately crashed.
- **Fix**: Look at the "LearnTrace Backend" command prompt window. A `SyntaxError` or `ReferenceError` might be causing a crash loop. Address the underlying code issue.
