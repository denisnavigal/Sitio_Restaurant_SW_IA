export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      administrators: {
        Row: {
          email: string
          id: number
          name: string
          password: string
          role: string
        }
        Insert: {
          email: string
          id?: never
          name: string
          password: string
          role: string
        }
        Update: {
          email?: string
          id?: never
          name?: string
          password?: string
          role?: string
        }
        Relationships: []
      }
      customers: {
        Row: {
          email: string
          id: number
          name: string
          password: string
          phone: string | null
          registration_date: string | null
        }
        Insert: {
          email: string
          id?: never
          name: string
          password: string
          phone?: string | null
          registration_date?: string | null
        }
        Update: {
          email?: string
          id?: never
          name?: string
          password?: string
          phone?: string | null
          registration_date?: string | null
        }
        Relationships: []
      }
      dish_ratings: {
        Row: {
          comment: string | null
          customer_id: number | null
          dish_id: number | null
          id: number
          rating: number
          rating_date: string | null
        }
        Insert: {
          comment?: string | null
          customer_id?: number | null
          dish_id?: number | null
          id?: never
          rating: number
          rating_date?: string | null
        }
        Update: {
          comment?: string | null
          customer_id?: number | null
          dish_id?: number | null
          id?: never
          rating?: number
          rating_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dish_ratings_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dish_ratings_dish_id_fkey"
            columns: ["dish_id"]
            isOneToOne: false
            referencedRelation: "popular_dishes"
            referencedColumns: ["id"]
          },
        ]
      }
      inactive_products: {
        Row: {
          date_marked_inactive: string | null
          id: number
          product_name: string
          reason_for_inactivity: string | null
        }
        Insert: {
          date_marked_inactive?: string | null
          id?: never
          product_name: string
          reason_for_inactivity?: string | null
        }
        Update: {
          date_marked_inactive?: string | null
          id?: never
          product_name?: string
          reason_for_inactivity?: string | null
        }
        Relationships: []
      }
      inventory: {
        Row: {
          created_at: string | null
          expiration_date: string | null
          id: number
          name: string
          quantity_available: number
          supplier_id: number | null
        }
        Insert: {
          created_at?: string | null
          expiration_date?: string | null
          id?: never
          name: string
          quantity_available: number
          supplier_id?: number | null
        }
        Update: {
          created_at?: string | null
          expiration_date?: string | null
          id?: never
          name?: string
          quantity_available?: number
          supplier_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "inventory_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      popular_dishes: {
        Row: {
          dish_name: string
          id: number
          last_updated: string | null
          order_count: number
        }
        Insert: {
          dish_name: string
          id?: never
          last_updated?: string | null
          order_count?: number
        }
        Update: {
          dish_name?: string
          id?: never
          last_updated?: string | null
          order_count?: number
        }
        Relationships: []
      }
      suppliers: {
        Row: {
          address: string | null
          email: string | null
          id: number
          name: string
          phone: string | null
        }
        Insert: {
          address?: string | null
          email?: string | null
          id?: never
          name: string
          phone?: string | null
        }
        Update: {
          address?: string | null
          email?: string | null
          id?: never
          name?: string
          phone?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
