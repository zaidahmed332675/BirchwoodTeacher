import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '../../Components/Button';
import { CustomHeader } from '../../Components/CustomHeader';
import { GlroyBold } from '../../Components/GlroyBoldText';
import { GrayMediumText } from '../../Components/GrayMediumText';
import { Layout } from '../../Components/Layout';
import { ImageBox } from '../../Components/UploadImage';
import { ClassStackParams } from '../../Types/NavigationTypes';
import { vh } from '../../Utils/units';
import { colors } from '../../theme/colors';

type Props = StackScreenProps<ClassStackParams, 'studentInfo'>;

const StudentInfo = ({ }: Props) => {
  const data = [
    {
      id: '1',
      date: 'Monday',
      checkIn: '08:20 AM',
      checkOut: '01:00 PM',
    },
    {
      id: '2',
      date: 'Tuesday',
      checkIn: '08:10 AM',
      checkOut: '01:00 PM',
    },
    {
      id: '3',
      date: 'Wednesday',
      checkIn: '08:00 AM',
      checkOut: '01:00 PM',
    },
    {
      id: '4',
      date: 'Thursday',
      checkIn: '07:50 AM',
      checkOut: '01:00 PM',
    },
    {
      id: '5',
      date: 'Friday',
      checkIn: '00:00 AM',
      checkOut: '00:00 PM',
    },
  ];

  const reports = [
    {
      id: '1',
      title: 'Weekly Report',
      description: 'View the weekly attendance report',
    },
    {
      id: '2',
      title: 'Monthly Report',
      description: 'View the monthly attendance report',
    },
  ];

  // const [formData, setFormData] = useState({
  //   name: '',
  //   class: '',
  // });

  // function handleChange(name, value) {
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // }

  const reportsCards = (items: any, indx: number) => {
    return (
      <View
        key={indx}
        style={[styles.reportCard, { marginTop: indx !== 0 ? 20 : 5 }]}>
        <View style={{ flex: 1 }}>
          <GrayMediumText
            text={items.title}
            _style={{
              color: colors.theme.black,
            }}
          />
          <GrayMediumText
            text={items.description}
            _style={{
              fontSize: 12,
              color: colors.theme.grey,
              fontWeight: 'normal',
            }}
          />
        </View>
        <AppButton
          title="View Report"
          onPress={() => { }}
          btnStyle={{
            paddingVertical: 8,
            paddingHorizontal: 20,
            bordeRadius: 100,
          }}
          textStyle={{
            fontSize: 10,
          }}
        />
      </View>
    );
  };

  return (
    <Layout customHeader={<CustomHeader title={'Student Information'} />}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={{ alignItems: 'center' }}>
            <ImageBox image={{ uri: '' }} _imageStyle={styles.profilePhoto} />
            <GlroyBold
              text="Allien"
              _style={{ marginVertical: 8, color: colors.theme.black }}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <GrayMediumText text="Class XI-B" />
              <GrayMediumText
                text={'|'}
                _style={{
                  fontSize: 16,
                  marginHorizontal: 5,
                }}
              />
              <GrayMediumText text="Roll no. 04" />
            </View>
          </View>

          <View style={{ alignItems: 'center', marginTop: 8 }}>
            <AppButton title="Check In" onPress={() => { }} />
          </View>

          <View
            style={{ alignItems: 'center', marginTop: 30, marginBottom: 10 }}>
            <GrayMediumText
              text="Current Weekly Attendance"
              _style={{
                color: colors.theme.black,
              }}
            />
          </View>

          <View style={styles.attendanceTableContainer}>
            <View style={styles.tableHeading}>
              {['Date', 'Check-in', 'Check-out'].map((item, indx) => {
                return (
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      paddingVertical: 5,
                    }}
                    key={indx}>
                    <Text style={{ fontSize: 14, color: colors.theme.black }}>
                      {item}
                    </Text>
                  </View>
                );
              })}
            </View>
            <View style={{ margin: 1 }} />
            {data.map((item, indx) => {
              return (
                <View
                  style={[
                    styles.tableItems,
                    { borderBottomWidth: data.length - 1 === indx ? 0 : 1 },
                  ]}
                  key={indx}>
                  <GrayMediumText
                    text={item.date}
                    _style={styles.attendanceItem}
                  />
                  <GrayMediumText
                    text={item.checkIn}
                    _style={styles.attendanceItem}
                  />
                  <GrayMediumText
                    text={item.checkOut}
                    _style={styles.attendanceItem}
                  />
                </View>
              );
            })}
          </View>

          <View
            style={{ alignItems: 'center', marginTop: 30, marginBottom: 10 }}>
            <GrayMediumText
              text="Reports"
              _style={{
                color: colors.theme.black,
              }}
            />
          </View>

          {reports.map((items, indx) => reportsCards(items, indx))}
        </View>
      </ScrollView>
    </Layout>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: vh * 2.5,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: colors.theme.primary,
  },
  attendanceTableContainer: {
    borderWidth: 1,
    borderColor: colors.theme.borderColor,
    borderRadius: 10,
    backgroundColor: colors.theme.greyAlt,
  },
  tableHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.theme.borderColor,
    padding: 5,
  },
  tableItems: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.theme.borderColor,
    borderBottomColor: colors.theme.borderColor,
  },
  attendanceItem: {
    padding: 15,
    flex: 1,
    textAlign: 'center',
    color: colors.theme.black,
    fontSize: 13,
    alignSelf: 'center',
  },
  reportCard: {
    borderWidth: 1,
    padding: 10,
    backgroundColor: colors.theme.greyAlt,
    borderColor: colors.theme.borderColor,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default StudentInfo;
