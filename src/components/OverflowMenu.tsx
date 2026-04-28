'use client';

import { useState } from 'react';

export default function OverflowMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-wrap">
      <button className="dots-btn" onClick={() => setOpen(!open)} aria-label="Menu">
        ...
      </button>
      {open && (
        <div className="menu-panel">
          <a href="/">Home</a>
          <a href="/#kontak">Hubungi Kami</a>
        </div>
      )}
    </div>
  );
}
