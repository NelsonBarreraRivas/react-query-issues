export const sleep = async (seconds = 1): Promise<boolean> => {
	return await new Promise(resolve => {
		setTimeout(() => {
			resolve(true)
		}, seconds * 1000)
	})
}
