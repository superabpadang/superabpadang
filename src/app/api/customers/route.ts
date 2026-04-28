import { NextResponse } from 'next/server';
import { pool } from '../../../lib/db';

export async function GET() {
  const result = await pool.query(
    'select id, code, name, market_name, phone from customers order by created_at desc limit 100'
  );
  return NextResponse.json(result.rows);
}

export async function POST(req: Request) {
  const body = await req.json();
  const result = await pool.query(
    `insert into customers (code, name, market_name, phone, payment_term_days)
     values ($1, $2, $3, $4, $5)
     returning id`,
    [body.code, body.name, body.market_name ?? null, body.phone ?? null, Number(body.payment_term_days ?? 0)]
  );
  return NextResponse.json({ ok: true, id: result.rows[0].id });
}
