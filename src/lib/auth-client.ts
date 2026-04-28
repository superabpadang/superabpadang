export type SessionUser = {
  id: string;
  username: string;
  role: 'owner' | 'admin' | 'marketing';
};

export function getSessionUser(): SessionUser | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem('umkm_auth');
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as SessionUser;
    if (!parsed?.id || !parsed?.username || !parsed?.role) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function clearSession() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('umkm_auth');
  localStorage.removeItem('umkm_role');
}

