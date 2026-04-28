import { NextResponse } from 'next/server';
import { pool } from '../../../../lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  const body = await req.json();
  const username = String(body.username ?? '').trim().toLowerCase();
  const password = String(body.password ?? '');

  if (!username || !password) {
    return NextResponse.json({ error: 'Username dan password wajib diisi' }, { status: 400 });
  }

  const result = await pool.query(
    'select id, username, password_hash, role, is_active from auth_accounts where username = $1 limit 1',
    [username]
  );

  if (result.rowCount === 0) {
    return NextResponse.json({ error: 'Akun tidak ditemukan' }, { status: 401 });
  }

  const user = result.rows[0];
  if (!user.is_active) {
    return NextResponse.json({ error: 'Akun nonaktif' }, { status: 403 });
  }

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) {
    return NextResponse.json({ error: 'Password salah' }, { status: 401 });
  }

  return NextResponse.json({
    ok: true,
    user: { id: user.id, username: user.username, role: user.role }
  });
}
