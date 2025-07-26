import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function calculateScore(correctChoices: number, totalChoices: number, hintsUsed: number): number {
  if (totalChoices === 0) return 0;
  
  const baseScore = (correctChoices / totalChoices) * 100;
  const hintPenalty = hintsUsed * 5; // 5 points deducted per hint
  
  return Math.max(0, Math.round(baseScore - hintPenalty));
}

export function getScoreLevel(score: number): {
  level: string;
  color: string;
  message: string;
} {
  if (score >= 90) {
    return {
      level: "Excellent",
      color: "text-green-600",
      message: "Outstanding fraud awareness!"
    };
  } else if (score >= 75) {
    return {
      level: "Good",
      color: "text-blue-600",
      message: "Good understanding, keep learning!"
    };
  } else if (score >= 60) {
    return {
      level: "Average",
      color: "text-yellow-600",
      message: "Room for improvement exists."
    };
  } else {
    return {
      level: "Needs Improvement",
      color: "text-red-600",
      message: "Consider reviewing the materials."
    };
  }
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function isValidPhoneNumber(phone: string): boolean {
  // Indian phone number validation
  const phoneRegex = /^[+]?[91]?[0-9]{10}$/;
  return phoneRegex.test(phone.replace(/\s|-/g, ''));
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function getTimeOfDay(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  if (hour < 21) return 'evening';
  return 'night';
}

export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  
  return date.toLocaleDateString();
}