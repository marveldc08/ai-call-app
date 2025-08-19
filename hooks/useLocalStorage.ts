// hooks/useLocalStorageObject.ts
'use client';

import { useState, useEffect } from 'react';

export function useLocalStorageObject<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;

    try {
      const item = window.localStorage.getItem(key);

      // ✅ Only parse if item is a non-empty string
      if (item !== null && item !== "undefined") {
        return JSON.parse(item);
      }

      return initialValue;
    } catch (err) {
      console.error("Failed to parse localStorage item:", err);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      if (value === undefined) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (err) {
      console.error("Failed to save to localStorage:", err);
    }
  }, [key, value]);

  return [value, setValue] as const;
}
