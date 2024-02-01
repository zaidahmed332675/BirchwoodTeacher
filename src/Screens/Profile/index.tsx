import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import AppButton from '../../Components/Button';
// import UploadImage from '../../Components/UploadImage';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native';
import Layout from '../../Components/Layout';
import { EProfileStack, ProfileStackParams } from '../../Types/NavigationTypes';
import { colors } from '../../theme/colors';
// import { ProfileStackParams } from '../../Types/NavigationType';
// import { colors, fonts } from '../../Utils/theme';
import Ionicon from 'react-native-vector-icons/Ionicons';
import GlroyBold from '../../Components/GlroyBoldText';
import GrayMediumText from '../../Components/GrayMediumText';
import UploadImage from '../../Components/UploadImage';

type Props = StackScreenProps<ProfileStackParams, 'profile'>;

const ProfileCustomHeader = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.titlContainer}>
        <Ionicon
          onPress={() => navigation.goBack()}
          name="chevron-back-outline"
          size={30}
          color={colors.theme.white}
        />
        <Text
          style={{
            color: colors.text.white,
            marginLeft: 10,
            fontWeight: 'bold',
            fontSize: 18,
          }}>
          Profile
        </Text>
      </View>
    </View>
  );
};

const Profile = ({ navigation }: Props) => {
  const profile = {
    personal: {
      name: 'Zaid Ahmed',
      dob: '15-02-1997',
      age: '26',
      gender: 'Male',
      phone: '0309-1245985',
      address: 'Quaidabad',
      city: 'Karachi',
    },
    education: {
      instituteName: '',
      startingDate: '',
      EndingDate: '',
      subject: '',
    },
    experience: {
      instituteName: '',
      startingDate: '',
      endingDate: '',
      subjectTaught: '',
    },
  };

  return (
    <Layout customHeader={<ProfileCustomHeader />}>
      <ScrollView
        style={styles.content}
        contentInsetAdjustmentBehavior="automatic">
        <View style={styles.item}>
          <View style={styles.profileGrid}>
            <View style={styles.profile}>
              <UploadImage image={{ uri: undefined }} />
            </View>
            <Text style={styles.title}>{profile.personal.name}</Text>
          </View>
          <GlroyBold
            _style={{
              color: colors.theme.primary,
              fontSize: 22,
            }}
            text="Personal Information"
          />
          <View style={styles.userInfo}>
            <View style={styles.userInfoItem}>
              <GrayMediumText
                _style={{
                  color: colors.theme.primary,
                }}
                text="Name"
              />
              <GrayMediumText
                _style={{
                  color: colors.text.black,
                }}
                text={profile.personal.name}
              />
            </View>
            <View style={styles.userInfoItem}>
              <GrayMediumText
                _style={{
                  color: colors.theme.primary,
                }}
                text="Age"
              />
              <GrayMediumText
                _style={{
                  color: colors.text.black,
                }}
                text={profile.personal.age}
              />
            </View>
            <View style={styles.userInfoItem}>
              <GrayMediumText
                _style={{
                  color: colors.theme.primary,
                }}
                text="Date "
              />
              <GrayMediumText
                _style={{
                  color: colors.text.black,
                }}
                text={profile.personal.dob}
              />
            </View>
            <View style={styles.userInfoItem}>
              <GrayMediumText
                _style={{
                  color: colors.theme.primary,
                }}
                text="Gender"
              />
              <GrayMediumText
                _style={{
                  color: colors.text.black,
                }}
                text={profile.personal.gender}
              />
            </View>
            <View style={styles.userInfoItem}>
              <GrayMediumText
                _style={{
                  color: colors.theme.primary,
                }}
                text="Phone"
              />
              <GrayMediumText
                _style={{
                  color: colors.text.black,
                }}
                text={profile.personal.phone}
              />
            </View>
            <View style={styles.userInfoItem}>
              <GrayMediumText
                _style={{
                  color: colors.theme.primary,
                }}
                text="Address"
              />
              <GrayMediumText
                _style={{
                  color: colors.text.black,
                }}
                text={profile.personal.address}
              />
            </View>
            <View style={styles.userInfoItem}>
              <GrayMediumText
                _style={{
                  color: colors.theme.primary,
                }}
                text="City"
              />
              <GrayMediumText
                _style={{
                  color: colors.text.black,
                }}
                text={profile.personal.city}
              />
            </View>
          </View>
          <View style={styles.actionsBtnView}>
            <AppButton
              btnStyle={styles.actionBtn}
              title="Edit Personal Info"
              onPress={() =>
                navigation.navigate(EProfileStack.editPersonalInfo)
              }
            />
          </View>
        </View>

        <View style={styles.item}>
          <GlroyBold
            _style={{
              color: colors.theme.primary,
              fontSize: 22,
            }}
            text="Education"
          />
          <View style={styles.userInfo}>
            <View style={styles.userInfoItem}>
              <GrayMediumText
                _style={{
                  color: colors.theme.primary,
                }}
                text="Name"
              />
              <GrayMediumText
                _style={{
                  color: colors.text.black,
                }}
                text={profile.personal.name}
              />
            </View>
            <View style={styles.userInfoItem}>
              <GrayMediumText
                _style={{
                  color: colors.theme.primary,
                }}
                text="Age"
              />
              <GrayMediumText
                _style={{
                  color: colors.text.black,
                }}
                text={profile.personal.age}
              />
            </View>
            <View style={styles.userInfoItem}>
              <GrayMediumText
                _style={{
                  color: colors.theme.primary,
                }}
                text="Date "
              />
              <GrayMediumText
                _style={{
                  color: colors.text.black,
                }}
                text={profile.personal.dob}
              />
            </View>
            <View style={styles.userInfoItem}>
              <GrayMediumText
                _style={{
                  color: colors.theme.primary,
                }}
                text="Gender"
              />
              <GrayMediumText
                _style={{
                  color: colors.text.black,
                }}
                text={profile.personal.gender}
              />
            </View>
            <View style={styles.userInfoItem}>
              <GrayMediumText
                _style={{
                  color: colors.theme.primary,
                }}
                text="Phone"
              />
              <GrayMediumText
                _style={{
                  color: colors.text.black,
                }}
                text={profile.personal.phone}
              />
            </View>
            <View style={styles.userInfoItem}>
              <GrayMediumText
                _style={{
                  color: colors.theme.primary,
                }}
                text="Address"
              />
              <GrayMediumText
                _style={{
                  color: colors.text.black,
                }}
                text={profile.personal.address}
              />
            </View>
            <View style={styles.userInfoItem}>
              <GrayMediumText
                _style={{
                  color: colors.theme.primary,
                }}
                text="City"
              />
              <GrayMediumText
                _style={{
                  color: colors.text.black,
                }}
                text={profile.personal.city}
              />
            </View>
          </View>
          <View style={styles.actionsBtnView}>
            <AppButton
              btnStyle={styles.actionBtn}
              title="Edit Education"
              onPress={() => navigation.navigate(EProfileStack.editEducation)}
            />
          </View>
        </View>

        <View style={styles.item}>
          <GlroyBold
            _style={{
              color: colors.theme.primary,
              fontSize: 22,
            }}
            text="Experience"
          />
          <View style={styles.userInfo}>
            <View style={styles.userInfoItem}>
              <GrayMediumText
                _style={{
                  color: colors.theme.primary,
                }}
                text="Name"
              />
              <GrayMediumText
                _style={{
                  color: colors.text.black,
                }}
                text={profile.personal.name}
              />
            </View>
            <View style={styles.userInfoItem}>
              <GrayMediumText
                _style={{
                  color: colors.theme.primary,
                }}
                text="Age"
              />
              <GrayMediumText
                _style={{
                  color: colors.text.black,
                }}
                text={profile.personal.age}
              />
            </View>
            <View style={styles.userInfoItem}>
              <GrayMediumText
                _style={{
                  color: colors.theme.primary,
                }}
                text="Date "
              />
              <GrayMediumText
                _style={{
                  color: colors.text.black,
                }}
                text={profile.personal.dob}
              />
            </View>
            <View style={styles.userInfoItem}>
              <GrayMediumText
                _style={{
                  color: colors.theme.primary,
                }}
                text="Gender"
              />
              <GrayMediumText
                _style={{
                  color: colors.text.black,
                }}
                text={profile.personal.gender}
              />
            </View>
            <View style={styles.userInfoItem}>
              <GrayMediumText
                _style={{
                  color: colors.theme.primary,
                }}
                text="Phone"
              />
              <GrayMediumText
                _style={{
                  color: colors.text.black,
                }}
                text={profile.personal.phone}
              />
            </View>
            <View style={styles.userInfoItem}>
              <GrayMediumText
                _style={{
                  color: colors.theme.primary,
                }}
                text="Address"
              />
              <GrayMediumText
                _style={{
                  color: colors.text.black,
                }}
                text={profile.personal.address}
              />
            </View>
            <View style={styles.userInfoItem}>
              <GrayMediumText
                _style={{
                  color: colors.theme.primary,
                }}
                text="City"
              />
              <GrayMediumText
                _style={{
                  color: colors.text.black,
                }}
                text={profile.personal.city}
              />
            </View>
          </View>
          <View style={styles.actionsBtnView}>
            <AppButton
              btnStyle={styles.actionBtn}
              title="Edit Experience"
              onPress={() => navigation.navigate(EProfileStack.editExperience)}
            />
          </View>
        </View>

        {/* <View style={styles.actionsBtnView}>
            <AppButton
              style={styles.actionBtn}
              title="Edit Personal Info"
              onPress={() => navigation.navigate('editProfile')}
            />
            <AppButton
              style={styles.actionBtn}
              title="Edit Education"
              onPress={() => navigation.navigate('changePassword')}
            />
            <AppButton
              style={styles.actionBtn}
              title="Edit Experience"
              onPress={() => navigation.navigate('changePassword')}
            />
          </View> */}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  item: {
    backgroundColor: colors.theme.white,
    borderBottomWidth: 0.2,
    borderColor: colors.theme.secondary,
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
  },
  profileGrid: {
    marginBottom: 24,
  },
  profile: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 13,
    width: '100%',
  },
  userInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  userInfoItem: {
    minWidth: '50%',
    flexGrow: 1,
    marginTop: 16,
  },
  title: {
    fontSize: 28,
    lineHeight: 33.6,
    color: colors.theme.primary,
    textAlign: 'center',
    marginTop: 24,
  },
  actionsBtnView: {
    alignItems: 'center',
    marginTop: 50,
  },
  actionBtn: {
    flex: 1,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titlContainer: { flexDirection: 'row', alignItems: 'center' },
});

export default Profile;
