import type { OpenAPIHono, RouteConfig, RouteHandler } from '@hono/zod-openapi';
import type { Env } from 'hono';

export type AppOpenAPI = OpenAPIHono<Env>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, Env>;
