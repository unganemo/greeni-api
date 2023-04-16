export interface NewGroceryRequest {
  name: string;
  days: number;
}

export interface AddGroceryToKitchenRequest {
  grocery_id?: string;
  grocery_name?: string;
  kitchen_id: string;
  expires: string;
  purchased: string;
}
