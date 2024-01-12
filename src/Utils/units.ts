import { Dimensions } from 'react-native';

const HEIGHT = Dimensions.get('window').height,
  WIDTH = Dimensions.get('window').width;

const vh = HEIGHT * 0.01,
  vw = WIDTH * 0.01;

export { HEIGHT, WIDTH, vh, vw };
