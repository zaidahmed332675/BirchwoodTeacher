import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { VIcon } from '../../Components/VIcon';
import { colors } from '../../Theme/colors';
import { GrayMediumText } from '../GrayMediumText';
import { vh, vw } from '../../Utils/units';

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
      <View style={styles.titleContainer}>
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
          _style={[styles.title, { flexBasis: isActionEnbl ? '55%' : '88%', }]}
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
            _style={styles.addText}
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.text.white,
    marginLeft: vw * 2.78, // 10
    fontSize: vh * 2.37, // 18
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: vw * 5.56, // 20
    paddingVertical: vh * 0.66, // 5
    borderRadius: 15,
    backgroundColor: colors.theme.white,
  },
  addIcon: {
    backgroundColor: colors.theme.secondary,
    borderRadius: 10,
    marginRight: vw * 1.39, // 5
  },
  addText: {
    color: colors.theme.secondary,
    fontWeight: 'bold',
    fontSize: vh * 1.71, // 13,
  }
});
