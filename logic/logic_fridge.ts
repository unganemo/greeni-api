import { new_fridge_c } from "../cache/cache_fridge";
import { NewFridgeRequest } from "../interfaces/interface_fridge";

export const new_fridge_l = async (request: NewFridgeRequest) => {
	return await new_fridge_c(request);
};
