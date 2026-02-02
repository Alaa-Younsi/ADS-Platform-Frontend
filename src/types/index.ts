export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'admin';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Campaign {
  id: string;
  name: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  budget: number;
  spent: number;
  currency: string;
  startDate: string;
  endDate: string;
  owner: string | User;
  description?: string;
  remainingBudget: number;
  budgetUtilization: number;
  duration: number;
  createdAt: string;
  updatedAt: string;
}

export interface Creative {
  id: string;
  campaign: string;
  name: string;
  type: 'image' | 'video' | 'carousel' | 'text';
  mediaUrl?: string;
  thumbnailUrl?: string;
  headline?: string;
  description?: string;
  callToAction?: string;
  destinationUrl?: string;
  status: 'draft' | 'active' | 'paused' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface AnalyticsStats {
  impressions: number;
  clicks: number;
  conversions: number;
  views: number;
  ctr: number;
  conversionRate: number;
  totalValue: number;
}

export interface TimeSeriesData {
  date: string;
  impressions: number;
  clicks: number;
  conversions: number;
}

export interface DeviceBreakdown {
  _id: string;
  impressions: number;
  clicks: number;
  conversions: number;
}

export interface LocationBreakdown {
  _id: string;
  impressions: number;
  clicks: number;
  conversions: number;
}

export interface AnalyticsData {
  summary: AnalyticsStats;
  timeSeries: TimeSeriesData[];
  deviceBreakdown: DeviceBreakdown[];
  locationBreakdown: LocationBreakdown[];
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Array<{ field: string; message: string }>;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
