

const animationEndPromises: {[key: string]: Array<() => void>} = {}

const animationEnd = (animationName: string) => new Promise<void>(resolve => {

	if (!animationEndPromises[animationName]) {
		animationEndPromises[animationName] = [];
	}

	animationEndPromises[animationName].push(resolve);

});

document.addEventListener('animationend', (event: AnimationEvent) => {
	for (const resolve of animationEndPromises[event.animationName] || []) {
		resolve();
	}
})

export default animationEnd;