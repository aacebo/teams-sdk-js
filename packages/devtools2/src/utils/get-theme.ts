import { teamsDarkTheme, teamsLightTheme } from '@fluentui/react-components';

export default function getTheme(isDarkMode: boolean) {
  return isDarkMode ? teamsDarkTheme : teamsLightTheme;
}
