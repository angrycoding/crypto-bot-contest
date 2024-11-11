import { useEffect, useState } from "react";
import SocketIO from "../utils/SocketIO";

let cache: {[userId: string]: any} = {}

const useProfile = (userId: string): any | undefined => {

	const [ result, setResult ] = useState<any>(cache[userId]);

	const updateProfile = (userId: string, profile: any) => {
		cache[userId] = profile;
		setResult(profile);
	}
	
	const updateHappened = (what: string[]) => {
		if (what.includes(`getUserProfile/${userId}`)) {
			SocketIO.emit('getUserProfile', userId, profile => updateProfile(userId, profile));
		}
	}

	useEffect(() => {
		SocketIO.emit('getUserProfile', userId, profile => updateProfile(userId, profile));
		SocketIO.on('update', updateHappened);
		return () => {
			SocketIO.off('update', updateHappened);
		}
	}, [userId]);

	return result;
}


export default useProfile;