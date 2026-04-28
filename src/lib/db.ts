import { Pool } from 'pg';

const globalForDb = globalThis as unknown as { pool?: Pool };

export const pool = globalForDb.pool ?? new Pool({
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5433),
  database: process.env.DB_NAME ?? 'umkm_tahu',
  user: process.env.DB_USER ?? 'postgres',
  password: process.env.DB_PASSWORD ?? undefined,
});

if (process.env.NODE_ENV !== 'production') {
  globalForDb.pool = pool;
}
