/**
 * Generate a URL-friendly slug from a manga title
 * @param title - The manga title
 * @returns A URL-safe slug
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Truncate text to a maximum length with ellipsis
 * @param text - The text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Format a date string to a readable format
 * @param dateString - ISO date string
 * @returns Formatted date
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Parse chapter number from string (handles decimals)
 * @param chapter - Chapter string (e.g., "1", "1.5", "10")
 * @returns Chapter number
 */
export function parseChapterNumber(chapter: string): number {
  return parseFloat(chapter) || 0;
}

/**
 * Sort chapters by chapter number
 * @param chapters - Array of chapters
 * @returns Sorted array
 */
export function sortChaptersByNumber<T extends { chapter: string }>(
  chapters: T[]
): T[] {
  return [...chapters].sort((a, b) => {
    const numA = parseChapterNumber(a.chapter);
    const numB = parseChapterNumber(b.chapter);
    return numA - numB;
  });
}

/**
 * Check if a string is a valid URL
 * @param str - String to check
 * @returns True if valid URL
 */
export function isValidUrl(str: string): boolean {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}
