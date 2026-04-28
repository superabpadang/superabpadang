import './globals.css';
import OverflowMenu from '../components/OverflowMenu';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://superabpadang.com'),
  title: 'Super AB Padang | Tahu & Cincau',
  description: 'Super AB Padang - produsen tahu sejak 1998 dan cincau sejak 2022. Pemesanan, lokasi pabrik, dan kontak resmi.',
  keywords: ['tahu super ab', 'cincau ab', 'super ab padang', 'tahu padang', 'cincau padang'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Super AB Padang | Tahu & Cincau',
    description: 'Produsen tahu dan cincau di Padang. Lihat cara pemesanan, lokasi pabrik, dan kontak resmi.',
    url: 'https://superabpadang.com',
    siteName: 'Super AB Padang',
    locale: 'id_ID',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <header className="topbar">
          <div className="brand">
            <img src="/logo-ab-super.jpg" alt="Logo usaha" />
            <div>
              <h2>Super AB</h2>
              <p>Since 1998 - Sistem Operasional UMKM Tahu & Cincau</p>
            </div>
          </div>
          <OverflowMenu />
        </header>
        {children}
      </body>
    </html>
  );
}

