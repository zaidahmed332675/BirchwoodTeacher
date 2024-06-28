import React from 'react';
import { StyleSheet, View } from 'react-native';
import { vh } from '../../Utils/units';
import { colors } from '../../theme/colors';
import { CustomHeader } from '../CustomHeader';
import { GrayMediumText } from '../GrayMediumText';
import { Layout } from '../Layout';

export const DataLoader = ({ text = 'Loading Data' }) => {
  return (
    <Layout customHeader={<CustomHeader title="Loading..." />}>
      <View style={styles.noItem}>
        <View style={styles.card}>
          <GrayMediumText _style={styles.noItemText} text={text} />
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  noItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    paddingVertical: vh * 3,
    alignItems: 'center',
  },
  noItemText: {
    color: colors.theme.primary,
    fontSize: 22,
  },
});
