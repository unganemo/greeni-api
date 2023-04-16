type Coordinates = { latitude: number; longitude: number };

export interface NewKitchenRequest {
  name: string;
  location: Coordinates;
  user_id: string;
}

export interface InviteUserToKitchenRequest {
  owner_id: string;
  invitee_email: string;
  kitchen_id: string;
}

export interface AcceptInviteToKitchenRequest {
  owner_id: string;
  invited_id: string;
  kitchen_id: string;
  name: string;
}
