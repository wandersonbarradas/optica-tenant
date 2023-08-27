export const switchTheme = (colorMain: string, colorSecondary: string) => {
    const themeVars = {
        colorEmphasis: colorMain,
        colorEmphasisSecondary: colorSecondary,
    } as Record<string, string>;
    const el = document.documentElement;

    Object.keys(themeVars).forEach((key) => {
        const value = themeVars[key];
        if (value) {
            el.style.setProperty(`--${key}`, value);
        } else {
            el.style.removeProperty(`--${key}`);
        }
    });
};
