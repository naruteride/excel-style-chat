import themeStore from "../../../utils/theme-store.js";

export const getThemeNames = () => Object.keys(themeStore.themes);

export const getThemeCommandHelp = () => [
	":theme <name>  Change theme (example: :theme vscode)",
	":theme         Show current and available themes",
	`Themes: ${getThemeNames().join(", ")}`
].join("\n");
