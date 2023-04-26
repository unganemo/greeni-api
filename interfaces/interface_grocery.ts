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

export interface Grocery {
	expires: Date;
	purchased: Date;
	name: string;
	id: string;
}

export interface Groceries {
	groceries: Grocery[];
}

export interface DeleteGroceryRequest {
	has_id: string;
}
