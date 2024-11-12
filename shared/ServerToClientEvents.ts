export default interface ServerToClientEvents {
	update: (what: string[]) => void
}