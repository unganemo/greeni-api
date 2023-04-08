type Coordinates = { latitude: number; longitude: number };

export interface NewFridgeRequest {
	name: string;
	location: Coordinates;
}
