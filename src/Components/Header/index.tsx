import { StyleSheet, Text, View, Image, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { vh, vw } from '../../Utils/units';
import { GlroyBold } from '../../Components/GlroyBoldText';
import { colors } from '../../Theme/colors';
import student from '../../Assets/icons/student.png';
import { appShadow } from '../../Theme/colors';
import LinearGradient from 'react-native-linear-gradient';
import { ImageBox } from '../../Components/UploadImage';
import { useAppSelector } from '../../Stores/hooks';
import { selectUserProfile } from '../../Stores/slices/user.slice';

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
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 3,
            }}>
            <View style={styles.student_year}>
              <Text style={{ fontSize: 12, color: colors.theme.black }}>
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
