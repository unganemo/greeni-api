export interface NewGroceryRequest {
	name: string;
	days: number;
}

export interface AddGroceryToFridgeRequest {
	grocery_id?: string;
	grocery_name?: string;
	fridge_id: string;
	expires: string;
	purchased: string;
}
