import { NewFridgeRequest } from "../interfaces/interface_fridge";
import { new_fridge_l } from "../logic/logic_fridge";

export const new_fridge_s = async (request: NewFridgeRequest) => {
	return await new_fridge_l(request);
};
