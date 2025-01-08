import {
  BottomSheetFooterProps,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetView
} from '@gorhom/bottom-sheet';
import React, { FC, Ref, forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { BackHandler, StyleSheet } from 'react-native';
import { colors } from '../../Theme/colors';
import { BottomSheetMethods, BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { SpringConfig } from 'react-native-reanimated/lib/typescript/reanimated2/animation/springUtils';
import { WithTimingConfig } from 'react-native-reanimated';

interface AppBottomSheetProps extends Partial<BottomSheetModalProps> {
  children: React.ReactNode;
  footerComponent?: FC<BottomSheetFooterProps>;
  snapPoints?: string[];
  _sheetStyle?: object;
  _handleStyle?: object;
  isSheetOpen: boolean;
}

export const AppBottomSheet = forwardRef(
  (
    {
      snapPoints = ['50%', '75%', '100%'],
      _sheetStyle,
      _handleStyle,
      children,
      footerComponent,
      isSheetOpen,
      ...rest
    }: AppBottomSheetProps,
    ref
  ) => {

    const bottomSheetRef = useRef<BottomSheetModal>(null)

    useImperativeHandle(ref, () => {
      const methods = bottomSheetRef.current as BottomSheetModalMethods;
      return {
        present: () => methods?.present(),
        dismiss: () => methods?.dismiss(),
      };
    });

    useEffect(() => {
      const handleBackPress = () => {
        if (isSheetOpen) {
          bottomSheetRef.current?.dismiss()
          return true;
        }
        return false;
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

      return () => backHandler.remove();
    }, [isSheetOpen]);

    return (
      <BottomSheetModal
        ref={bottomSheetRef}
        enableDismissOnClose
        enablePanDownToClose
        // index={0}
        // keyboardBehavior={keyboardBehavior}
        // keyboardBehavior="extend"
        // android_keyboardInputMode='adjustResize'
        keyboardBlurBehavior="restore"
        handleStyle={[styles.handleStyle, _handleStyle]}
        handleIndicatorStyle={{ backgroundColor: colors.theme.white }}
        snapPoints={snapPoints}
        footerComponent={footerComponent}
        style={styles.bottomSheet}
        backgroundStyle={{
          borderRadius: 40,
        }}
        {...rest}
      >
        <BottomSheetView style={[styles.bottomSheetView, _sheetStyle]}>
          {children}
        </BottomSheetView>
      </BottomSheetModal>
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
