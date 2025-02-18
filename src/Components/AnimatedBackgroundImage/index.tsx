import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Animated,
  Keyboard,
  Image,
  StatusBar,
  ImageURISource,
} from 'react-native';
import main_bg_img from '../../Assets/images/animated_bg.png';
import right_icon from '../../Assets/images/icon_right.png';
import left_icon from '../../Assets/images/icon_left.png';
import { vh } from '../../Utils/units';

interface AnimatedBackgroundImageProps {
  // source?: string;
  additionalImage: Animated.WithAnimatedObject<ImageURISource>;
}

export const AnimatedBackgroundImage = ({
  // source,
  additionalImage,
}: AnimatedBackgroundImageProps) => {
  const [imageHeight] = useState(new Animated.Value(vh * 36.32)); // 200
  const additionalImageHeight = useMemo(() => new Animated.Value(vh * 48), []); // 320
  // const animatedOpacity = useRef(new Animated.Value(1)).current;
  // const additionalImageMarginTop = useMemo(() => new Animated.Value(-10), []);
  // const statusBarHeight = StatusBar.currentHeight || 0;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        Animated.parallel([
          Animated.timing(imageHeight, {
            toValue: 100, // Adjust the value based on your design
            duration: 300,
            useNativeDriver: false,
          }),
          Animated.timing(additionalImageHeight, {
            toValue: 190, // Adjust the value based on your design
            duration: 300,
            useNativeDriver: false,
          }),
          // Animated.timing(additionalImageMarginTop, {
          //   toValue: -20 - statusBarHeight, // Adjust the value based on your design (reduce margin top)
          //   duration: 300,
          //   useNativeDriver: false,
          // }),
        ]).start();
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        Animated.parallel([
          Animated.timing(imageHeight, {
            toValue: vh * 36.32, // Back to the initial height
            duration: 300,
            useNativeDriver: false,
          }),
          Animated.timing(additionalImageHeight, {
            toValue: vh * 48, // Back to the initial size
            duration: 300,
            useNativeDriver: false,
          }),
          // Animated.timing(additionalImageMarginTop, {
          //   toValue: -20 - statusBarHeight, // Back to the initial margin top
          //   duration: 300,
          //   useNativeDriver: false,
          // }),
        ]).start();
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [
    imageHeight,
    additionalImageHeight,
    // additionalImageMarginTop,
    // statusBarHeight,
  ]);

  return (
    <Animated.View style={[styles.container, { height: imageHeight }]}>
      <ImageBackground
        source={main_bg_img}
        style={styles.image}
        resizeMode="cover">
        <Image source={left_icon} style={styles.additionalImageLeft} />
        <Animated.Image
          source={additionalImage}
          style={[
            styles.additionalImageCenter,
            {
              height: additionalImageHeight,
              // marginTop: additionalImageMarginTop,
            },
          ]}
        />
        <Image source={right_icon} style={styles.additionalImageRight} />
      </ImageBackground>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  additionalImageCenter: {
    // backgroundColor: 'red',
    position: 'absolute',
    width: "100%",
    bottom: 0,
    zIndex: 1,
    resizeMode: 'contain',
  },
  additionalImageLeft: {
    position: 'absolute',
    width: 30,
    height: 30,
    top: 100,
    left: 80,
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
  additionalImageRight: {
    position: 'absolute',
    width: 45,
    height: 45,
    bottom: 40,
    right: 5,
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
});
