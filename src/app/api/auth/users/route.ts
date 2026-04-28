import { NextResponse } from 'next/server';
import { pool } from '../../../../lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  const body = await req.json();
  const requesterRole = String(body.requesterRole ?? '');

  if (!['owner', 'admin'].includes(requesterRole)) {
    return NextResponse.json({ error: 'Hanya admin/owner yang bisa membuat akun' }, { status: 403 });
  }

  const username = String(body.username ?? '').trim().toLowerCase();
  const password = String(body.password ?? '');
  const role = String(body.role ?? 'marketing');

  if (!username || password.length < 6) {
    return NextResponse.json({ error: 'Username wajib dan password minimal 6 karakter' }, { status: 400 });
  }

  if (!['owner', 'admin', 'marketing'].includes(role)) {
    return NextResponse.json({ error: 'Role tidak valid' }, { status: 400 });
  }

  const hash = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      'insert into auth_accounts (username, password_hash, role) values ($1, $2, $3) returning id, username, role, created_at',
      [username, hash, role]
    );
    return NextResponse.json({ ok: true, account: result.rows[0] });
  } catch (err: any) {
    if (String(err?.message ?? '').includes('unique')) {
      return NextResponse.json({ error: 'Username sudah dipakai' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Gagal membuat akun' }, { status: 500 });
  }
}

export async function GET() {
  const result = await pool.query(
    'select id, username, role, is_active, created_at from auth_accounts order by created_at desc limit 200'
  );
  return NextResponse.json(result.rows);
}
