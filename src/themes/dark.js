import color from "color";

const background = "#1a1a1a";
const primary = "#6c6c6c";
const light = "#FFB516";
// FFB516

export default {
  name: "dark",
  colors: {
    primary,
    background,
    activeTintColor: "#0f2136",
    backgroundTabBar: "#000000",
    progress: {
      borderColor: "#f8b330",
    },
    contentArea: {
      background: "#202124",
      boderColor: "#fff",
    },
    lazyLoadImage: {
      background: "#1a1a1a",
    },
    chip: {
      background: {
        primary,
        secondary: "#e5e5e5",
      },
      text: {
        primary: "#fff",
        secondary: background,
      },
    },
    icons: "#e5e5e5",
    zero: "#fff",
    text: "#fff",
    light: "#ccc",
    lightGray: "#cfcfcf",
    darkText: "#666",
    dark: "#fff",
    link: "#1a0dab",
    divider: color(background).lighten(1.5).rgb().string(),
  },
  fonts: {
    body: "Helvetica",
  },
};
