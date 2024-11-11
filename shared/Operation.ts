import Gift from "./Gift";
import User from "./User";

type Operation = Gift & {
	status: string,
	date: number,
	purchasePrice: number
	user: User,
	toUser?: User
}

export default Operation;