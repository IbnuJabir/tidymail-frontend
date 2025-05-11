// types/auth.ts
export interface User {
    id: number;
    email: string;
    name: string;
    profile_image: string;
    subscription_plan: string;
    google_id: string;
    is_active: boolean;
    created_at: string;
  }
  
  export interface AuthResponse {
    status: string;
    message: string;
    data?: User;
  }
  
  export interface ErrorResponse {
    status: string;
    detail: string;
  }
  
  export interface ApiResponse<T> {
    status: string;
    message: string;
    data: T;
  }