import { 
    Company, 
    PlanType, 
    Status, 
    Branch, 
    Product, 
    Order, 
    OrderStatus, 
    OrderType,
    Campaign,
    CampaignChannel,
    AIPrediction,
    Customer,
    Rider,
    RiderStatus
  } from './types';
  
  export const MOCK_COMPANY: Company = {
    id: 1,
    name: "Noun Foods Global",
    country: "USA",
    currency: "USD",
    plan: PlanType.Pro,
    expire_date: "2025-12-31",
    status: Status.Active
  };
  
  export const MOCK_BRANCHES: Branch[] = [
    { id: 101, company_id: 1, name: "Downtown Hub", address: "123 Main St, New York" },
    { id: 102, company_id: 1, name: "Uptown Express", address: "456 Broadway, New York" }
  ];
  
  export const MOCK_PRODUCTS: Product[] = [
    { id: 1, name: "Classic Cheeseburger", price: 12.99, cost_price: 4.50, stock: 150, category: "Burgers", image: "https://picsum.photos/200/200?random=1" },
    { id: 2, name: "Double Bacon Smash", price: 15.99, cost_price: 5.50, stock: 80, category: "Burgers", image: "https://picsum.photos/200/200?random=2" },
    { id: 3, name: "Crispy Fries (L)", price: 4.99, cost_price: 0.80, stock: 500, category: "Sides", image: "https://picsum.photos/200/200?random=3" },
    { id: 4, name: "Vanilla Shake", price: 5.99, cost_price: 1.20, stock: 200, category: "Drinks", image: "https://picsum.photos/200/200?random=4" },
    { id: 5, name: "Chicken Wings (6pcs)", price: 8.99, cost_price: 3.00, stock: 120, category: "Appetizers", image: "https://picsum.photos/200/200?random=5" },
    { id: 6, name: "Caesar Salad", price: 10.50, cost_price: 2.50, stock: 45, category: "Salads", image: "https://picsum.photos/200/200?random=6" },
  ];
  
  export const MOCK_ORDERS: Order[] = [
    {
      id: 1001,
      customer_name: "Walk-in Customer",
      total: 23.97,
      status: OrderStatus.Paid,
      order_type: OrderType.POS,
      created_at: "2023-10-26 10:30:00",
      items: [
        { id: 1, product_id: 1, product_name: "Classic Cheeseburger", qty: 1, sell_price: 12.99 },
        { id: 2, product_id: 3, product_name: "Crispy Fries (L)", qty: 2, sell_price: 4.99 }
      ]
    },
    {
      id: 1002,
      customer_name: "John Doe",
      total: 45.50,
      status: OrderStatus.Cooking,
      order_type: OrderType.Online,
      created_at: "2023-10-26 11:15:00",
      items: [
        { id: 3, product_id: 2, product_name: "Double Bacon Smash", qty: 2, sell_price: 15.99 }
      ]
    },
    {
      id: 1003,
      customer_name: "Alice Smith",
      total: 12.99,
      status: OrderStatus.Pending,
      order_type: OrderType.Online,
      created_at: "2023-10-26 11:45:00",
      items: []
    }
  ];
  
  export const MOCK_CAMPAIGNS: Campaign[] = [
    { id: 1, name: "Weekend Special", message: "Get 20% off all burgers this weekend!", channel: CampaignChannel.SMS, status: 'active', sent_count: 1250 },
    { id: 2, name: "Loyalty Boost", message: "Double points on all orders today.", channel: CampaignChannel.Whatsapp, status: 'paused', sent_count: 5000 },
  ];
  
  export const MOCK_AI_PREDICTIONS: AIPrediction[] = [
    { date: '2023-10-20', predicted_sales: 1200, actual_sales: 1150 },
    { date: '2023-10-21', predicted_sales: 1300, actual_sales: 1350 },
    { date: '2023-10-22', predicted_sales: 1800, actual_sales: 1780 },
    { date: '2023-10-23', predicted_sales: 1100, actual_sales: 1050 },
    { date: '2023-10-24', predicted_sales: 1150, actual_sales: 1200 },
    { date: '2023-10-25', predicted_sales: 1400, actual_sales: 1500 },
    { date: '2023-10-26', predicted_sales: 1600, actual_sales: undefined }, // Future
    { date: '2023-10-27', predicted_sales: 2100, actual_sales: undefined }, // Future
  ];

  export const MOCK_CUSTOMERS: Customer[] = [
    { id: 1, name: "Sarah Connor", phone: "+1 234 567 8901", points: 1250, total_spent: 450.50, last_visit: "2023-10-25" },
    { id: 2, name: "John Wick", phone: "+1 987 654 3210", points: 500, total_spent: 120.00, last_visit: "2023-10-20" },
    { id: 3, name: "Ellen Ripley", phone: "+1 555 123 4567", points: 2300, total_spent: 890.75, last_visit: "2023-10-26" },
  ];
  
  export const MOCK_RIDERS: Rider[] = [
    { id: 1, name: "Flash Gordon", phone: "555-0101", status: RiderStatus.Busy, current_order_id: 1002, deliveries_completed: 15 },
    { id: 2, name: "Peter Parker", phone: "555-0102", status: RiderStatus.Online, deliveries_completed: 8 },
    { id: 3, name: "Tony Stark", phone: "555-0103", status: RiderStatus.Offline, deliveries_completed: 24 },
  ];