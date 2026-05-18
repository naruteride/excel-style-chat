export const vscodePlatformClassNames = ["windows", "mac", "linux"];

export const getVscodePlatformClass = (navigatorLike = globalThis.navigator) => {
	const uaDataPlatform = navigatorLike?.userAgentData?.platform || "";
	const platform = String(uaDataPlatform || navigatorLike?.platform || "").toLowerCase();
	const userAgent = String(navigatorLike?.userAgent || "").toLowerCase();
	const maxTouchPoints = Number(navigatorLike?.maxTouchPoints || 0);
	const isIpadOs = platform == "macintel" && maxTouchPoints > 1;

	if (/(iphone|ipad|ipod)/u.test(userAgent) || isIpadOs) return "mac";
	if (platform.includes("mac") || userAgent.includes("macintosh")) return "mac";
	if (platform.includes("win") || userAgent.includes("windows")) return "windows";
	if (platform.includes("android") || userAgent.includes("android")) return "linux";
	if (platform.includes("linux") || /linux|cros|x11/u.test(userAgent)) return "linux";

	return "linux";
};

