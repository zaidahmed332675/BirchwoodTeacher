import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { BottomBackground } from '../../Components/BottomBackground';
import AppDatePicker from '../../Components/DatePicker/DatePicker';
import Layout from '../../Components/Layout';
import { MarkAttendance } from '../../Components/MarkAttendance';
import { CustomSwitch } from '../../Components/Switch';
import VIcon from '../../Components/VIcon';
import { AttendanceStackParams } from '../../Types/NavigationTypes';
import { colors } from '../../theme/colors';

type Props = StackScreenProps<AttendanceStackParams, 'attendance'>;

const CustomHeader = () => {
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
        <Text
          style={{
            color: colors.text.white,
            marginLeft: 10,
            fontWeight: 'bold',
            fontSize: 18,
          }}>
          Attendance
        </Text>
      </View>
    </View>
  );
};

const Attendance = ({}: Props) => {
  const onSelectSwitch = (index: number) => {
    console.log(index);
  };

  return (
    <Layout customHeader={<CustomHeader />}>
      <View style={styles.customSwitch}>
        <CustomSwitch
          selectionMode={1}
          roundCorner={true}
          option1={'Attendance'}
          option2={'Holiday'}
          onSelectSwitch={onSelectSwitch}
          selectionColor={colors.theme.primary}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <AppDatePicker />
        <MarkAttendance />
      </ScrollView>
      <BottomBackground />
    </Layout>
  );
};

const styles = StyleSheet.create({
  customSwitch: {
    marginVertical: 20,
    alignItems: 'center',
  },
  diaryRecord: {
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titlContainer: { flexDirection: 'row', alignItems: 'center' },
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

export default Attendance;
