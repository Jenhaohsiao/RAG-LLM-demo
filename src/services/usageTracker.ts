const STORAGE_KEY = 'rag_demo_usage';
const MAX_CONVERSATIONS = 10;
const LOCK_DURATION_MS = 8 * 60 * 60 * 1000; // 8 hours in milliseconds

interface UsageData {
  count: number;
  lockedUntil: number | null;
}

function getUsageData(): UsageData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored) as UsageData;
      // Check if lock has expired
      if (data.lockedUntil && Date.now() > data.lockedUntil) {
        // Reset after lock expires
        const resetData: UsageData = { count: 0, lockedUntil: null };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(resetData));
        return resetData;
      }
      return data;
    }
  } catch (e) {
    // Silently fail and return default data
  }
  return { count: 0, lockedUntil: null };
}

function setUsageData(data: UsageData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    // Silently fail
  }
}

export function canUseAI(): boolean {
  const data = getUsageData();
  if (data.lockedUntil && Date.now() < data.lockedUntil) {
    return false;
  }
  return data.count < MAX_CONVERSATIONS;
}

export function incrementUsage(): { isLocked: boolean; remaining: number } {
  const data = getUsageData();
  
  // If currently locked, check if lock expired
  if (data.lockedUntil && Date.now() < data.lockedUntil) {
    return { isLocked: true, remaining: 0 };
  }
  
  // Increment count
  data.count += 1;
  
  // Check if limit reached
  if (data.count >= MAX_CONVERSATIONS) {
    data.lockedUntil = Date.now() + LOCK_DURATION_MS;
    setUsageData(data);
    return { isLocked: true, remaining: 0 };
  }
  
  setUsageData(data);
  return { isLocked: false, remaining: MAX_CONVERSATIONS - data.count };
}

export function getRemainingUsage(): number {
  const data = getUsageData();
  if (data.lockedUntil && Date.now() < data.lockedUntil) {
    return 0;
  }
  return Math.max(0, MAX_CONVERSATIONS - data.count);
}

export function getLockExpiry(): Date | null {
  const data = getUsageData();
  if (data.lockedUntil && Date.now() < data.lockedUntil) {
    return new Date(data.lockedUntil);
  }
  return null;
}

export function isLocked(): boolean {
  const data = getUsageData();
  return !!(data.lockedUntil && Date.now() < data.lockedUntil);
}
