const parseJSON = (value: any): any => {
	try {
		return JSON.parse(value);
	} catch (e) {}
}

export default parseJSON;