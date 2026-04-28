import { NextResponse } from 'next/server';
import { pool } from '../../../lib/db';

export async function POST(req: Request) {
  const payload = await req.json();
  const result = await pool.query(
    `insert into sales_invoices
      (invoice_no, invoice_date, customer_id, due_date, subtotal, discount_amount, grand_total, status)
     values
      ($1, current_date, $2, $3, $4, $5, $6, 'posted')
     returning id`,
    [
      payload.invoice_no,
      payload.customer_id,
      payload.due_date,
      Number(payload.subtotal ?? 0),
      Number(payload.discount_amount ?? 0),
      Number(payload.grand_total ?? 0),
    ]
  );

  return NextResponse.json({ ok: true, id: result.rows[0].id });
}
