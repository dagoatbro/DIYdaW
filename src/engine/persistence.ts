export async function saveProject(key: string, data: unknown) {
  localStorage.setItem(key, JSON.stringify(data));
}
export async function loadProject<T>(key: string): Promise<T | null> {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) as T : null;
}
