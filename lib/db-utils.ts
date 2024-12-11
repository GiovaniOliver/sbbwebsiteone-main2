// Utility function to parse JSON string arrays
export function parseJsonArray(jsonString: string | null): string[] {
  if (!jsonString) return [];
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error parsing JSON array:', error);
    return [];
  }
}

// Utility function to stringify arrays for storage
export function stringifyArray(array: string[]): string {
  return JSON.stringify(array);
}

// Type guard for string arrays
export function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(item => typeof item === 'string');
}

// Utility function to safely handle user badges
export function parseBadges(badgesJson: string | null): string[] {
  const badges = parseJsonArray(badgesJson);
  return badges.filter(badge => typeof badge === 'string');
}

// Utility function to safely handle product images
export function parseProductImages(imagesJson: string | null): string[] {
  const images = parseJsonArray(imagesJson);
  return images.filter(image => typeof image === 'string' && isValidImageUrl(image));
}

// Basic URL validation for images
function isValidImageUrl(url: string): boolean {
  try {
    new URL(url);
    return url.match(/\.(jpg|jpeg|png|gif|webp)$/i) !== null;
  } catch {
    return false;
  }
} 