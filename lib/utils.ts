import { clsx, type ClassValue } from "clsx"
import * as cryptoServer from 'crypto';
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Gets a random UUID.
 * @returns The random UUID.
 */
export function getRandomUUID() {
  if (typeof window === 'undefined') {
    return cryptoServer.randomBytes(16).toString('hex');
  }
  return crypto.randomUUID();
}
