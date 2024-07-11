import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { VIcon } from '../../Components/VIcon';
import { colors } from '../../theme/colors';
import { GrayMediumText } from '../GrayMediumText';

export const CustomHeader = ({
  title,
  onPress,
  isActionEnbl = false,
}: {
  title: string;
  onPress?: () => void;
  isActionEnbl?: boolean;
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.titlContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <VIcon
            type="Ionicons"
            name="chevron-back-outline"
            size={30}
            color={colors.theme.white}
          />
        </TouchableOpacity>
        <GrayMediumText
          text={title}
          _style={{
            color: colors.text.white,
            marginLeft: 10,
            fontSize: 18,
            flexBasis: isActionEnbl ? '55%' : '88%',
          }}
        />
      </View>
      {isActionEnbl && (
        <TouchableOpacity style={styles.actionContainer} onPress={onPress}>
          <VIcon
            type="Ionicons"
            name="add-outline"
            size={15}
            color={colors.theme.white}
            style={styles.addIcon}
          />
          <GrayMediumText
            text="Add"
            _style={{
              color: colors.theme.secondary,
              fontWeight: 'bold',
              fontSize: 13,
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 15,
    backgroundColor: colors.theme.white,
  },
  addIcon: {
    backgroundColor: colors.theme.secondary,
    borderRadius: 10,
    marginRight: 5,
  },
});
