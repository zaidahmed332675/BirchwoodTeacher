import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../theme/colors';
import GlroyBold from '../GlroyBoldText';

interface AppButtonProps {
  title: string;
  bordered?: boolean;
  icon?: string;
  _style?: object;
  onPress: () => void;
}

const AppButton = ({
  title,
  icon,
  _style,
  bordered = false,
  onPress,
}: AppButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        bordered
          ? styles.borderedButton
          : {
              backgroundColor: colors.background.primary,
            },
        _style,
      ]}
      onPress={onPress}>
      {icon && (
        <IonicIcon
          style={styles.icon}
          name="add"
          size={15}
          color={colors.text.altGrey}
        />
      )}
      <GlroyBold
        _style={{ color: bordered ? colors.text.white : colors.theme.primary }}
        text={title}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.theme.primary,
    marginVertical: 10,
  },
  icon: {
    marginRight: 5,
  },
  borderedButton: {
    borderColor: colors.text.altGrey,
  },
});

export default AppButton;
