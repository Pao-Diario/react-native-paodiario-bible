import React from "react";
import { ThemeProvider } from "styled-components/native";
import { BibleProvider } from "../hooks/BibleProvider";
import lightTheme from "../../themes";
import darkTheme from "../../themes/dark";
import useBible from "../hooks/useBible";

interface BibleContextWrapperProps {
  children: React.ReactNode;
  initialTheme?: "light" | "dark" | "custom";
  customTheme?: any;
  // Props controladas para atualização a partir do app
  currentTheme?: "light" | "dark" | "custom";
  currentCustomTheme?: any;
}

// Componente interno para sincronizar as props controladas com o contexto (executa DENTRO do Provider)
const BibleThemeBridge: React.FC<{
  children: React.ReactNode;
  fallbackInitialTheme: "light" | "dark" | "custom";
  fallbackCustomTheme?: any;
  controlledTheme?: "light" | "dark" | "custom";
  controlledCustomTheme?: any;
}> = ({
  children,
  fallbackInitialTheme,
  fallbackCustomTheme,
  controlledTheme,
  controlledCustomTheme,
}) => {
  const bible = useBible();

  // Sincroniza tema controlado vindo por props com o contexto
  React.useEffect(() => {
    if (controlledTheme && bible?.setCurrentTheme) {
      bible.setCurrentTheme(controlledTheme);
    }
  }, [controlledTheme, bible?.setCurrentTheme]);

  // Sincroniza customTheme controlado vindo por props com o contexto
  React.useEffect(() => {
    if (controlledCustomTheme && bible?.setCustomTheme) {
      bible.setCustomTheme(controlledCustomTheme);
    }
  }, [controlledCustomTheme, bible?.setCustomTheme]);

  // Define qual tema usar considerando contexto e fallbacks
  let themeToUse: any = lightTheme;
  const themeKey = bible?.currentTheme ?? fallbackInitialTheme;
  const customFromContext = bible?.customTheme ?? fallbackCustomTheme;

  if (themeKey === "dark") themeToUse = darkTheme;
  else if (themeKey === "custom" && customFromContext)
    themeToUse = customFromContext;
  else themeToUse = lightTheme;

  return <ThemeProvider theme={themeToUse}>{children}</ThemeProvider>;
};

const BibleContextWrapper: React.FC<BibleContextWrapperProps> = ({
  children,
  initialTheme = "light",
  customTheme,
  currentTheme,
  currentCustomTheme,
}) => {
  return (
    <BibleProvider initialTheme={initialTheme} customTheme={customTheme}>
      <BibleThemeBridge
        fallbackInitialTheme={initialTheme}
        fallbackCustomTheme={customTheme}
        controlledTheme={currentTheme}
        controlledCustomTheme={currentCustomTheme}
      >
        {children}
      </BibleThemeBridge>
    </BibleProvider>
  );
};

export default BibleContextWrapper;
