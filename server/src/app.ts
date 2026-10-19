import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import jobsRoutes from './routes/jobsRoutes';
import { ApiResponse } from '@shared/types';

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Primary Jobs API routes
app.use('/api/jobs', jobsRoutes);

// 404 handler for unknown endpoints
app.use((_req: Request, res: Response<ApiResponse<null>>) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint tidak ditemukan',
    data: null,
  });
});

// Global error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response<ApiResponse<null>>, _next: NextFunction) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    success: false,
    message: 'Terjadi kesalahan internal pada server',
    data: null,
  });
});

export default app;
