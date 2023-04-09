type Coordinates = { latitude: number; longitude: number };

export interface NewFridgeRequest {
	name: string;
	location: Coordinates;
	user_id: string;
}

export interface InviteUserToFridgeRequest {
	owner_id: string;
	invitee_email: string;
	fridge_id: string;
}

export interface AcceptInviteToFridgeRequest {
	owner_id: string;
	invited_id: string;
	fridge_id: string;
	name: string;
}
