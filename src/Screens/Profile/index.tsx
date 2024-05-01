import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '../../Components/Button';
import { CustomHeader } from '../../Components/CustomHeader';
import { DataLoader } from '../../Components/DataLoader';
import { GlroyBold } from '../../Components/GlroyBoldText';
import { GrayMediumText } from '../../Components/GrayMediumText';
import { Layout } from '../../Components/Layout';
import { ImageBox } from '../../Components/UploadImage';
import { asyncGetUserProfile } from '../../Stores/actions/user.action';
import { useAppSelector, useLoaderDispatch } from '../../Stores/hooks';
import { selectUserProfile } from '../../Stores/slices/user.slice';
import { EProfileStack, ProfileStackParams } from '../../Types/NavigationTypes';
import { colors } from '../../theme/colors';

type Props = StackScreenProps<ProfileStackParams, 'profile'>;

const Profile = ({ navigation }: Props) => {
  const [loading, getUserProfile] = useLoaderDispatch(asyncGetUserProfile);
  const profile = useAppSelector(selectUserProfile);

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  const profileold = {
    education: [
      {
        instituteName:
          'Federal Urdu University of Arts, Science & Technology, Karachi.',
        degree: "Bachelor's degree",
        startingDate: '2016',
        endingDate: '2020',
        fieldOfStudy: 'Computer Science',
      },
    ],
    experience: [
      {
        officeName: 'TheCoding Buzz',
        designation: 'MERN Stack Developer',
        startingDate: '2016',
        endingDate: 'Present',
      },
    ],
  };

  if (loading) {
    return <DataLoader />;
  }

  return (
    <Layout customHeader={<CustomHeader title="Profile" />}>
      <ScrollView
        style={styles.content}
        contentInsetAdjustmentBehavior="automatic">
        <View style={styles.item}>
          <View style={styles.profileGrid}>
            <View style={styles.profile}>
              <ImageBox
                image={{ uri: profile.image }}
                _imageStyle={styles.profilePhoto}
              />
            </View>
            <Text
              style={
                styles.title
              }>{`${profile.firstName} ${profile.lastName}`}</Text>
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
                text={`${profile.firstName} ${profile.lastName}`}
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
                text={profile.phone || 'N/A'}
              />
            </View>
            <View style={styles.userInfoItem}>
              <GrayMediumText
                _style={{
                  color: colors.theme.primary,
                }}
                text="Email"
              />
              <GrayMediumText
                _style={{
                  color: colors.text.black,
                }}
                text={profile.email || 'N/A'}
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
                text={profile.city || 'N/A'}
              />
            </View>
            <View style={styles.userInfoItem}>
              <GrayMediumText
                _style={{
                  color: colors.theme.primary,
                }}
                text="State"
              />
              <GrayMediumText
                _style={{
                  color: colors.text.black,
                }}
                text={profile.state || 'N/A'}
              />
            </View>
            <View style={styles.userInfoItem}>
              <GrayMediumText
                _style={{
                  color: colors.theme.primary,
                }}
                text="Zip"
              />
              <GrayMediumText
                _style={{
                  color: colors.text.black,
                }}
                text={profile.zip || 'N/A'}
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
                text={profile.address || 'N/A'}
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
          {profileold.education?.map((edu, ind) => (
            <View key={'edu-' + ind}>
              {ind > 0 && (
                <View
                  style={{
                    backgroundColor: colors.theme.secondary,
                    height: 0.3,
                  }}
                />
              )}
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <View style={styles.userInfoItem}>
                  <GrayMediumText
                    _style={{
                      color: colors.theme.primary,
                    }}
                    text="Institute Name"
                  />
                  <GrayMediumText
                    _style={{
                      color: colors.text.black,
                    }}
                    text={edu.instituteName}
                  />
                </View>
                <View style={styles.userInfoItem}>
                  <GrayMediumText
                    _style={{
                      color: colors.theme.primary,
                    }}
                    text="Field of study"
                  />
                  <GrayMediumText
                    _style={{
                      color: colors.text.black,
                    }}
                    text={`${edu.degree}, ${edu.fieldOfStudy}`}
                  />
                </View>
                <View style={styles.userInfoItem}>
                  <GrayMediumText
                    _style={{
                      color: colors.theme.primary,
                    }}
                    text="Start - End Date"
                  />
                  <GrayMediumText
                    _style={{
                      color: colors.text.black,
                    }}
                    text={`${edu.startingDate} - ${edu.endingDate}`}
                  />
                </View>
              </View>
            </View>
          ))}
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
          {profileold.experience?.map((exp, ind) => (
            <View key={'exp-' + ind}>
              {ind > 0 && (
                <View
                  style={{
                    backgroundColor: colors.theme.secondary,
                    height: 0.3,
                  }}
                />
              )}
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <View style={styles.userInfoItem}>
                  <GrayMediumText
                    _style={{
                      color: colors.theme.primary,
                    }}
                    text="Job Title"
                  />
                  <GrayMediumText
                    _style={{
                      color: colors.text.black,
                    }}
                    text={exp.designation}
                  />
                </View>
                <View style={styles.userInfoItem}>
                  <GrayMediumText
                    _style={{
                      color: colors.theme.primary,
                    }}
                    text="Office Name"
                  />
                  <GrayMediumText
                    _style={{
                      color: colors.text.black,
                    }}
                    text={exp.officeName}
                  />
                </View>
                <View style={styles.userInfoItem}>
                  <GrayMediumText
                    _style={{
                      color: colors.theme.primary,
                    }}
                    text="Start - End Date"
                  />
                  <GrayMediumText
                    _style={{
                      color: colors.text.black,
                    }}
                    text={`${exp.startingDate} - ${exp.endingDate}`}
                  />
                </View>
              </View>
            </View>
          ))}
          <View style={styles.actionsBtnView}>
            <AppButton
              btnStyle={styles.actionBtn}
              title="Edit Experience"
              onPress={() => navigation.navigate(EProfileStack.editExperience)}
            />
          </View>
        </View>
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
    paddingVertical: 20,
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
  profilePhoto: {
    borderWidth: 3,
    borderColor: colors.theme.primary,
  },
  userInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  userInfoItem: {
    minWidth: '50%',
    flexGrow: 1,
    marginTop: 16,
    paddingRight: 2,
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
});

export default Profile;
