'use client';

import { useEffect, useState } from 'react';
import { getSessionUser } from '../../../lib/auth-client';

type Account = {
  id: string;
  username: string;
  role: 'owner' | 'admin' | 'marketing';
  is_active: boolean;
  created_at: string;
};

export default function AccountsPage() {
  const [role, setRole] = useState<string | null>(null);
  const [rows, setRows] = useState<Account[]>([]);
  const [form, setForm] = useState({ username: '', password: '', role: 'marketing' });

  useEffect(() => {
    const session = getSessionUser();
    if (!session) {
      window.location.href = '/login';
      return;
    }
    if (!['owner', 'admin'].includes(session.role)) {
      alert('Hanya admin/owner yang boleh akses halaman akun');
      window.location.href = '/';
      return;
    }
    setRole(session.role);
    load();
  }, []);

  async function load() {
    const res = await fetch('/api/auth/users');
    setRows(await res.json());
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/auth/users', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ ...form, requesterRole: role }),
    });
    const data = await res.json();
    if (!res.ok) return alert(data.error ?? 'Gagal buat akun');
    alert('Akun berhasil dibuat');
    setForm({ username: '', password: '', role: 'marketing' });
    await load();
  }

  return (
    <main className="shell">
      <section className="hero">
        <h1>Manajemen Akun Login</h1>
        <p>Hanya admin/owner yang bisa membuat akun login operasional.</p>
      </section>

      <section className="form">
        <form className="row" onSubmit={submit}>
          <div>
            <label>Username</label>
            <input required value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
          </div>
          <div>
            <label>Password</label>
            <input required type="password" minLength={6} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>
          <div>
            <label>Role</label>
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              <option value="marketing">marketing</option>
              <option value="admin">admin</option>
              <option value="owner">owner</option>
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'end' }}>
            <button type="submit">Buat Akun</button>
          </div>
        </form>
      </section>

      <div className="table-wrap card">
        <table>
          <thead><tr><th>Username</th><th>Role</th><th>Status</th><th>Dibuat</th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>{r.username}</td>
                <td>{r.role}</td>
                <td>{r.is_active ? 'aktif' : 'nonaktif'}</td>
                <td>{new Date(r.created_at).toLocaleString('id-ID')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
