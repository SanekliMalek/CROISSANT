import { spawn } from 'node:child_process';

const backend = spawn('npm', ['--prefix', 'backend', 'run', 'start:prod'], {
  stdio: 'inherit',
  env: { ...process.env, PORT: process.env.BACKEND_PORT ?? '3001' },
});

const frontend = spawn('npm', ['--prefix', 'frontend', 'run', 'start'], {
  stdio: 'inherit',
  env: { ...process.env },
});

const shutdown = () => {
  backend.kill('SIGTERM');
  frontend.kill('SIGTERM');
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

backend.on('exit', (code, signal) => {
  if (signal || code !== 0) {
    frontend.kill('SIGTERM');
    process.exit(code ?? 1);
  }
});

frontend.on('exit', (code, signal) => {
  if (signal || code !== 0) {
    backend.kill('SIGTERM');
    process.exit(code ?? 1);
  }
});