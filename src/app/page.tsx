 'use client';

import { useState } from 'react';

export default function Home() {
  const [activeProduct, setActiveProduct] = useState<'tahu' | 'cincau'>('tahu');

  return (
    <main className="shell landing modern-home">
      <section className="showcase">
        <aside className="showcase-left">
          <p className="showcase-label">Super AB Padang</p>
          <h1>Tahu Segar & Cincau Berkualitas Untuk Pasar Harian</h1>
          <p>
            Produksi malam hari, distribusi cepat, kualitas stabil untuk mitra pasar tradisional dan usaha kuliner.
          </p>
          <div className="cta-row">
            <a href="#pemesanan"><button className="btn-outline">Cara Pemesanan</button></a>
          </div>
        </aside>

        <div className="showcase-center">
          <button
            type="button"
            className={`product-card ${activeProduct === 'tahu' ? 'active' : ''}`}
            onClick={() => setActiveProduct('tahu')}
          >
            <div className="product-badge">Sejak 1998</div>
            <h3>TAHU SUPER AB</h3>
            <p>Padat, segar, siap distribusi pasar.</p>
          </button>
          <button
            type="button"
            className={`product-card secondary ${activeProduct === 'cincau' ? 'active' : ''}`}
            onClick={() => setActiveProduct('cincau')}
          >
            <div className="product-badge">Sejak 2022</div>
            <h3>CINCAU SUPER AB</h3>
            <p>Tekstur kenyal, cocok minuman & dessert.</p>
          </button>
        </div>

        <nav className="showcase-right">
          <a href="#tentang">Tentang</a>
          <a href="#pemesanan">Pemesanan</a>
          <a href="#lokasi">Lokasi</a>
          <a href="#jam-kerja">Jam Kerja</a>
          <a href="#kontak">Kontak</a>
        </nav>
      </section>

      <section className="card" id="produk-detail">
        {activeProduct === 'tahu' ? (
          <>
            <h3>Informasi Produk: Tahu Super AB</h3>
            <p><strong>Karakter:</strong> Padat, segar, dan stabil untuk distribusi pasar harian.</p>
            <p><strong>Cocok untuk:</strong> Pedagang pasar, warung makan, dan usaha kuliner harian.</p>
            <p><strong>Produksi:</strong> Malam hari agar pagi sudah siap kirim.</p>
            <p><strong>Catatan:</strong> Bisa diskusi jadwal kirim rutin sesuai kebutuhan mitra.</p>
          </>
        ) : (
          <>
            <h3>Informasi Produk: Cincau Super AB</h3>
            <p><strong>Karakter:</strong> Tekstur kenyal, bersih, dan siap pakai.</p>
            <p><strong>Cocok untuk:</strong> Minuman segar, dessert, dan gerai minuman.</p>
            <p><strong>Produksi:</strong> Menyesuaikan ritme pemesanan harian dan event.</p>
            <p><strong>Catatan:</strong> Tersedia untuk pemesanan rutin maupun partai kebutuhan khusus.</p>
          </>
        )}
      </section>

      <section id="tentang" className="split">
        <article className="card">
          <h3>Tentang Usaha Kami</h3>
          <p>
            Super AB adalah UMKM produsen tahu dan cincau yang berfokus pada kualitas bahan baku, ketepatan suplai,
            dan pelayanan mitra pasar secara berkelanjutan.
          </p>
          <div className="metric-grid">
            <div className="metric">
              <strong>1998</strong>
              <span>Mulai Lini Tahu</span>
            </div>
            <div className="metric">
              <strong>2022</strong>
              <span>Mulai Lini Cincau</span>
            </div>
          </div>
        </article>

        <article className="contact-card">
          <h3 id="kontak">Contact Person</h3>
          <p>
            <strong>Telepon/WA:</strong>{' '}
            <a href="tel:+6281289373479">+62 812 8937 3479</a>
          </p>
          <a
            className="wa-link"
            href="https://wa.me/6281289373479?text=Halo%20Super%20AB%2C%20saya%20mau%20tanya%20untuk%20pemesanan%20tahu%20dan%20cincau."
            target="_blank"
            rel="noreferrer"
          >
            <span aria-hidden="true">WA</span>`n            Chat via WhatsApp
          </a>
          <p><strong>Alamat:</strong> Jln. Kampung Jambak No.63, RT1/RW9, Kelurahan Koto Lalang, Kecamatan Lubuk Kilangan, Kota Padang, Sumatera Barat, Indonesia</p>
          <p>
            <strong>Email:</strong>{' '}
            <a href="mailto:superabpadang@gmail.com">superabpadang@gmail.com</a>
          </p>
        </article>
      </section>

      <section id="pemesanan" className="card">
        <h3>Cara Pemesanan</h3>
        <ol className="list-clean">
          <li>Hubungi contact person via WhatsApp/Telepon untuk cek ketersediaan.</li>
          <li>Sampaikan jenis produk (tahu/cincau), jumlah, dan jadwal pengiriman/pengambilan.</li>
          <li>Tim kami konfirmasi pesanan dan estimasi waktu siap kirim.</li>
        </ol>
      </section>

      <section className="grid">
        <article id="lokasi" className="card">
          <h3>Lokasi Pabrik</h3>
          <p>Jln. Kampung Jambak No.63, RT1/RW9, Kelurahan Koto Lalang, Kecamatan Lubuk Kilangan, Kota Padang, Sumatera Barat, Indonesia.</p>
          <div style={{ marginTop: 10, borderRadius: 10, overflow: 'hidden', border: '1px solid #ddd' }}>
            <iframe
              title="Lokasi Pabrik Super AB"
              src="https://www.google.com/maps?q=Jln.%20Kampung%20Jambak%20No.63%2C%20Koto%20Lalang%2C%20Lubuk%20Kilangan%2C%20Padang&output=embed"
              width="100%"
              height="260"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p>
            <a href="https://maps.app.goo.gl/WsxnpBwPbaEGZvvdA" target="_blank" rel="noreferrer">
              Buka Lokasi di Google Maps
            </a>
          </p>
          <p className="notice">Peta tampil langsung di atas, klik link untuk navigasi.</p>
        </article>
        <article id="jam-kerja" className="card">
          <h3>Jam Kerja</h3>
          <p>Setiap hari: 22.00 - 06.00</p>
          <h3 style={{ marginTop: 16 }}>Review di Google Maps</h3>
          <p>Ringkasan review pelanggan:</p>
          <ul className="list-clean">
            <li>Pelayanan ramah dan respons cepat.</li>
            <li>Kualitas tahu segar, cocok untuk jualan harian.</li>
            <li>Distribusi malam ke pagi membantu pedagang pasar.</li>
          </ul>
          <p>
            <a href="https://maps.app.goo.gl/WsxnpBwPbaEGZvvdA" target="_blank" rel="noreferrer">
              Lihat Semua Review di Google Maps
            </a>
          </p>
        </article>
      </section>
    </main>
  );
}


