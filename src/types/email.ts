export interface Email {
  id: string;
  labels: string[];
  threadId: string;
  snippet: string;
  timestamp: string;
  from: string;
  to: string;
  subject: string;
  date: string;

}
// export interface Email {
//   id: string;
//   subject?: string;
//   from?: string;
//   to?: string;
//   date?: string;
//   snippet?: string;
//   body?: string;
//   labels?: string[];
//   timestamp?: string;
//   unread?: boolean;
//   [key: string]: any; // For dynamic properties used in sorting
// }

export interface ApiResponse<T> {
  data: T;
  status: string;
  message: string;
  page: number;
  limit: number;
  total_count: number;
}

export interface Subscription {
  id: string;
  email: string;
  name: string;
  domain: string;
  emailCount: number;
}

export interface Subscription {
  id: string;
  name: string;
  email: string;
  domain: string;
  email_count: number;
  status: 'active' | 'unsubscribed';
}

export interface SubscriptionResponse {
  status: string;
  message: string;
  data: Subscription[];
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface GetSubscriptionsResponse {
  data: Subscription[];
  totalCount: number;
  totalPages: number;
  page: number;
  limit: number;
}
