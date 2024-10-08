import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sum(a: number, b: number) {
  return a + b
}

export const ALL_BLOGS = 'All Blogs'
