export interface NewShoppingListRequest {
  user_id: string;
  name: string;
}

export interface AddItemToShoppingListRequest {
  sl_id: string;
  groceries: string[];
}
