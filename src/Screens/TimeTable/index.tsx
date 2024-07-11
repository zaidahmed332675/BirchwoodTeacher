import { StackScreenProps } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CustomHeader } from '../../Components/CustomHeader';
import { DataLoader } from '../../Components/DataLoader';
import { Layout } from '../../Components/Layout';
import { NotFound } from '../../Components/NotFound';
import { VIcon } from '../../Components/VIcon';
import { asyncDeleteTimeTableRecord, asyncGetAllClassTimeTable } from '../../Stores/actions/timeTable.action';
import { useAppSelector, useLoaderDispatch } from '../../Stores/hooks';
import { selectTimeTableByDay } from '../../Stores/slices/timeTable.slice';
import { colors } from '../../theme/colors';
import { ETimeTableStack, TimeTableStackParams } from '../../Types/NavigationTypes';
import { TimeTableRecord } from '../../Types/TimeTable';
import { DaysEnum } from '../../Utils/options';
import { vh, vw } from '../../Utils/units';

type Props = StackScreenProps<TimeTableStackParams, 'timeTable'>;

export default function TimeTable({ navigation }: Props) {
  const [selectedDay, setSelectedDay] = useState('MON');

  const [timeTableLoader, getAllClassTimeTable] = useLoaderDispatch(asyncGetAllClassTimeTable);
  const timeTableByDay = useAppSelector(selectTimeTableByDay(selectedDay));

  const [_, deleteTimeTableRecord] = useLoaderDispatch(asyncDeleteTimeTableRecord, false);

  const handleTimeTableRecordDelete = (_id: string) => {
    deleteTimeTableRecord({ timeTableRecordId: _id, day: selectedDay })
  }

  useEffect(() => {
    getAllClassTimeTable({ classId: '6630e5f01364cb7fd294281c' });
  }, [getAllClassTimeTable]);

  const renderItem = ({ item }: { item: TimeTableRecord }) => {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.itemContent}>
          <Text style={styles.titleText}>{item.subject}</Text>
          <Text style={styles.titleText}>{item.startTime} - {item.endTime}</Text>
        </View>
        <View style={styles.borderLine} />
        <Text style={styles.titleText}>{item.meta}</Text>

        <View style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'row',
          gap: 5,
          top: 0,
          right: 0,
        }}>
          <TouchableOpacity onPress={() => navigation.navigate(ETimeTableStack.createTimeTable, {
            timeTableRecordId: item._id,
            day: item.day
          })}>
            <VIcon
              type="Feather"
              name={"edit-3"}
              size={20}
              color={colors.theme.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleTimeTableRecordDelete(item._id)}>
            <VIcon
              type="Ionicons"
              name={"close-circle-outline"}
              size={20}
              color={colors.theme.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const onSelectDay = (value: any) => {
    setSelectedDay(value);
  };

  if (timeTableLoader) {
    return <DataLoader />
  }

  return (
    <Layout customHeader={<CustomHeader title="Time Table" isActionEnbl={true}
      onPress={() => {
        navigation.navigate(ETimeTableStack.createTimeTable);
      }} />} >
      <View style={styles.container}>
        <View style={styles.stepperContainer}>
          {Object.keys(DaysEnum).map((item, indx) => (
            <TouchableOpacity
              key={indx}
              style={
                selectedDay === item
                  ? styles.stepperBtnSelected
                  : styles.stepperBtnUnSelected
              }
              onPress={() => onSelectDay(item)}>
              <Text
                style={
                  selectedDay === item
                    ? styles.selectedTitle
                    : styles.unSelectedTitle
                }>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {timeTableByDay.length ? <FlatList
          data={timeTableByDay}
          keyExtractor={item => `time_table_record_${item._id}`}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={{ margin: 10 }} />}
          contentContainerStyle={styles.flatListContainer}
        /> :
          <NotFound _textStyle={{ fontSize: 18 }} text={"Currently, there are no timetable entries available for this day."} />}
      </View>
    </Layout>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: vh * 2,
  },
  flatListContainer: {
    alignItems: 'center',
    padding: 10,
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: colors.theme.borderColor,
    width: vw * 80,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  borderLine: {
    borderBottomWidth: 1,
    borderBottomColor: colors.theme.borderColor,
    marginVertical: 10
  },
  itemContent: {
    gap: 5
  },
  titleText: {
    fontSize: 14,
    color: colors.theme.black
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: vw * 5.5,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: colors.theme.borderColor,
    borderRadius: vh * 2,
    height: vh * 3.5,
  },
  stepperBtnSelected: {
    backgroundColor: colors.theme.primary,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderRadius: vh * 2,
  },
  stepperBtnUnSelected: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  selectedTitle: {
    color: colors.theme.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  unSelectedTitle: {
    fontSize: 12,
    color: colors.theme.black
  },
})
