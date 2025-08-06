import "styled-components/native";
declare module "styled-components/native" {
  export interface DefaultTheme {
    name: string;
    colors: {
      primary: string;
      background: string;
      activeTintColor: string;
      backgroundTabBar: string;
      progress: {
        borderColor: string;
      };
      contentArea: {
        background: string;
      };
      lazyLoadImage: {
        background: string;
      };
      chip: {
        background: {
          primary: string;
          secondary: string;
        };
        text: {
          primary: string;
          secondary: string;
        };
      };
      icons: string;
      zero: string;
      text: string;
      light: string;
      lightGray: string;
      darkText: string;
      dark: string;
      link: string;
      divider: string;
      // Add any other color keys your theme uses below
    };
    fonts: {
      body: string;
      // Add any other font keys your theme uses
    };
    // Add any other theme-level properties here if needed
  }
}
