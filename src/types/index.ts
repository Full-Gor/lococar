export interface Car {
  id: string;
  name: string;
  brand: string;
  image_url: string;
  pollution_quota: string;
  price_per_month: number;
  category: 'standard' | 'electric' | 'used';
  description: string;
  available: boolean;
  created_at: string;
}

export interface Booking {
  id: string;
  user_id: string;
  car_id: string;
  start_date: string;
  end_date: string;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  payment_status: 'pending' | 'paid' | 'failed';
  stripe_payment_intent_id?: string;
  created_at: string;
  car?: Car;
}

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  role: 'user' | 'admin';
  avatar_url?: string;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  created_at: string;
}

export interface BookingStats {
  totalBookings: number;
  totalRevenue: number;
  averageBookingValue: number;
  monthlyData: Array<{
    month: string;
    bookings: number;
    revenue: number;
  }>;
  categoryData: Array<{
    category: string;
    count: number;
    revenue: number;
  }>;
}