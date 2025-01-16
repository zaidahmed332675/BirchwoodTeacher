import React from 'react';
import { StatusBar, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { colors } from '../../Theme/colors';
import { statusBarHeight, vh, vw } from '../../Utils/units';
import LinearGradient from 'react-native-linear-gradient';
import { BottomBackground } from '../BottomBackground';
// import { AppBottomSheet } from '../../Components/AppBottomSheet';

interface LayoutProps {
  children: React.ReactNode;
  customHeader?: React.ReactNode;
  _styleSheetView?: object;
  _styleSheetViewContent?: object;
  showBottom?: boolean;
}

export const Layout = ({
  children,
  customHeader,
  _styleSheetView,
  _styleSheetViewContent,
  showBottom = true,
}: LayoutProps) => {
  return (
    <LinearGradient
      colors={[colors.theme.primary, colors.theme.secondary]}
      locations={[0.02, 0.2]}
      style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <View style={styles.header}>{customHeader}</View>
      <View style={styles.bottomSheet}>
        <View style={[styles.bottomSheetView, _styleSheetView]}>
          <View style={[styles.bottomSheetViewContent, _styleSheetViewContent]}>
            {children}
          </View>
          {/* {children} */}
          {showBottom && <BottomBackground />}
        </View>
      </View>
      {/* <BottomSheet>{children}</BottomSheet> */}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: statusBarHeight + (vh * 3.95), // 30
    marginVertical: vh * 3.95, // 30
    marginHorizontal: vw * 2.78, // 10
    marginRight: vw * 5.56, // 20
  },
  bottomSheet: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: 'hidden',
    backgroundColor: colors.theme.white,
  },
  bottomSheetView: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: 'hidden',
  },
  bottomSheetViewContent: {
    flex: 1,
    paddingHorizontal: vw * 2.78, // 10
    marginHorizontal: vw * 2.78, // 10
    backgroundColor: colors.theme.white,
  },
});
