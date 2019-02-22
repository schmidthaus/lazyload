import { supportsIntersectionObserver } from "./lazyload.environment";
import { onEnter, onExit } from "./lazyload.reveal";

/* entry.isIntersecting needs fallback because is null on some versions of MS Edge, and
   entry.intersectionRatio is not enough alone because it could be 0 on some intersecting elements */
export const isIntersecting = entry =>
	entry.isIntersecting || entry.intersectionRatio > 0;

export const getObserverSettings = settings => ({
	root: settings.container === document ? null : settings.container,
	rootMargin: settings.thresholds || settings.threshold + "px"
});

export const setObserver = instance => {
	if (!supportsIntersectionObserver) {
		return false;
	}
	instance._observer = new IntersectionObserver(entries => {
		entries.forEach(entry =>
			isIntersecting(entry)
				? onEnter(entry.target, instance)
				: onExit(entry.target, instance)
		);
	}, getObserverSettings(instance._settings));
	return true;
};
