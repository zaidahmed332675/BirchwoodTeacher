import React, { useState } from 'react';
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import student from '../../Assets/icons/student.png';
import { GlroyBold } from '../../Components/GlroyBoldText';
import { ImageBox } from '../../Components/UploadImage';
import { useAppSelector } from '../../Stores/hooks';
import { selectUserProfile } from '../../Stores/slices/user.slice';
import { colors } from '../../Theme/colors';
import { vh, vw } from '../../Utils/units';

export const Header = () => {
  const user = useAppSelector(selectUserProfile);
  const currentYear = new Date().getFullYear();

  const [profile] = useState({
    name: `${user.firstName} ${user.lastName}`,
    year: `${currentYear} - ${currentYear + 1}`,
    photo: `${user?.image ? user.image : ''}`,
  });

  return (
    <LinearGradient
      colors={[colors.theme.primary, colors.theme.secondary]}
      locations={[0, 1]}
      style={styles.header}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <View style={styles.profile_container}>
        <View>
          <GlroyBold text={`Hi ${profile.name}`} _style={styles.profile_text} />
          <View
            style={styles.year_icon_box}>
            <View style={styles.student_year}>
              <Text style={styles.year}>
                {profile.year}
              </Text>
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
        <ImageBox
          image={{ uri: profile.photo }}
          _imageStyle={styles.profilePhoto}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  profile_text: {
    fontSize: vh * 2.11, // 16
    fontWeight: 'bold',
    color: colors.theme.white,
  },
  profile_container: {
    marginTop: vh * 8,
    marginVertical: vh * 2.63, // 20
    marginHorizontal: vw * 5.56, // 20
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  year_icon_box: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: vh * 0.39, // 3
  },
  student_year: {
    backgroundColor: colors.theme.white,
    paddingHorizontal: vw * 3.33, // 12,
    paddingVertical: vh * 0.4, // 3,
    borderRadius: 12,
  },
  year: {
    fontSize: vh * 1.58, // 12
    color: colors.theme.black
  },
  student_icon: {
    marginLeft: 5,
    height: vh * 3.29, // 25
    width: vw * 6.94, // 25
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.theme.white,
  },
  student_icon_img: {
    height: vh * 1.97, // 15
    width: vw * 4.17, // 15
  },
  profilePhoto: {
    width: vw * 16.67, // 60
    height: vh * 7.89, // 60
    borderWidth: 2,
    borderColor: colors.theme.white,
  },
  header: {
    paddingHorizontal: vw * 5.56, // 20
    paddingBottom: vh * 1.32, // 10
    borderColor: colors.theme.primary,
    backgroundColor: colors.theme.primary,
    borderBottomLeftRadius: 38,
    borderBottomRightRadius: 38,
  },
});
