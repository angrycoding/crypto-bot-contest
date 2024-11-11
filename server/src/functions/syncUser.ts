import FS, { stat } from 'fs';
import Path from 'path';
import { Db } from "mongodb";
import getUserDetails from "../utils/getUserDetails";
import sendTgRequest from "../utils/sendTgRequest";
import Settings from "../Settings";

const getFileLastUpdateDate = async(filePath: string): Promise<number> => {
	try {
		const stats = FS.lstatSync(filePath);
		return stats.mtime.getTime();
	} catch (e) {}
	return 0;
};

const updateUserAvatar = async(userId: string, avatarPath: string) => {

	try {
		
		let response: any = await sendTgRequest('getUserProfilePhotos', {
			user_id: userId,
			limit: 1,
			offset: 0
		})

		response = response?.result?.photos?.[0]?.[1]?.file_id?.trim?.();

		if (!response) return;

		response = await sendTgRequest('getFile', {
			file_id: response
		});

		response = response?.result?.file_path?.trim?.();

		if (!response) return;

		response = await fetch(`https://api.telegram.org/file/bot${Settings.BOT_TOKEN}/${response}`);

		if (response?.status !== 200) return;

		response = await response?.arrayBuffer?.();

		response = Buffer.from(response);

		if (response.length && response instanceof Buffer) {
			FS.writeFileSync(avatarPath, response);
		}


	} catch (e) {}

}

const syncUser = async(database: Db, user: NonNullable<ReturnType<typeof getUserDetails>>): Promise<boolean> => {

	const users = database.collection('users');
	const { userId, userName } = user;
	const avatarPath = Path.resolve(Settings.AVATAR_SAVE_PATH, `${userId}.png`);

	const lastUpdated = await getFileLastUpdateDate(avatarPath);
	if (Date.now() - lastUpdated > Settings.AVATAR_UPDATE_INTERVAL_MS) {
		await updateUserAvatar(userId, avatarPath);
	}

	try {

		await users.updateOne({ userId }, {
			$setOnInsert: {
				giftsReceived: 0
			},
			$set: {
				userId,
				userName,
			}
		}, { upsert: true });

		return true;

	} catch (e) {
		console.info('something went wrong during user update');
		return false;
	}
	
}



export default syncUser;