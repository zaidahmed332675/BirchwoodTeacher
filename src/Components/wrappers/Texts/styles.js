import {StyleSheet} from 'react-native';
import {colors} from '../../../apptheme/colors';
import {font} from '../../../apptheme/styles';
import fonts from '../../../Assets/fonts';

const styles = StyleSheet.create({
  text: {
    fontSize: font.small,
    color: colors.text.titleBlack,
  },
  euclidCircularAItalic: {
    fontFamily: fonts.euclidCircularA.italic,
  },
  euclidCircularABold: {
    fontFamily: fonts.euclidCircularA.bold,
  },
  euclidCircularABoldItalic: {
    fontFamily: fonts.euclidCircularA.boldItalic,
  },
  euclidCircularASemiBold: {
    fontFamily: fonts.euclidCircularA.semiBold,
  },
  euclidCircularASemiBoldItalic: {
    fontFamily: fonts.euclidCircularA.semiBoldItalic,
  },
  euclidCircularALight: {
    fontFamily: fonts.euclidCircularA.light,
  },
  euclidCircularALightItalic: {
    fontFamily: fonts.euclidCircularA.lightItalic,
  },
  euclidCircularARegular: {
    fontFamily: fonts.euclidCircularA.regular,
  },
  euclidCircularAMedium: {
    fontFamily: fonts.euclidCircularA.medium,
  },
  euclidCircularAMediumItalic: {
    fontFamily: fonts.euclidCircularA.mediumItalic,
  },
});
export default styles;
