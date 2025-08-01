export interface ShortenedURL {
  id: string;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  validityPeriod: number; // in minutes
  customShortcode?: string;
  createdAt: Date;
  expiresAt: Date;
  clickCount: number;
  isActive: boolean;
}

export interface URLFormData {
  originalUrl: string;
  validityPeriod: number;
  customShortcode?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  validationErrors?: ValidationError[];
}