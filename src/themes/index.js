import color from "color";

const background = "#fff";
const primary = "#000000";

export default {
  name: "light",
  colors: {
    primary,
    background,
    activeTintColor: "#0f2136",
    backgroundTabBar: "#000000",
    progress: {
      borderColor: "#000000",
    },
    contentArea: {
      background: "#eeeeee",
    },
    lazyLoadImage: {
      background: "#1a1a1a",
    },
    chip: {
      background: {
        primary,
        secondary: primary,
      },
      text: {
        primary: "#fff",
        secondary: "#fff",
      },
    },
    icons: "#e5e5e5",
    zero: "#fff",
    text: "#000000",
    light: "#ccc",
    lightGray: "#606060",
    darkText: "#666666",
    dark: "#000000",
    link: "#1a0dab",
    divider: color(background).darken(0.2).rgb().string(),
  },
  fonts: {
    body: "Helvetica",
  },
};
