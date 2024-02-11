import React from 'react';
// import BottomSheet from '../../Components/BottomSheet';
import { StatusBar, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { statusBarHeight } from '../../Utils/units';
import LinearGradient from 'react-native-linear-gradient';
import { BottomBackground } from '../BottomBackground';

interface LayoutProps {
  children: React.ReactNode;
  customHeader?: React.ReactNode;
  _styleSheetView?: object;
  showBottom?: boolean;
}

const Layout = ({
  children,
  customHeader,
  _styleSheetView,
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
          {children}
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
    marginTop: statusBarHeight + 30,
    marginVertical: 30,
    marginHorizontal: 10,
    marginRight: 20,
  },
  bottomSheet: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: 'hidden',
  },
  bottomSheetView: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: 'hidden',
    paddingHorizontal: 20,
    backgroundColor: colors.theme.white,
  },
});

export default Layout;
