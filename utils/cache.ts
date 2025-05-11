// Cache utility for client-side with expiry (localStorage)
export function setCache(key: string, data: any, ttlMs: number) {
  const record = {
    data,
    expiry: Date.now() + ttlMs,
  };
  localStorage.setItem(key, JSON.stringify(record));
}

export function getCache(key: string) {
  const recordStr = localStorage.getItem(key);
  if (!recordStr) return null;
  try {
    const record = JSON.parse(recordStr);
    if (Date.now() > record.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return record.data;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
}

export function clearNewsCache(sources: string[]) {
  sources.forEach((source) => {
    localStorage.removeItem(`news-${source}`);
  });
}
