const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export type Intent = 'default' | 'muted';

export interface ThemeType {
  text: {[Property in Intent]: string}
  background: string;
  tint: string;
  tabIconDefault: string;
  tabIconSelected: string;
}

interface ThemeSet {
  light: ThemeType;
  dark: ThemeType;
}

const Theme: ThemeSet = {
  light: {
    text: {
      default: '#000',
      muted: '#555',
    },
    background: '#eee',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: {
      default: '#fff',
      muted: '#888',
    },
    background: '#111',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};


export default Theme;