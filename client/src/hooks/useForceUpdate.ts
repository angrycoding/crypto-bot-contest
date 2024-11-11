import { useState } from "react";

const useForceUpdate = () => {
	const setValue = useState<boolean>(false)[1];
	return () => setValue(value => !value);
};

export default useForceUpdate;