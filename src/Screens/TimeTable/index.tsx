import { StackScreenProps } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CustomHeader } from '../../Components/CustomHeader';
import { DataLoader } from '../../Components/DataLoader';
import { Layout } from '../../Components/Layout';
import { NotFound } from '../../Components/NotFound';
import { VIcon } from '../../Components/VIcon';
import { asyncDeleteTimeTableRecord, asyncGetAllClassTimeTable } from '../../Stores/actions/timeTable.action';
import { useAppSelector, useLoaderDispatch } from '../../Stores/hooks';
import { selectTimeTableByDay } from '../../Stores/slices/timeTable.slice';
import { colors } from '../../Theme/colors';
import { ETimeTableStack, TimeTableStackParams } from '../../Types/NavigationTypes';
import { TimeTableRecord } from '../../Types/TimeTable';
import { DaysEnum } from '../../Utils/options';
import { vh, vw } from '../../Utils/units';

type Props = StackScreenProps<TimeTableStackParams, 'timeTable'>;

export default function TimeTable({ navigation }: Props) {
  const [selectedDay, setSelectedDay] = useState('MON');

  const [timeTableLoader, getAllClassTimeTable] = useLoaderDispatch(asyncGetAllClassTimeTable);
  const [_, deleteTimeTableRecord] = useLoaderDispatch(asyncDeleteTimeTableRecord);

  const timeTableByDay = useAppSelector(selectTimeTableByDay(selectedDay));

  useEffect(() => {
    getAllClassTimeTable();
  }, [getAllClassTimeTable]);

  const handleTimeTableRecordDelete = (_id: string) => {
    Alert.alert('Warning', 'Are you sure you want to delete this time table record permanently?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => deleteTimeTableRecord({ timeTableRecordId: _id, day: selectedDay })
      },
    ]);
  }

  const renderItem = ({ item }: { item: TimeTableRecord }) => {
    return (
      <View style={styles.cardContainer}>
        <View style={{
          flexDirection: 'row',
          alignSelf: 'flex-end',
          gap: 5,
        }}>
          <TouchableOpacity onPress={() => navigation.navigate(ETimeTableStack.createTimeTable, {
            timeTableRecordId: item._id,
            day: item.day
          })}>
            <VIcon
              type="Feather"
              name={"edit-3"}
              size={15}
              color={colors.theme.darkGreen}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleTimeTableRecordDelete(item._id)}>
            <VIcon
              type="AntDesign"
              name={"delete"}
              size={15}
              color={colors.theme.darkRed}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.itemContent}>
          <Text style={[styles.titleText, styles.subject]}>{item.subject}</Text>
          <Text style={styles.titleText}>{item.description}</Text>
          <Text style={styles.titleText}>{item.startTime} - {item.endTime}</Text>
        </View>
        <View style={styles.borderLine} />
        <Text style={styles.titleText}>{item.meta}</Text>
      </View>
    );
  };

  const onSelectDay = (value: any) => {
    setSelectedDay(value);
  };

  if (timeTableLoader && !timeTableByDay.length) {
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
          ItemSeparatorComponent={() => <View style={{ margin: vh * 1.32 }} />}
          contentContainerStyle={styles.flatListContainer}
        /> :
          <NotFound text={"No timetable available\nPlease add a new timetable"} />}
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
    paddingVertical: vh * 1.32, // 10
    paddingHorizontal: vw * 2.78, // 10
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: colors.theme.borderColor,
    width: vw * 80,
    borderRadius: 10,
    paddingVertical: vh * 1.32, // 10
    paddingHorizontal: vw * 2.78, // 10
  },
  borderLine: {
    borderBottomWidth: 1,
    borderBottomColor: colors.theme.borderColor,
    marginVertical: vh * 1.32, // 10
  },
  itemContent: {
    gap: 5
  },
  subject: {
    fontSize: vh * 2.37, // 18
    color: colors.text.greyAlt2,
    fontWeight: 'bold',
    marginBottom: vh * 1.32, // 10
  },
  titleText: {
    fontSize: vh * 1.84, // 14
    color: colors.theme.black
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: vw * 5.5,
    marginVertical: vh * 1.32, // 10
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
    fontSize: vh * 1.58, // 12
    fontWeight: 'bold',
  },
  unSelectedTitle: {
    fontSize: vh * 1.58, // 12
    color: colors.theme.black
  },
})
