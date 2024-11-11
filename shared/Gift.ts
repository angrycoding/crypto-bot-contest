interface Gift {
	_id: string
	giftId: string
	image: string,
	color: string
	name: string,
	price: number,
	left: number,
	total: number
	purchased: number
	currency: string

	status?: string,
	userId?: string
	date?: number,
	purchasePrice?: number
	instanceId?: string
	from?: any
}

export default Gift;