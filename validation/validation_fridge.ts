import { TokenError } from "../interfaces/interface_error";
import { NewFridgeRequest } from "../interfaces/interface_fridge";
import { new_fridge_s } from "../security/security_fridge";
import { newFridgeRequestSchema } from "./schemas/schema_fridge";

export const new_fridge_v = async (request: any): Promise<any | TokenError> => {
	const { error, value } = newFridgeRequestSchema.validate(request, {
		abortEarly: false,
	});
	if (error) {
		return { status: 400 };
	}
	const request_validated: NewFridgeRequest = value;
	return await new_fridge_s(request_validated);
};
