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
import React, {useState} from 'react';
import {vh, vw} from '../../Utils/units';
import main_bg_img from '../../Assets/images/animated_bg.png';
import GlroyBold from '../../Components/GlroyBoldText';
import profile_icon from '../../Assets/images/profile_bg.png';
import {colors} from '../../theme/colors';
import UserProfileCircle from '../../Components/ProfileCircle';
import student from '../../Assets/icons/student.png';
import {appShadow} from '../../theme/colors';
import {featureIcons} from '../../Assets';
import {icons} from '../../Assets/icons';
import GrayMediumText from '../../Components/GrayMediumText';
import {useNavigation} from '@react-navigation/native';
import routes from '../../Navigation/routes';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [profile, setProfile] = useState({
    name: 'Allen',
    year: '2023 - 2024',
    photo: '',
  });

  const data = [
    {id: 1, title: 'Profile', icon: featureIcons.profile},
    {id: 2, title: 'Activity', icon: featureIcons.activity},
    {id: 3, title: 'Time Table', icon: featureIcons.time_table},
    {id: 4, title: 'Assignment', icon: featureIcons.assignment},
    {id: 5, title: 'Result', icon: featureIcons.result},
    {id: 6, title: 'Events', icon: featureIcons.events},
    {id: 7, title: 'Ask Doubts', icon: featureIcons.ask_doubts},
    {id: 8, title: 'School Gallery', icon: featureIcons.school_gallery},
    {id: 9, title: 'Leave Application', icon: featureIcons.leave_application},
    {id: 10, title: 'School Holiday', icon: featureIcons.school_holiday},
    {id: 11, title: 'Logout', icon: featureIcons.logout},
    {id: 12, title: 'Change Password', icon: featureIcons.change_password},
  ];

  const handleNavigate = value => {
    if (value === 'Profile') navigation.navigate(routes.screens.profile);
    else if (value === 'Activity')
      navigation.navigate(routes.screens.childProfile);
    else if (value === 'Time Table')
      navigation.navigate(routes.screens.healthDetails);
    //    else if(value === 'Assignment') navigation.navigate(routes.screens.profileForm)
  };

  // const data = Array.from({ length: 10 }, (_, index) => ({ id: index.toString(), title: `item${index + 1}` }));

  const renderItem = ({item, indx}) => {
    return (
      <TouchableOpacity
        style={[styles.card]}
        onPress={() => handleNavigate(item.title)}>
        <View style={styles.iconContainer}>
          <Image source={item.icon} style={styles.featureIcons} />
        </View>
        <GlroyBold
          text={item.title}
          _style={{fontSize: 12, color: colors.text.black, marginTop: 8}}
        />
      </TouchableOpacity>
    );
  };

  const headerCards = () => {
    return (
      <View style={styles.twoCardsTopContainer}>
        <View style={[styles.twoCardsTop, {marginRight: 10}]}>
          <View
            style={[
              styles.cardInnerView,
              {backgroundColor: colors.theme.yellow0},
            ]}>
            <Image source={icons.usr} style={styles.topCardIcon} />
          </View>
          <GlroyBold
            text={'80.39%'}
            _style={{fontSize: 20, color: colors.text.black, marginVertical: 3}}
          />
          <GrayMediumText text={'Attendance'} />
        </View>
        <View style={[styles.twoCardsTop, {marginLeft: 10}]}>
          <View
            style={[
              styles.cardInnerView,
              {backgroundColor: colors.theme.pink0},
            ]}>
            <Image source={icons.dollar} style={styles.topCardIcon} />
          </View>
          <GlroyBold
            text={'$00.00'}
            _style={{fontSize: 20, color: colors.text.black, marginVertical: 3}}
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
                <Text style={{fontSize: 12}}>{profile.year}</Text>
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
            disabled={true}
            _style={styles.profilePhoto}
          />
        </View>
      </ImageBackground>
      {/* <View style={styles.borderLine}/> */}
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        numColumns={2}
        ListHeaderComponent={headerCards}
        contentContainerStyle={styles.flatListContainer}
      />
    </>
  );
}

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
  iconContainer: {
    height: 24,
    width: 24,
    borderRadius: 12,
  },
  featureIcons: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  twoCardsTopContainer: {
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
    // alignItems: 'center',
    height: vh * 15,
    width: vw * 38,
    borderRadius: 10,
    paddingLeft: 15,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  flatListContainer: {
    // backgroundColor:'red',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
