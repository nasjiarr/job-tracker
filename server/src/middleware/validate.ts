import { Request, Response, NextFunction } from 'express';
import { ZodTypeAny, ZodError } from 'zod';
import { ApiResponse } from '@shared/types';

export const validateBody = <T>(schema: ZodTypeAny) => {
  return (req: Request, res: Response<ApiResponse<null>>, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const err = result.error as ZodError;
      const errors: Record<string, string[]> = {};
      for (const issue of err.issues) {
        const key = issue.path.join('.') || 'root';
        if (!errors[key]) {
          errors[key] = [];
        }
        errors[key].push(issue.message);
      }
      res.status(400).json({
        success: false,
        message: 'Validasi data masukan gagal',
        data: null,
        errors,
      });
      return;
    }
    req.body = result.data as T;
    next();
  };
};

export const validateQuery = <T>(schema: ZodTypeAny) => {
  return (req: Request, res: Response<ApiResponse<null>>, next: NextFunction): void => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
      const err = result.error as ZodError;
      const errors: Record<string, string[]> = {};
      for (const issue of err.issues) {
        const key = issue.path.join('.') || 'root';
        if (!errors[key]) {
          errors[key] = [];
        }
        errors[key].push(issue.message);
      }
      res.status(400).json({
        success: false,
        message: 'Parameter query pencarian tidak valid',
        data: null,
        errors,
      });
      return;
    }
    req.query = result.data as Record<string, string>;
    next();
  };
};
