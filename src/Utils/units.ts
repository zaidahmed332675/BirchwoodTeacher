import { Dimensions, StatusBar } from 'react-native';

const HEIGHT = Dimensions.get('window').height,
  WIDTH = Dimensions.get('window').width,
  vh = HEIGHT * 0.01,
  vw = WIDTH * 0.01,
  statusBarHeight = StatusBar.currentHeight || 0;

export { statusBarHeight, HEIGHT, WIDTH, vh, vw };
