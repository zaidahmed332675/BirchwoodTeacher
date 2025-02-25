import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { featureIcons } from '../../Assets';
import { icons } from '../../Assets/icons';
import { GlroyBold } from '../../Components/GlroyBoldText';
import { GrayMediumText } from '../../Components/GrayMediumText';
import { Header } from '../../Components/Header';
import { VIcon } from '../../Components/VIcon';
import { store } from '../../Stores';
import { asyncGetChildrenByClassId } from '../../Stores/actions/class.action';
import { asyncShowError } from '../../Stores/actions/common.action';
import { asyncCheckOutUser, asyncSignOut } from '../../Stores/actions/user.action';
import { useAppDispatch, useAppSelector, useLoaderDispatch } from '../../Stores/hooks';
import { selectChildren, setChild } from '../../Stores/slices/class.slice';
import { selectUserProfile } from '../../Stores/slices/user.slice';
import { appShadow, colors } from '../../Theme/colors';
import { EMainStack, MainStackParams } from '../../Types/NavigationTypes';
import { attendanceEnum } from '../../Utils/options';
import { vh, vw } from '../../Utils/units';
import { socket } from '../../Utils/socket';

type Props = StackScreenProps<MainStackParams, 'home'>;

const HomeScreen = ({ navigation }: Props) => {

  const dispatch = useAppDispatch()

  const profile = useAppSelector(selectUserProfile)
  const [_, getChildrenByClassId] = useLoaderDispatch(asyncGetChildrenByClassId);
  const childrens = useAppSelector(selectChildren)

  useEffect(() => {
    if (profile?.classroom?._id) getChildrenByClassId()
  }, [profile?.classroom?._id, getChildrenByClassId]);

  const handleCheckInAndLeave = (record: any) => {
    let { childId, attendance } = record
    dispatch(setChild({ _id: childId, todayAttendance: attendance }))
  }

  const handleNotification = (notification: any) => {
    console.log("Notification Received", notification);
  }

  useEffect(() => {
    socket.on(`notification`, handleNotification);
    socket.on(`childCheckIn`, handleCheckInAndLeave);
    socket.on(`childLeave`, handleCheckInAndLeave);
    return () => {
      socket.off(`notification`, handleNotification);
      socket.off(`childCheckIn`, handleCheckInAndLeave);
      socket.off(`childLeave`, handleCheckInAndLeave);
    };
  }, []);

  const isClassBasedLocked = !profile?.classroom?._id
  const isNotCheckedIn = profile?.todayAttendance?.status !== attendanceEnum.PRESENT;

  const data = [
    // {
    //   id: 1,
    //   title: 'Profile',
    //   icon: featureIcons.profile,
    //   route: EMainStack.profileRoutes,
    // },
    {
      id: 2,
      title: 'My Class',
      icon: featureIcons.profile,
      route: EMainStack.myClassRoutes,
      isLocked: isClassBasedLocked
    },
    {
      id: 3,
      title: 'Posts',
      icon: featureIcons.activity,
      route: EMainStack.postRoutes,
      isLocked: isClassBasedLocked
    },
    {
      id: 4,
      title: 'Work Diary',
      icon: featureIcons.assignment,
      route: EMainStack.diaryRoutes,
      isLocked: isClassBasedLocked
    },
    {
      id: 5,
      title: 'Attendance',
      icon: featureIcons.time_table,
      route: EMainStack.attendanceRoutes,
    },
    {
      id: 6,
      title: 'Time Table',
      icon: featureIcons.time_table,
      route: EMainStack.timeTableRoutes,
      isLocked: isClassBasedLocked
    },
    {
      id: 7,
      title: 'Change Password',
      icon: featureIcons.change_password,
      route: EMainStack.changePassword,
    },
    { id: 8, title: 'Check Out', icon: featureIcons.logout, route: 'checkOut', isLocked: isNotCheckedIn, },
    { id: 9, title: 'Logout', icon: featureIcons.logout, route: 'logOut' },
    // {
    //   id: 5,
    //   title: 'Chat',
    //   icon: featureIcons.time_table,
    //   route: EMainStack.chatRoutes,
    // },
    // { id: 5, title: 'Time Table', icon: featureIcons.time_table, route: '' },
    // { id: 6, title: 'Events', icon: featureIcons.events, route: '' },
    // { id: 7, title: 'Ask Doubts', icon: featureIcons.ask_doubts, route: '' },
    // {
    //   id: 8,
    //   title: 'School Gallery',
    //   icon: featureIcons.school_gallery,
    //   route: '',
    // },
    // {
    //   id: 9,
    //   title: 'Leave Application',
    //   icon: featureIcons.leave_application,
    //   route: '',
    // },
    // {
    //   id: 10,
    //   title: 'School Holiday',
    //   icon: featureIcons.school_holiday,
    //   route: '',
    // },
  ];

  const handleNavigate = async (route: keyof MainStackParams, isLocked: boolean) => {
    if (route === EMainStack.logOut) {
      return await store.dispatch(asyncSignOut()).unwrap();
    } else if (route === EMainStack.checkOut) {
      if (isLocked) return store.dispatch(asyncShowError('Check-out is available only for staff who are marked as checked-in'))
      const date = new Date();
      const checkOutDateTime = date.toISOString();
      return await store.dispatch(asyncCheckOutUser({ checkOut: checkOutDateTime })).unwrap();
    } else {
      if (isLocked) return store.dispatch(asyncShowError('Currently, no class have been assigned'))
      navigation.navigate(route);
    }
  };

  const renderItem = useCallback(({
    item,
  }: {
    item: {
      id: number;
      title: string;
      icon: any;
      route: keyof MainStackParams;
      isLocked: boolean;
    };
  }) => {
    return (
      <TouchableOpacity
        style={[styles.card, item.isLocked && { backgroundColor: colors.theme.greyAlt }]}
        onPress={() => handleNavigate(item.route, item.isLocked)}>
        {item.isLocked && <View style={{
          position: 'absolute',
          top: 10,
          right: 10,
        }}>
          <VIcon
            type="MaterialIcons"
            name={"lock"}
            size={16}
            color={colors.theme.primary}
          />
        </View>}
        <View style={styles.iconContainer}>
          <Image source={item.icon} style={styles.featureIcons} />
        </View>
        <GlroyBold
          text={item.title}
          _style={styles.cardTitle}
        />
      </TouchableOpacity>
    );
  }, [isClassBasedLocked, isNotCheckedIn]);

  const headerCards = () => {
    return (
      <View style={styles.twoCardsTopContainer}>
        <View style={styles.twoCardsTop}>
          <View
            style={[
              styles.cardInnerView,
              { backgroundColor: colors.theme.yellow0 },
            ]}>
            <Image source={icons.usr} style={styles.topCardIcon} />
          </View>
          <GlroyBold
            text="80.39%"
            _style={styles.attendanceCardText}
          />
          <GrayMediumText text="Attendance" />
        </View>
        <View style={styles.twoCardsTop}>
          <View
            style={[
              styles.cardInnerView,
              { backgroundColor: colors.theme.pink0 },
            ]}>
            <Image source={icons.dollar} style={styles.topCardIcon} />
          </View>
          <GlroyBold
            text={String(childrens.length)}
            _style={styles.totalStudentCardText}
          />
          <GrayMediumText text={'Total Students'} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header handleNavigation={() => {
        navigation.navigate(EMainStack.profileRoutes);
      }} />
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={renderItem}
        numColumns={2}
        ListHeaderComponent={headerCards}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  twoCardsTopContainer: {
    marginTop: vh * 2.63, // 20
    marginBottom: vh * 1.32, // 10
    flexDirection: 'row',
    gap: 20,
  },
  twoCardsTop: {
    ...appShadow(4),
    borderRadius: 10,
    height: vh * 23,
    width: vw * 38,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardInnerView: {
    height: vh * 9.21, // 70
    width: vw * 19.44, // 70
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topCardIcon: {
    width: vw * 9.72, // 35
    height: vh * 4.61, // 35
    resizeMode: 'contain',
  },
  attendanceCardText: {
    fontSize: vh * 2.63, // 20
    color: colors.text.black,
    marginVertical: vh * 0.39, // 3
  },
  totalStudentCardText: {
    fontSize: vh * 2.63, // 20
    color: colors.text.black,
    marginVertical: vh * 0.39, // 3
  },
  card: {
    marginVertical: vh * 1.32, // 10
    marginHorizontal: vw * 2.78, // 10
    backgroundColor: colors.card.card1,
    justifyContent: 'center',
    position: 'relative',
    height: vh * 15,
    width: vw * 38,
    borderRadius: 10,
    paddingVertical: vh * 1.97, // 15
    paddingHorizontal: vw * 4.17, // 15
  },
  cardTitle: {
    fontSize: vh * 1.84, // 14
    color: colors.text.black,
    marginTop: vh * 1.05, // 8
    textAlign: 'center',
  },
  iconContainer: {
    height: vh * 4.47, // 34
    width: vw * 9.44, // 34
    borderRadius: 12,
    alignSelf: 'center',
  },
  featureIcons: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  flatListContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default HomeScreen;
