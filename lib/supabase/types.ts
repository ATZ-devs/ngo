export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      donations: {
        Row: {
          id: string;
          donor_name: string;
          donor_email: string;
          amount_minor: number;
          currency: string;
          country_code: string;
          provider: "razorpay" | null;
          provider_order_id: string | null;
          provider_payment_id: string | null;
          status: "pending" | "paid" | "failed";
          paid_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          donor_name: string;
          donor_email: string;
          amount_minor: number;
          currency: string;
          country_code: string;
          provider?: "razorpay" | null;
          provider_order_id?: string | null;
          provider_payment_id?: string | null;
          status?: "pending" | "paid" | "failed";
          paid_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          donor_name?: string;
          donor_email?: string;
          amount_minor?: number;
          currency?: string;
          country_code?: string;
          provider?: "razorpay" | null;
          provider_order_id?: string | null;
          provider_payment_id?: string | null;
          status?: "pending" | "paid" | "failed";
          paid_at?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      payment_events: {
        Row: {
          id: string;
          provider: "razorpay";
          provider_event_id: string;
          provider_payment_id: string;
          donation_id: string;
          payload: Json;
          paid_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          provider: "razorpay";
          provider_event_id: string;
          provider_payment_id: string;
          donation_id: string;
          payload: Json;
          paid_at?: string | null;
          created_at?: string;
        };
        Update: {
          provider?: "razorpay";
          provider_event_id?: string;
          provider_payment_id?: string;
          donation_id?: string;
          payload?: Json;
          paid_at?: string | null;
        };
        Relationships: [];
      };
      processing_jobs: {
        Row: {
          id: string;
          donation_id: string;
          job_type: string;
          status: "queued" | "processing" | "completed" | "failed";
          last_error: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          donation_id: string;
          job_type: string;
          status?: "queued" | "processing" | "completed" | "failed";
          last_error?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          donation_id?: string;
          job_type?: string;
          status?: "queued" | "processing" | "completed" | "failed";
          last_error?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      receipts: {
        Row: {
          id: string;
          donation_id: string;
          receipt_number: string;
          storage_path: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          donation_id: string;
          receipt_number: string;
          storage_path: string;
          created_at?: string;
        };
        Update: {
          donation_id?: string;
          receipt_number?: string;
          storage_path?: string;
        };
        Relationships: [];
      };
      email_deliveries: {
        Row: {
          id: string;
          donation_id: string;
          provider: string;
          provider_message_id: string | null;
          status: "sent" | "failed";
          last_error: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          donation_id: string;
          provider: string;
          provider_message_id?: string | null;
          status: "sent" | "failed";
          last_error?: string | null;
          created_at?: string;
        };
        Update: {
          donation_id?: string;
          provider?: string;
          provider_message_id?: string | null;
          status?: "sent" | "failed";
          last_error?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
