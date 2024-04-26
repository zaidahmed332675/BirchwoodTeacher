import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '../../Components/Button';
import { GlroyBold } from '../../Components/GlroyBoldText';
import { GrayMediumText } from '../../Components/GrayMediumText';
import { Layout } from '../../Components/Layout';
import { UploadImage } from '../../Components/UploadImage';
import { EProfileStack, ProfileStackParams } from '../../Types/NavigationTypes';
import { colors } from '../../theme/colors';
import { CustomHeader } from '../../Components/CustomHeader';
import { asyncGetUserProfile } from '../../Stores/actions/user.action';
import { useAppSelector, useLoaderDispatch } from '../../Stores/hooks';
import { selectUserProfile } from '../../Stores/slices/user.slice';
import { DataLoader } from '../../Components/DataLoader';

type Props = StackScreenProps<ProfileStackParams, 'profile'>;

const Profile = ({ navigation }: Props) => {
  const [loading, getUserProfile] = useLoaderDispatch(asyncGetUserProfile);
  const profile = useAppSelector(selectUserProfile);

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  const profileold = {
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
              <UploadImage
                originalImage={undefined}
                image={{ uri: undefined }}
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
                text={profileold.personal.name}
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
                text={profileold.personal.age}
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
                text={profileold.personal.dob}
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
                text={profileold.personal.gender}
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
                text={profileold.personal.phone}
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
                text={profileold.personal.address}
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
                text={profileold.personal.city}
              />
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <GlroyBold
              _style={{
                color: colors.theme.primary,
                fontSize: 22,
              }}
              text="Institute - 01"
            />
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
                  text={profileold.personal.address}
                />
              </View>
              <View style={styles.userInfoItem}>
                <GrayMediumText
                  _style={{
                    color: colors.theme.primary,
                  }}
                  text="Starting Date"
                />
                <GrayMediumText
                  _style={{
                    color: colors.text.black,
                  }}
                  text={profileold.personal.address}
                />
              </View>
              <View style={styles.userInfoItem}>
                <GrayMediumText
                  _style={{
                    color: colors.theme.primary,
                  }}
                  text="Subject Study"
                />
                <GrayMediumText
                  _style={{
                    color: colors.text.black,
                  }}
                  text={profileold.personal.address}
                />
              </View>
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
                text={profileold.personal.name}
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
                text={profileold.personal.age}
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
                text={profileold.personal.dob}
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
                text={profileold.personal.gender}
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
                text={profileold.personal.phone}
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
                text={profileold.personal.address}
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
                text={profileold.personal.city}
              />
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <GlroyBold
              _style={{
                color: colors.theme.primary,
                fontSize: 22,
              }}
              text="Experience - 01"
            />
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
                  text={profileold.personal.address}
                />
              </View>
              <View style={styles.userInfoItem}>
                <GrayMediumText
                  _style={{
                    color: colors.theme.primary,
                  }}
                  text="Starting Date"
                />
                <GrayMediumText
                  _style={{
                    color: colors.text.black,
                  }}
                  text={profileold.personal.address}
                />
              </View>
              <View style={styles.userInfoItem}>
                <GrayMediumText
                  _style={{
                    color: colors.theme.primary,
                  }}
                  text="Ending Date"
                />
                <GrayMediumText
                  _style={{
                    color: colors.text.black,
                  }}
                  text={profileold.personal.address}
                />
              </View>
              <View style={styles.userInfoItem}>
                <GrayMediumText
                  _style={{
                    color: colors.theme.primary,
                  }}
                  text="Subject Taught"
                />
                <GrayMediumText
                  _style={{
                    color: colors.text.black,
                  }}
                  text={profileold.personal.address}
                />
              </View>
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
