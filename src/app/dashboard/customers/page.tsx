'use client';

import { useEffect, useState } from 'react';
import { getSessionUser } from '../../../lib/auth-client';

type Customer = {
  id: string;
  code: string;
  name: string;
  market_name: string | null;
  phone: string | null;
};

export default function CustomersPage() {
  const [rows, setRows] = useState<Customer[]>([]);
  const [form, setForm] = useState({ code: '', name: '', market_name: '', phone: '', payment_term_days: '0' });

  async function load() {
    const res = await fetch('/api/customers');
    setRows(await res.json());
  }

  useEffect(() => {
    const auth = getSessionUser();
    if (!auth) {
      window.location.href = '/login';
      return;
    }
    load();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/customers', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (!res.ok) return alert('Gagal simpan pelanggan');
    setForm({ code: '', name: '', market_name: '', phone: '', payment_term_days: '0' });
    await load();
  }

  return (
    <main className="shell">
      <section className="hero">
        <h1>Data Pelanggan Pasar</h1>
        <p>Kelola pelanggan untuk pencatatan tagihan dan penagihan.</p>
      </section>

      <form className="form" onSubmit={submit}>
        <div className="row">
          <div><label>Kode Pelanggan</label><input required placeholder="CUST-0001" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} /></div>
          <div><label>Nama Pelanggan</label><input required placeholder="Nama" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
        </div>
        <div className="row" style={{ marginTop: 10 }}>
          <div><label>Nama Pasar</label><input placeholder="Pasar Induk" value={form.market_name} onChange={(e) => setForm({ ...form, market_name: e.target.value })} /></div>
          <div><label>No. Telepon</label><input placeholder="08xxxx" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
        </div>
        <div style={{ marginTop: 12 }}><button type="submit">Simpan Pelanggan</button></div>
      </form>

      <div className="table-wrap card">
        <table>
          <thead><tr><th>Kode</th><th>Nama</th><th>Pasar</th><th>Telepon</th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}><td>{r.code}</td><td>{r.name}</td><td>{r.market_name ?? '-'}</td><td>{r.phone ?? '-'}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}


