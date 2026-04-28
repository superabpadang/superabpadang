'use client';

import { useEffect, useState } from 'react';
import { getSessionUser } from '../../../lib/auth-client';

export default function NewPaymentPage() {
  const [form, setForm] = useState({ invoice_id: '', amount: '', payment_date: '', method: 'cash', notes: '' });

  useEffect(() => {
    const auth = getSessionUser();
    if (!auth) {
      window.location.href = '/login';
    }
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/payments', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ ...form, amount: Number(form.amount) }),
    });
    if (!res.ok) return alert('Gagal simpan pembayaran');
    alert('Pembayaran tersimpan');
    setForm({ invoice_id: '', amount: '', payment_date: '', method: 'cash', notes: '' });
  }

  return (
    <main className="shell">
      <section className="hero">
        <h1>Input Pembayaran</h1>
        <p>Pakai halaman ini saat nagih di pasar agar status piutang langsung update.</p>
      </section>

      <form className="form" onSubmit={submit}>
        <div className="row single">
          <div><label>Invoice ID (UUID)</label><input required value={form.invoice_id} onChange={(e) => setForm({ ...form, invoice_id: e.target.value })} /></div>
        </div>
        <div className="row" style={{ marginTop: 10 }}>
          <div><label>Nominal Bayar</label><input required type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} /></div>
          <div><label>Tanggal Bayar</label><input required type="date" value={form.payment_date} onChange={(e) => setForm({ ...form, payment_date: e.target.value })} /></div>
        </div>
        <div className="row" style={{ marginTop: 10 }}>
          <div>
            <label>Metode</label>
            <select value={form.method} onChange={(e) => setForm({ ...form, method: e.target.value })}>
              <option value="cash">Cash</option>
              <option value="transfer">Transfer</option>
              <option value="qris">QRIS</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div><label>Catatan</label><input value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></div>
        </div>
        <div style={{ marginTop: 12 }}><button type="submit">Simpan Pembayaran</button></div>
      </form>
    </main>
  );
}


