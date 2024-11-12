import Gift from './Gift';
import User from './User';

export default interface ClientToServerEvents {
	getGifts: (ret: (gifts: Gift[]) => void) => void,
	getMyGifts: (ret: (gifts: Gift[]) => void) => void,
	getLeaderBoard: (ret: (leaderboard: User[]) => void) => void,
	getUserProfile: (userId: string, ret: (user: any) => void) => void,
	purchaseGift: (giftId: string, ret: (paymentUrl: string) => void) => void,
	getMyRecentActions: (ret: (recentActions: Gift[]) => void) => void,
	receiveGift: (instanceId: string, ret: (gift: Gift | undefined) => void) => void,
	getGiftOperations: (giftId: string, ret: (operations: Gift[]) => void) => void,
}