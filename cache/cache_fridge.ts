import { new_fridge_d } from "../database/database_fridge";
import { NewFridgeRequest } from "../interfaces/interface_fridge";

export const new_fridge_c = async (request: NewFridgeRequest) => {
	return await new_fridge_d(request);
};
