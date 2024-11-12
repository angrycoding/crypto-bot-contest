import User from "./User"

interface Gift {
	_id: string
	giftId: string
	name: string,
	image: string,
	price: number,
	purchased: number
	total: number
	currency: string
	color: string

	status?: string,
	from?: User,
	to?: User
	date?: number,
	purchasePrice?: number



	// userId?: string
	instanceId?: string
}

export default Gift;