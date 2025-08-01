import { v4 as uuidv4 } from 'uuid';
import { ShortenedURL, URLFormData, APIResponse, ValidationError } from '../types';

class URLService {
  private urls: ShortenedURL[] = [];
  private readonly MAX_CONCURRENT_URLS = 5;

  // Simulate API delay
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Generate a random short code
  private generateShortCode(): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  // Validate URL format
  private isValidURL(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  // Validate custom shortcode
  private isValidShortcode(shortcode: string): boolean {
    const regex = /^[a-zA-Z0-9]{3,20}$/;
    return regex.test(shortcode);
  }

  // Check if shortcode is unique
  private isShortcodeUnique(shortcode: string): boolean {
    return !this.urls.some(url => url.shortCode === shortcode && url.isActive);
  }

  // Validate form data
  private validateURLData(data: URLFormData): ValidationError[] {
    const errors: ValidationError[] = [];

    if (!data.originalUrl.trim()) {
      errors.push({ field: 'originalUrl', message: 'URL is required' });
    } else if (!this.isValidURL(data.originalUrl)) {
      errors.push({ field: 'originalUrl', message: 'Please enter a valid URL' });
    }

    if (data.validityPeriod < 1 || data.validityPeriod > 1440) {
      errors.push({ field: 'validityPeriod', message: 'Validity period must be between 1 and 1440 minutes' });
    }

    if (data.customShortcode) {
      if (!this.isValidShortcode(data.customShortcode)) {
        errors.push({ 
          field: 'customShortcode', 
          message: 'Custom shortcode must be 3-20 characters long and contain only letters and numbers' 
        });
      } else if (!this.isShortcodeUnique(data.customShortcode)) {
        errors.push({ field: 'customShortcode', message: 'This shortcode is already taken' });
      }
    }

    return errors;
  }

  // Get active URLs count
  private getActiveURLsCount(): number {
    return this.urls.filter(url => url.isActive).length;
  }

  // Clean up expired URLs
  private cleanupExpiredURLs(): void {
    const now = new Date();
    this.urls.forEach(url => {
      if (url.isActive && url.expiresAt <= now) {
        url.isActive = false;
      }
    });
  }

  // Shorten URL
  async shortenURL(data: URLFormData): Promise<APIResponse<ShortenedURL>> {
    await this.delay(500); // Simulate API call

    this.cleanupExpiredURLs();

    // Validate input
    const validationErrors = this.validateURLData(data);
    if (validationErrors.length > 0) {
      return {
        success: false,
        validationErrors
      };
    }

    // Check concurrent limit
    if (this.getActiveURLsCount() >= this.MAX_CONCURRENT_URLS) {
      return {
        success: false,
        error: 'Maximum of 5 concurrent shortened URLs allowed. Please wait for some to expire or delete existing ones.'
      };
    }

    // Generate or use custom shortcode
    const shortCode = data.customShortcode || this.generateShortCode();
    
    // Ensure uniqueness for generated codes
    if (!data.customShortcode) {
      let attempts = 0;
      while (!this.isShortcodeUnique(shortCode) && attempts < 10) {
        attempts++;
      }
      if (attempts >= 10) {
        return {
          success: false,
          error: 'Unable to generate unique shortcode. Please try again.'
        };
      }
    }

    const now = new Date();
    const expiresAt = new Date(now.getTime() + data.validityPeriod * 60 * 1000);

    const shortenedURL: ShortenedURL = {
      id: uuidv4(),
      originalUrl: data.originalUrl,
      shortCode,
      shortUrl: `http://localhost:3000/${shortCode}`,
      validityPeriod: data.validityPeriod,
      customShortcode: data.customShortcode,
      createdAt: now,
      expiresAt,
      clickCount: 0,
      isActive: true
    };

    this.urls.push(shortenedURL);

    return {
      success: true,
      data: shortenedURL
    };
  }

  // Get all URLs (for statistics)
  async getAllURLs(): Promise<APIResponse<ShortenedURL[]>> {
    await this.delay(300);
    
    this.cleanupExpiredURLs();
    
    return {
      success: true,
      data: [...this.urls].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    };
  }

  // Get URL by short code
  async getURLByShortCode(shortCode: string): Promise<APIResponse<ShortenedURL>> {
    await this.delay(200);
    
    this.cleanupExpiredURLs();
    
    const url = this.urls.find(u => u.shortCode === shortCode && u.isActive);
    
    if (!url) {
      return {
        success: false,
        error: 'Short URL not found or has expired'
      };
    }

    // Increment click count
    url.clickCount++;

    return {
      success: true,
      data: url
    };
  }

  // Delete URL
  async deleteURL(id: string): Promise<APIResponse<void>> {
    await this.delay(200);
    
    const urlIndex = this.urls.findIndex(u => u.id === id);
    
    if (urlIndex === -1) {
      return {
        success: false,
        error: 'URL not found'
      };
    }

    this.urls[urlIndex].isActive = false;

    return {
      success: true
    };
  }

  // Get statistics
  async getStatistics(): Promise<APIResponse<{
    totalUrls: number;
    activeUrls: number;
    expiredUrls: number;
    totalClicks: number;
  }>> {
    await this.delay(200);
    
    this.cleanupExpiredURLs();
    
    const totalUrls = this.urls.length;
    const activeUrls = this.urls.filter(u => u.isActive).length;
    const expiredUrls = this.urls.filter(u => !u.isActive).length;
    const totalClicks = this.urls.reduce((sum, url) => sum + url.clickCount, 0);

    return {
      success: true,
      data: {
        totalUrls,
        activeUrls,
        expiredUrls,
        totalClicks
      }
    };
  }
}

export const urlService = new URLService();