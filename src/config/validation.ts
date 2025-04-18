import { z } from 'zod';

const Environment = z.enum(['development', 'production', 'test']);

const envSchema = z.object({
  NODE_ENV: Environment.optional().default('development'),
  PORT: z.coerce.number().optional().default(3000),
  HOST: z.string().optional().default('0.0.0.0'),
  CORS_ORIGINS: z.string().optional().default('*'),
  USERS_SERVICE_URL: z.string().optional().default('http://localhost:3001'),
  USERS_SERVICE_TIMEOUT: z.coerce.number().optional().default(5000),
  AUTH_SERVICE_URL: z.string().optional().default('http://localhost:3001'),
  AUTH_SERVICE_TIMEOUT: z.coerce.number().optional().default(5000),
  PRODUCTS_SERVICE_URL: z.string().optional(),
  PRODUCTS_SERVICE_TIMEOUT: z.coerce.number().optional(),
  JWT_SECRET: z.string().optional().default('supersecret'),
  REDIS_URL: z.string().optional().default('redis://localhost:6379'),
  AWS_REGION: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_S3_BUCKET_NAME: z.string(),
});

export type EnvironmentVariables = z.infer<typeof envSchema>;

export function validate(config: Record<string, unknown>) {
  try {
    return envSchema.parse(config);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(
        'Config validation error:',
        JSON.stringify(error.format(), null, 2),
      );
      throw new Error('Configuration validation failed');
    }
    throw error;
  }
}
