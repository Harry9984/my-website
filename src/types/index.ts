export interface User {
  id: string;
  email: string;
  full_name?: string;
  subscription_status: 'unpaid' | 'starter' | 'advanced';
  created_at: string;
  last_login?: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  video_url: string;
  thumbnail_url?: string;
  module: string;
  order_index: number;
  package_type: 'starter' | 'advanced' | 'both';
  created_at: string;
}

export interface SuccessStory {
  id: string;
  student_name: string;
  profit_amount: string;
  timeframe: string;
  testimonial: string;
  image_url?: string;
  is_featured: boolean;
  created_at: string;
}