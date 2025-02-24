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
import { colors } from '../../Theme/colors';
import { format, isAfter } from 'date-fns';
import { vh, vw } from '../../Utils/units';

type Props = StackScreenProps<ProfileStackParams, 'profile'>;

const Profile = ({ navigation }: Props) => {
  const [loading, getUserProfile] = useLoaderDispatch(asyncGetUserProfile);
  const profile = useAppSelector(selectUserProfile);

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

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
            _style={styles.sectionTitle}
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
            _style={styles.sectionTitle}
            text="Education"
          />
          {profile.education.length ?
            <View style={styles.dataBox}>
              {profile.education?.map((edu, ind) => (
                <View key={'edu-' + ind}>
                  {ind > 0 && (
                    <View
                      style={
                        [styles.divider, {
                        }]
                      }
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
                        text={edu.school}
                      />
                    </View>
                    <View style={styles.userInfoItem}>
                      <GrayMediumText
                        _style={{
                          color: colors.theme.primary,
                        }}
                        text="Subjects"
                      />
                      <GrayMediumText
                        _style={{
                          color: colors.text.black,
                        }}
                        text={edu.subject.join(', ')}
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
                        text={`${format(edu.start, 'yyyy-MM-dd')} - ${isAfter(new Date(), edu.end) ? format(edu.end, 'yyyy-MM-dd') : 'Present'}`}
                      />
                    </View>
                  </View>
                </View>
              ))}
            </View> :
            <View style={styles.noDataBox}>
              <GrayMediumText
                _style={{
                  color: colors.theme.greyAlt2,
                }}
                text="You haven't added any education"
              />
            </View>}
          <View style={[styles.actionsBtnView]}>
            <AppButton
              btnStyle={styles.actionBtn}
              title={profile.education.length ? "Edit Education" : "Add Education"}
              onPress={() => navigation.navigate(EProfileStack.editEducation)}
            />
          </View>
        </View>

        <View style={styles.item}>
          <GlroyBold
            _style={styles.sectionTitle}
            text="Experience"
          />
          {profile.employment.length ?
            <View style={styles.dataBox}>
              {profile.employment?.map((emp, ind) => (
                <View key={'exp-' + ind}>
                  {ind > 0 && (
                    <View
                      style={
                        [styles.divider, {
                        }]
                      }
                    />
                  )}
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
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
                        text={emp.school}
                      />
                    </View>
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
                        text={emp.position}
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
                        text={`${format(emp.start, 'yyyy-MM-dd')} - ${isAfter(new Date(), emp.end) ? format(emp.end, 'yyyy-MM-dd') : 'Present'}`}
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
                        text={emp.address}
                      />
                    </View>
                  </View>
                </View>
              ))}
            </View> :
            <View style={styles.noDataBox}>
              <GrayMediumText
                _style={{
                  color: colors.theme.greyAlt2,
                }}
                text="You haven't added any experience"
              />
            </View>}
          <View style={styles.actionsBtnView}>
            <AppButton
              btnStyle={styles.actionBtn}
              title={profile.employment.length ? "Edit Experience" : "Add Experience"}
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
    paddingVertical: vh * 2.63, // 20
    marginTop: vh * 2.63, // 20
  },
  profileGrid: {
    marginBottom: vh * 3.16, // 24
  },
  profile: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: vw * 3.61, // 13
    width: '100%',
  },
  profilePhoto: {
    borderWidth: 3,
    borderColor: colors.theme.primary,
  },
  sectionTitle: {
    color: colors.theme.primary,
    fontSize: vh * 2.89, // 22
  },
  userInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: vh * 6.58, // 50
  },
  userInfoItem: {
    minWidth: '50%',
    flexGrow: 1,
    marginTop: vh * 2.11, // 16
    paddingRight: vw * 0.56, // 2
  },
  title: {
    fontSize: vh * 3.68, // 28
    lineHeight: 33.6,
    color: colors.theme.primary,
    textAlign: 'center',
    marginTop: vh * 3.16, // 24
  },
  actionsBtnView: {
    alignItems: 'center',
  },
  actionBtn: {
    flex: 1,
    width: '100%',
  },
  divider: {
    backgroundColor: colors.theme.white,
    borderBottomWidth: 0.2,
    borderColor: colors.theme.secondary,
    borderRadius: 20,
    paddingTop: vh * 2.11, // 16
  },
  dataBox: {
    marginBottom: vh * 6.58, // 50
  },
  noDataBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: vh * 2.63, // 20
    paddingHorizontal: vw * 5.56, // 20
  }
});

export default Profile;
