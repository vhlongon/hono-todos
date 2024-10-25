import type { ZodError } from 'zod/lib';

export const formatZodErrors = (result: {
  success: false;
  error: ZodError;
}) => {
  return result.error.issues.map(issue => ({
    path: issue.path.join('.'),
    message: issue.message,
  }));
};
