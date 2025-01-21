import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { icons } from '../../Assets/icons';
import { GlroyBold } from '../GlroyBoldText';
import { colors } from '../../Theme/colors';
import { vh, vw } from '../../Utils/units';

export const SocialMediaIcons = () => {
  return (
    <>
      <GlroyBold text={'Sign In With'} _style={styles.text} />
      <View style={styles.icons_container}>
        <TouchableOpacity style={styles.icon}>
          <Image
            source={icons.facebook}
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Image
            source={icons.twitter}
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Image
            source={icons.instagram}
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  icons_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: vh * 4.61, // 35
    width: vw * 9.72, // 35
    borderRadius: (vw * 9.72) / 2,
    marginVertical: vh * 1.32, // 10
    marginHorizontal: vw * 1.5, // 10
  },
  text: {
    color: colors.text.black,
    marginVertical: vh * 0.66, // 5
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  }
});
