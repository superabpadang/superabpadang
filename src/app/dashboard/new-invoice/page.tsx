'use client';

import { useEffect, useState } from 'react';
import { getSessionUser } from '../../../lib/auth-client';

export default function NewInvoicePage() {
  const [form, setForm] = useState({ invoice_no: '', customer_id: '', due_date: '', grand_total: '' });

  useEffect(() => {
    const auth = getSessionUser();
    if (!auth) {
      window.location.href = '/login';
    }
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const total = Number(form.grand_total);
    const res = await fetch('/api/invoices', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ ...form, subtotal: total, discount_amount: 0, grand_total: total }),
    });
    if (!res.ok) return alert('Gagal simpan tagihan');
    alert('Tagihan tersimpan');
    setForm({ invoice_no: '', customer_id: '', due_date: '', grand_total: '' });
  }

  return (
    <main className="shell">
      <section className="hero">
        <h1>Input Tagihan Baru</h1>
        <p>Catat tagihan penjualan untuk pelanggan pasar.</p>
      </section>

      <form className="form" onSubmit={submit}>
        <div className="row">
          <div><label>No Invoice</label><input required value={form.invoice_no} onChange={(e) => setForm({ ...form, invoice_no: e.target.value })} /></div>
          <div><label>Customer ID (UUID)</label><input required value={form.customer_id} onChange={(e) => setForm({ ...form, customer_id: e.target.value })} /></div>
        </div>
        <div className="row" style={{ marginTop: 10 }}>
          <div><label>Jatuh Tempo</label><input required type="date" value={form.due_date} onChange={(e) => setForm({ ...form, due_date: e.target.value })} /></div>
          <div><label>Total Tagihan</label><input required type="number" value={form.grand_total} onChange={(e) => setForm({ ...form, grand_total: e.target.value })} /></div>
        </div>
        <div style={{ marginTop: 12 }}><button type="submit">Simpan Tagihan</button></div>
        <div className="notice">Tip: ambil Customer ID dari menu Data Pelanggan.</div>
      </form>
    </main>
  );
}


