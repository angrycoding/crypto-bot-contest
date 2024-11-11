import Gift from './Gift';
import Operation from './Operation';
import User from './User';
import RecentAction from './RecentAction';

export default interface ClientToServerEvents {

	receiveGift: (instanceId: string, ret: (gift: Gift | undefined) => void) => void,

	getGifts: (ret: (gifts: Gift[]) => void) => void,
	getMyGifts: (ret: (gifts: Gift[]) => void) => void,
	getLeaderBoard: (ret: (leaderboard: User[]) => void) => void,
	getGiftOperations: (giftId: string, ret: (operations: Operation[]) => void) => void,
	getMyProfile: (ret: (user: User) => void) => void,
	getMyRecentActions: (ret: (recentActions: RecentAction[]) => void) => void,


	getUserProfile: (userId: string, ret: (user: any) => void) => void,


	purchaseGift: (giftId: string, ret: (paymentUrl: string) => void) => void,
}