import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { colors } from '../../Theme/colors';

export const CompLoader = () => {
  return (
    <View style={styles.activityIndicatorWrapper}>
      <ActivityIndicator
        style={styles.loader}
        animating={true}
        size={'large'}
        color="black"
      />
      {/* If you want to image set source here */}
      {/* <Image
              source={require('../assets/images/loader.gif')}
              style={{ height: 80, width: 80 }}
              resizeMode="contain"
              resizeMethod="resize"
            /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  activityIndicatorWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 10,
    color: colors.theme.white,
    width: '100%',
    height: '100%'
  },
  loader: {
    height: 100,
    width: 100,
    fontSize: 30,
  },
});
