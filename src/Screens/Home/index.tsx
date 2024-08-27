import { StackScreenProps } from '@react-navigation/stack';
import React, { StrictMode, useEffect } from 'react';
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
import { store } from '../../Stores';
import { asyncGetChildrenByClassId } from '../../Stores/actions/class.action';
import { asyncCheckOutUser, asyncSignOut } from '../../Stores/actions/user.action';
import { useAppSelector, useLoaderDispatch } from '../../Stores/hooks';
import { EMainStack, MainStackParams } from '../../Types/NavigationTypes';
import { vh, vw } from '../../Utils/units';
import { appShadow, colors } from '../../theme/colors';
import { selectUserProfile } from '../../Stores/slices/user.slice';
import { VIcon } from '../../Components/VIcon';
import { asyncShowError } from '../../Stores/actions/common.action';
import { attendanceEnum } from '../../Utils/options';

type Props = StackScreenProps<MainStackParams, 'home'>;

const HomeScreen = ({ navigation }: Props) => {

  const profile = useAppSelector(selectUserProfile)
  const [_, getChildrenByClassId] = useLoaderDispatch(asyncGetChildrenByClassId);

  useEffect(() => {
    if (profile?.classroom?._id) getChildrenByClassId()
  }, [getChildrenByClassId]);
  console.log(profile, 'cheking')

  const data = [
    {
      id: 1,
      title: 'Profile',
      icon: featureIcons.profile,
      route: EMainStack.profileRoutes,
    },
    {
      id: 2,
      title: 'My Class',
      icon: featureIcons.profile,
      route: EMainStack.myClassRoutes,
      isLocked: !profile?.classroom?._id
    },
    {
      id: 3,
      title: 'Posts',
      icon: featureIcons.activity,
      route: EMainStack.postRoutes,
      isLocked: !profile?.classroom?._id
    },
    {
      id: 4,
      title: 'Work Diary',
      icon: featureIcons.assignment,
      route: EMainStack.diaryRoutes,
      isLocked: !profile?.classroom?._id
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
      isLocked: !profile?.classroom?._id
    },
    {
      id: 7,
      title: 'Change Password',
      icon: featureIcons.change_password,
      route: EMainStack.changePassword,
    },
    { id: 8, title: 'Check Out', icon: featureIcons.logout, route: 'checkOut', isLocked: profile.todayAttendance?.status !== attendanceEnum.PRESENT },
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
      if (isLocked) return store.dispatch(asyncShowError('Checkout unavailable while on leave'))
      const date = new Date();
      const checkOutDateTime = date.toISOString();
      return await store.dispatch(asyncCheckOutUser({ checkOut: checkOutDateTime })).unwrap();
    } else {
      if (isLocked) return store.dispatch(asyncShowError('Currently, no class have been assigned'))
      navigation.navigate(route);
    }
  };

  const renderItem = ({
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
          _style={{
            fontSize: 14,
            color: colors.text.black,
            marginTop: 8,
            textAlign: 'center',
          }}
        />
      </TouchableOpacity>
    );
  };

  const headerCards = () => {
    return (
      <View style={styles.twoCardsTopContainer}>
        <View style={[styles.twoCardsTop, { marginRight: 10 }]}>
          <View
            style={[
              styles.cardInnerView,
              { backgroundColor: colors.theme.yellow0 },
            ]}>
            <Image source={icons.usr} style={styles.topCardIcon} />
          </View>
          <GlroyBold
            text="80.39%"
            _style={{
              fontSize: 20,
              color: colors.text.black,
              marginVertical: 3,
            }}
          />
          <GrayMediumText text="Attendance" />
        </View>
        <View style={[styles.twoCardsTop, { marginLeft: 10 }]}>
          <View
            style={[
              styles.cardInnerView,
              { backgroundColor: colors.theme.pink0 },
            ]}>
            <Image source={icons.dollar} style={styles.topCardIcon} />
          </View>
          <GlroyBold
            text="35"
            _style={{
              fontSize: 20,
              color: colors.text.black,
              marginVertical: 3,
            }}
          />
          <GrayMediumText text={'Total Students'} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header />
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
  topCardIcon: {
    height: 35,
    width: 35,
    resizeMode: 'contain',
  },
  featureIcons: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  twoCardsTopContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardInnerView: {
    margin: 15,
    height: 70,
    width: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  twoCardsTop: {
    ...appShadow(4),
    borderRadius: 10,
    height: vh * 23,
    width: vw * 38,
    marginBottom: 12,
    alignItems: 'center',
  },
  profile_text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.theme.white,
  },
  profile_container: {
    marginTop: vh * 8,
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  student_year: {
    backgroundColor: colors.theme.white,
    paddingHorizontal: 12,
    padding: 1.5,
    borderRadius: 12,
  },
  student_icon: {
    marginLeft: 5,
    height: 25,
    width: 25,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.theme.white,
  },
  student_icon_img: {
    height: 15,
    width: 15,
  },
  profilePhoto: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: colors.theme.white,
  },
  card: {
    margin: 10,
    backgroundColor: colors.card.card1,
    justifyContent: 'center',
    position: 'relative',
    height: vh * 15,
    width: vw * 38,
    borderRadius: 10,
    padding: 15,
  },
  iconContainer: {
    height: 34,
    width: 34,
    borderRadius: 12,
    alignSelf: 'center',
  },
  flatListContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderColor: colors.theme.primary,
    backgroundColor: colors.theme.primary,
    borderBottomLeftRadius: 38,
    borderBottomRightRadius: 38,
  },
});

export default HomeScreen;
