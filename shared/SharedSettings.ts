let isProd = false;

// @ts-ignore
if (typeof isProduction !== "undefined") {
	// @ts-ignore
	isProd = (isProduction === true);
}

const SharedSettings = {
	isProduction: isProd,
	API_SERVER_LISTEN_PORT: 8093,
	SOCKET_IO_PATH: isProd ? '/api/' : '/',
	testUserId: '311775037',
	testUserName: 'Ruslan'
}

export default SharedSettings;