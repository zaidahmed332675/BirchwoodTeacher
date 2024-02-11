import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const DateCard = ({ day, date }: { day: string; date: string }) => {
  return (
    <View style={styles.dateCard}>
      <Text style={styles.day}>{day}</Text>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.day}>{2020}</Text>
    </View>
  );
};

export const DiaryCard = () => {
  return (
    <View style={styles.container}>
      <DateCard day={'Mon'} date={'16'} />
      <View style={styles.card}>
        <View style={styles.sideBorder} />
        <View style={styles.content}>
          <Text style={styles.title}>Parents Meeting</Text>
          <Text style={styles.description}>
            Please bring your parents tomorrow.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.theme.white,
  },
  card: {
    flexDirection: 'row',
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: colors.theme.white,
    borderRadius: 8,
    borderWidth: 0.3,
    borderColor: colors.theme.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  sideBorder: {
    height: 'auto',
    backgroundColor: colors.theme.primary,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    width: 6,
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    color: colors.text.greyAlt2,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    flexWrap: 'wrap',
    color: colors.text.greyAlt2,
  },
  dateCard: {
    flexGrow: 0,
    borderWidth: 0.5,
    borderColor: colors.theme.primary,
    // backgroundColor: colors.theme.primary,
    marginRight: 4,
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  day: {
    color: colors.theme.primary,
    fontWeight: '600',
  },
  date: {
    color: colors.theme.primary,
    fontWeight: 'bold',
    fontSize: 24,
  },
});
