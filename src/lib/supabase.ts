import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      cars: {
        Row: {
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
        };
        Insert: Omit<Database['public']['Tables']['cars']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['cars']['Insert']>;
      };
      bookings: {
        Row: {
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
        };
        Insert: Omit<Database['public']['Tables']['bookings']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['bookings']['Insert']>;
      };
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          phone: string;
          role: 'user' | 'admin';
          avatar_url?: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at'>;
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          status: 'unread' | 'read' | 'replied';
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['contact_messages']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['contact_messages']['Insert']>;
      };
    };
  };
};