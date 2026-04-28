import { NextResponse } from 'next/server';
import { pool } from '../../../lib/db';

export async function POST(req: Request) {
  const payload = await req.json();
  const result = await pool.query(
    `insert into sales_payments (invoice_id, payment_date, amount, method, notes)
     values ($1, $2, $3, $4, $5)
     returning id`,
    [
      payload.invoice_id,
      payload.payment_date,
      Number(payload.amount),
      payload.method,
      payload.notes ?? null,
    ]
  );

  return NextResponse.json({ ok: true, id: result.rows[0].id });
}
