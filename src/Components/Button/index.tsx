import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';
import { GlroyBold } from '../GlroyBoldText';
import { VIcon } from '../VIcon';

interface AppButtonProps {
  title: string;
  bordered?: boolean;
  icon?: boolean;
  btnStyle?: object;
  textStyle?: object;
  onPress: () => void;
}

const AppButton = ({
  title,
  icon,
  btnStyle,
  textStyle,
  bordered = false,
  onPress,
}: AppButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        bordered ? styles.borderedButton : undefined,
        btnStyle,
      ]}
      onPress={onPress}>
      {icon && (
        <VIcon
          type="Ionicons"
          name="add"
          size={15}
          color={colors.text.altGrey}
          style={styles.icon}
        />
      )}
      <GlroyBold
        _style={
          bordered
            ? { ...styles.borderedButtonText, ...textStyle }
            : { ...styles.buttonText, ...textStyle }
        }
        text={title}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.theme.primary,
    backgroundColor: colors.theme.primary,
  },
  borderedButton: {
    borderColor: colors.text.altGrey,
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: colors.text.white,
  },
  borderedButtonText: {
    fontSize: 14,
    fontWeight: 'normal',
    color: colors.text.altGrey,
  },
  icon: {
    marginRight: 5,
  },
});

export { AppButton };
