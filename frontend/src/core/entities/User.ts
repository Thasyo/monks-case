export interface UserPayload {
  email: string;
  role: string;
  username: string;
}

export type AccessToken = string;

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface Metric {
    id: number;
    account_id: number;
    campaign_id: number;
    clicks: number;
    conversions: number;
    impressions: number;
    interactions: number;
    date: string;
    cost_micros?: number;
}