import { format } from 'date-fns';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { asyncDeleteHomeWork } from '../../Stores/actions/diary.action';
import { useLoaderDispatch } from '../../Stores/hooks';
import { HomeWork } from '../../Types/Diary';
import { colors } from '../../theme/colors';
import { VIcon } from '../VIcon';

export const DateCard = ({ formattedDate: { day, date, month, year } }: { formattedDate: { day: string; date: string, month: string, year: string } }) => {
  return (
    <View style={styles.dateCard}>
      <Text style={styles.day}>{day}</Text>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.day}>{month}</Text>
      <Text style={styles.day}>{year}</Text>
    </View>
  );
};

export const DiaryCard = ({ item }: { item: HomeWork }) => {

  const [_, deleteHomeWork] = useLoaderDispatch(asyncDeleteHomeWork, false);

  const handleHomeWorkDelete = () => {
    deleteHomeWork({ homeWorkId: item._id })
  }

  const createAt = new Date(item.createdAt);
  const dueDate = new Date(item.dueDate);

  const formattedDate = {
    day: format(createAt, 'EEE'), // 'EEE' for abbreviated day name (e.g., 'Mon', 'Tue', etc.)
    date: format(createAt, 'dd'), // 'dd' for day of the month (two digits)
    month: format(createAt, 'MMM'), // 'MMM' for abbreviated month name (e.g., 'Jan', 'Feb', etc.)
    year: format(createAt, 'yyyy'), // 'yyyy' for full year (four digits)
  };

  return (
    <View style={styles.container}>
      <DateCard formattedDate={formattedDate} />
      <View style={[styles.card, item.type === "WARNING" ? styles.warningBorder : item.type === 'NOTICE' ? styles.noticeBorder : {}]} >
        <View style={[styles.sideBorder, item.type === "WARNING" ? styles.warningBg : item.type === 'NOTICE' ? styles.noticeBg : {}]} />
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>
            {item.description}
          </Text>
          <Text style={[styles.dueDate, {
            marginTop: 20,
            alignSelf: 'flex-start'
          }]}>
            Due Date: {format(dueDate, 'EEE dd yyyy')}
          </Text>
        </View>
        <View style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'row',
          gap: 5,
          top: 5,
          right: 5,
        }}>
          <TouchableOpacity>
            <VIcon
              type="Feather"
              name={"edit-3"}
              size={20}
              color={colors.theme.darkGreen}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleHomeWorkDelete}>
            <VIcon
              type="AntDesign"
              name={"delete"}
              size={20}
              color={colors.theme.darkRed}
            />
          </TouchableOpacity>
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
    position: 'relative'
  },
  sideBorder: {
    height: 'auto',
    backgroundColor: colors.theme.primary,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    width: 6,
  },
  warningBg: {
    backgroundColor: colors.theme.darkRed
  },
  noticeBg: {
    backgroundColor: '#FFA500'
  },
  warningBorder: {
    borderColor: colors.theme.darkRed
  },
  noticeBorder: {
    borderColor: '#FFA500'
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
  dueDate: {
    color: colors.theme.darkRed
  },
  dateCard: {
    flexGrow: 0,
    borderWidth: 0.5,
    borderColor: colors.theme.primary,
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
