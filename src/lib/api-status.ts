export interface ApiStatus {
  isAvailable: boolean;
  lastChecked: Date;
  errorType?: 'network' | 'timeout' | 'server' | 'config';
  errorMessage?: string;
}

class ApiStatusManager {
  private status: ApiStatus = {
    isAvailable: true,
    lastChecked: new Date(),
  };

  updateStatus(isAvailable: boolean, errorType?: ApiStatus['errorType'], errorMessage?: string) {
    this.status = {
      isAvailable,
      lastChecked: new Date(),
      errorType: isAvailable ? undefined : errorType,
      errorMessage: isAvailable ? undefined : errorMessage,
    };
  }

  getStatus(): ApiStatus {
    return { ...this.status };
  }

  isRecentlyChecked(maxAgeMs: number = 30000): boolean {
    return Date.now() - this.status.lastChecked.getTime() < maxAgeMs;
  }

  shouldRetry(): boolean {
    // Don't retry if we've checked recently and it's still down
    if (!this.status.isAvailable && this.isRecentlyChecked(10000)) {
      return false;
    }
    return true;
  }

  getErrorMessage(): string {
    if (this.status.isAvailable) {
      return '';
    }

    switch (this.status.errorType) {
      case 'network':
        return 'Unable to connect to the blog service. Please check your internet connection.';
      case 'timeout':
        return 'The blog service is taking too long to respond. Please try again later.';
      case 'server':
        return 'The blog service is temporarily unavailable. Please try again later.';
      case 'config':
        return 'Blog service is not properly configured.';
      default:
        return 'Blog content is temporarily unavailable. Please try again later.';
    }
  }
}

export const apiStatusManager = new ApiStatusManager();
