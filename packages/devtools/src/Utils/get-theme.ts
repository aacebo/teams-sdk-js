import { teamsDarkTheme, teamsLightTheme } from '@fluentui/react-components';

export function getTheme(isDarkMode: boolean) {
  return isDarkMode ? teamsDarkTheme : teamsLightTheme;
}
