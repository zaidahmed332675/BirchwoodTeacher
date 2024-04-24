import React from 'react';
import { StyleSheet, View } from 'react-native';
import { vw } from '../../Utils/units';
import { colors } from '../../theme/colors';
import { GrayMediumText } from '../GrayMediumText';

export const HolidayCard = ({ item }: any) => {
  return (
    <View style={styles.container}>
      <GrayMediumText
        text={item.title}
        _style={{ color: colors.theme.black }}
      />
      <View style={styles.contentBody}>
        <View style={{ flex: 1 }}>
          <GrayMediumText
            text={item.date}
            _style={{ color: colors.theme.grey }}
          />
        </View>
        <View>
          <GrayMediumText
            text="Tuesday"
            _style={{ color: colors.theme.grey }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: vw * 3.7,
    borderWidth: 1,
    borderColor: colors.theme.greyAlt,
    borderRadius: 10,
    padding: 10,
  },
  head: {
    fontWeight: 'bold',
    marginVertical: 10,
    marginHorizontal: vw * 3.7,
  },
  contentBody: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  title: {
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
  },
});
