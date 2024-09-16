import { Platform } from 'react-native';
const colors = {
  input: {
    background: '#EBEBEB',
    label: '#EBEBEB',
  },
  theme: {
    primary: '#035392',
    secondary: '#6688CA',
    lightSecondary: '#D4E2FF',
    input: '#A4A4A4' + '24',
    black: '#000000',
    borderColor: '#CCCCCC',
    themeSecondaryBorder: '#42D1AC',
    grey: '#777777',
    greyAlt: '#E1E1E1',
    greyAlt2: '#989BA5',
    white: '#ffffff',
    yellow0: '#FCF3E2',
    pink0: '#FFD8FF',
    lightRed: '#FFB1B1',
    darkRed: '#E92020',
    lightGreen: '#A9F2A4',
    darkGreen: '#0BAC00',
  },
  background: {
    primary: '#ffffff',
    secondary: '#EBFFFA' + '80',
    header: '#000000',
    green: '#00FF00',
  },
  text: {
    white: '#ffffff',
    dimWhite: '#E5E5E5',
    red: '#FF0000',
    placeholder: '#111111' + '51',
    primary: '#00293B',
    secondary: '#01C190',
    grey: '#C1C0C8',
    altGrey: '#999999',
    greyAlt2: '#666666',
    dimBlack: '#333333',
    themeAlt: '#010127',
    black: '#000000',
  },
  card: {
    card1: '#E0E5FF',
  },
};

const appShadow = (ele = 4) => ({
  backgroundColor: 'white', // Set your box background color
  ...Platform.select({
    ios: {
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
    android: {
      elevation: ele,
    },
  }),
});

export { colors, appShadow };
