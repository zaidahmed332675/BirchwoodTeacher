import {
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, { Ref, forwardRef } from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../../apptheme/colors';

interface AppBottomSheetProps extends Partial<BottomSheetModalProps> {
  children: React.ReactNode;
  snapPoints?: string[];
  _sheetStyle?: object;
  _handleStyle?: object;
}

export const AppBottomSheet = forwardRef(
  (
    {
      snapPoints = ['50%', '75%', '100%'],
      _sheetStyle,
      _handleStyle,
      children,
      ...rest
    }: AppBottomSheetProps,
    ref: Ref<BottomSheetModal>
  ) => {
    return (
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={ref}
          backgroundStyle={{
            borderRadius: 40,
          }}
          enablePanDownToClose
          handleStyle={[styles.handleStyle, _handleStyle]}
          handleIndicatorStyle={{ backgroundColor: 'white' }}
          index={0}
          snapPoints={snapPoints}
          style={styles.bottomSheet}
          {...rest}>
          <BottomSheetView style={[styles.bottomSheetView, _sheetStyle]}>
            {children}
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    );
  }
);

const styles = StyleSheet.create({
  handleStyle: {
    backgroundColor: colors.theme.greyAlt,
  },
  bottomSheet: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: 'hidden',
  },
  bottomSheetView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  titleStyle: {
    paddingHorizontal: 24,
  },
});
