import { extendTheme } from '@chakra-ui/react';
const colors = {
    brand: {
        // 900: '#1a365d',
        // 800: '#153e75',
        // 700: '#2a69ac',
    }
}

const fonts = {
    body: "system-ui, sans-serif",
    heading: "Georgia, serif",
    mono: "Menlo, monospace",
};

const letterSpacings = {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
};
const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
}

export const theme = extendTheme({
    colors,
    letterSpacings,
    fonts,
    config
})
