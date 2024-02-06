import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  StatusBar,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { vh, vw } from '../../Utils/units';
import main_bg_img from '../../Assets/images/animated_bg.png';
import GlroyBold from '../../Components/GlroyBoldText';
import profile_icon from '../../Assets/images/profile_bg.png';
import { colors } from '../../theme/colors';
import UserProfileCircle from '../../Components/ProfileCircle';
import student from '../../Assets/icons/student.png';
import { appShadow } from '../../theme/colors';
import { featureIcons } from '../../Assets';
import { icons } from '../../Assets/icons';
import GrayMediumText from '../../Components/GrayMediumText';
import { MainStackParams } from '../../Types/NavigationTypes';
import { StackScreenProps } from '@react-navigation/stack';

type Props = StackScreenProps<MainStackParams, 'home'>;

const HomeScreen = ({ navigation }: Props) => {
  const [profile] = useState({
    name: 'Zaid Ahmed',
    year: '2024 - 2025',
    photo: '',
  });

  const data = [
    {
      id: 1,
      title: 'Profile',
      icon: featureIcons.profile,
      route: 'profileRoutes',
    },
    {
      id: 2,
      title: 'Activity',
      icon: featureIcons.activity,
      route: 'activityRoutes',
    },
    {
      id: 3,
      title: 'Assignment',
      icon: featureIcons.assignment,
      route: 'diaryRoutes',
    },
    {
      id: 5,
      title: 'Chat',
      icon: featureIcons.time_table,
      route: 'chatRoutes',
    },
    {
      id: 5,
      title: 'Attendance',
      icon: featureIcons.time_table,
      route: 'attendanceRoutes',
    },
    {
      id: 11,
      title: 'Change Password',
      icon: featureIcons.change_password,
      route: '',
    },
    { id: 12, title: 'Logout', icon: featureIcons.logout, route: '' },
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

  const handleNavigate = (route: keyof MainStackParams) => {
    navigation.navigate(route);
  };

  const renderItem = ({
    item,
  }: {
    item: {
      id: number;
      title: string;
      icon: any;
      route: keyof MainStackParams;
    };
  }) => {
    return (
      <TouchableOpacity
        style={[styles.card]}
        onPress={() => handleNavigate(item.route)}>
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
            text={'80.39%'}
            _style={{
              fontSize: 20,
              color: colors.text.black,
              marginVertical: 3,
            }}
          />
          <GrayMediumText text={'Attendance'} />
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
            text={'$00.00'}
            _style={{
              fontSize: 20,
              color: colors.text.black,
              marginVertical: 3,
            }}
          />
          <GrayMediumText text={'Fees Due'} />
        </View>
      </View>
    );
  };

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <ImageBackground
        source={main_bg_img}
        style={[styles.bg_img]}
        resizeMode="cover">
        <View style={styles.profile_container}>
          <View>
            <GlroyBold
              text={`Hi ${profile.name}`}
              _style={styles.profile_text}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 3,
              }}>
              <View style={styles.student_year}>
                <Text style={{ fontSize: 12 }}>{profile.year}</Text>
              </View>
              <View style={styles.student_icon}>
                <Image
                  source={student}
                  style={styles.student_icon_img}
                  resizeMode="contain"
                  tintColor={colors.theme.primary}
                />
              </View>
            </View>
          </View>
          <UserProfileCircle
            profileUri={profile_icon}
            _style={styles.profilePhoto}
          />
        </View>
      </ImageBackground>

      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={renderItem}
        numColumns={2}
        ListHeaderComponent={headerCards}
        contentContainerStyle={styles.flatListContainer}
      />
    </>
  );
};

const styles = StyleSheet.create({
  bg_img: {
    height: vh * 30,
    position: 'relative',
    overflow: 'hidden',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
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
    ...appShadow,
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
    borderWidth: 2,
    borderColor: colors.theme.white,
  },
  card: {
    margin: 10,
    backgroundColor: colors.card.card1,
    justifyContent: 'center',
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
  columnWrapper: {
    justifyContent: 'space-between',
  },
  flatListContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default HomeScreen;
