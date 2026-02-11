// Core Structure
export enum PlanType {
    Trial = 'trial',
    Basic = 'basic',
    Pro = 'pro'
  }
  
  export enum Status {
    Active = 'active',
    Inactive = 'inactive'
  }
  
  export interface Company {
    id: number;
    name: string;
    country: string;
    currency: string;
    plan: PlanType;
    expire_date: string;
    status: Status;
  }
  
  export interface Branch {
    id: number;
    company_id: number;
    name: string;
    address: string;
  }
  
  // Users & Roles
  export enum UserRole {
    SuperAdmin = 'super_admin',
    CompanyAdmin = 'company_admin',
    BranchAdmin = 'branch_admin',
    Cashier = 'cashier',
    Kitchen = 'kitchen',
    Rider = 'rider'
  }
  
  export interface User {
    id: number;
    name: string;
    role: UserRole;
  }
  
  // Products
  export interface Product {
    id: number;
    name: string;
    price: number;
    cost_price: number;
    stock: number;
    category: string;
    image?: string; // Added for UI
  }
  
  // Orders
  export enum OrderStatus {
    Pending = 'pending',
    Paid = 'paid',
    Cancelled = 'cancelled',
    Cooking = 'cooking',
    Ready = 'ready',
    Done = 'done'
  }
  
  export enum OrderType {
    POS = 'pos',
    Online = 'online'
  }
  
  export interface OrderItem {
    id: number;
    product_id: number;
    product_name: string; // Helper for UI
    qty: number;
    sell_price: number;
  }
  
  export interface Order {
    id: number;
    customer_name?: string;
    total: number;
    status: OrderStatus;
    order_type: OrderType;
    created_at: string;
    items: OrderItem[];
  }
  
  // Marketing
  export enum CampaignChannel {
    SMS = 'sms',
    Telegram = 'telegram',
    Line = 'line',
    Whatsapp = 'whatsapp'
  }
  
  export interface Campaign {
    id: number;
    name: string;
    message: string;
    channel: CampaignChannel;
    status: 'active' | 'paused';
    sent_count: number; // Mock metric
  }

  // Customers & Loyalty
  export interface Customer {
    id: number;
    name: string;
    phone: string;
    points: number;
    total_spent: number;
    last_visit: string;
  }

  // Riders
  export enum RiderStatus {
    Offline = 'offline',
    Online = 'online',
    Busy = 'busy'
  }

  export interface Rider {
    id: number;
    name: string;
    phone: string;
    status: RiderStatus;
    current_order_id?: number;
    deliveries_completed: number;
  }
  
  // AI
  export interface AIPrediction {
    date: string;
    predicted_sales: number;
    actual_sales?: number; // For comparison
  }