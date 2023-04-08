export interface SignUpRequest {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface Token {
	token: string;
}
