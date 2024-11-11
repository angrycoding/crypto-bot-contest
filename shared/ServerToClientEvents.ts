import Gift from "./Gift";

export default interface ServerToClientEvents {

	update: (what: string[]) => void

	// inviteResponse: (gameState: GameState) => void;
	// shot: (fromUserId: string, index: number) => void;
	// readyToReplayResponse: (replayId: string, withUserId: string) => void;
	// startGameResponse: (gameState: GameState) => void;
}