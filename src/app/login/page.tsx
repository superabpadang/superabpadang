'use client';

import { useEffect, useState } from 'react';
import { getSessionUser } from '../../lib/auth-client';

export default function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const existing = getSessionUser();
    if (!existing) return;
    if (existing.role === 'owner' || existing.role === 'admin') {
      window.location.href = '/dashboard/customers';
      return;
    }
    window.location.href = '/dashboard/new-invoice';
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      alert(data.error ?? 'Login gagal');
      return;
    }

    localStorage.setItem('umkm_auth', JSON.stringify(data.user));
    localStorage.setItem('umkm_role', data.user.role);

    if (data.user.role === 'admin' || data.user.role === 'owner') {
      window.location.href = '/dashboard/customers';
      return;
    }
    window.location.href = '/dashboard/new-invoice';
  }

  return (
    <main className="shell">
      <section className="form" style={{ maxWidth: 460, margin: '24px auto' }}>
        <h2 style={{ marginTop: 0 }}>Login</h2>
        <p className="notice">Gunakan akun yang dibuat admin.</p>
        <form onSubmit={submit} className="row single">
          <div>
            <label>Username</label>
            <input
              required
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              placeholder="username"
            />
          </div>
          <div>
            <label>Password</label>
            <input
              required
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="password"
            />
          </div>
          <button type="submit" disabled={loading}>{loading ? 'Memproses...' : 'Masuk'}</button>
        </form>
        <p className="notice">
          Belum punya akun? Hubungi{' '}
          <a href="mailto:superabpadang@gmail.com">admin via email</a>
          {' '}atau{' '}
          <a
            href="https://wa.me/6281289373479?text=Halo%20Admin%20Super%20AB%2C%20saya%20minta%20dibuatkan%20akun%20login."
            target="_blank"
            rel="noreferrer"
          >
            admin via WhatsApp
          </a>.
        </p>
      </section>
    </main>
  );
}
