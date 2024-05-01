import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import { AppInput } from '../../Components/AppInput';
import { AppButton } from '../../Components/Button';
import { CustomHeader } from '../../Components/CustomHeader';
import { GrayMediumText } from '../../Components/GrayMediumText';
import { Layout } from '../../Components/Layout';
import { UploadImage } from '../../Components/UploadImage';
import { asyncShowError } from '../../Stores/actions/common.action';
import { useAppDispatch, useAppSelector } from '../../Stores/hooks';
import { selectUserProfile } from '../../Stores/slices/user.slice';
import { colors } from '../../theme/colors';
import { ProfileStackParams } from '../../Types/NavigationTypes';

type Props = StackScreenProps<ProfileStackParams, 'editPersonalInfo'>;

export default function EditPersonalInfo({}: Props) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserProfile);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<any>({
    defaultValues: {
      firstName: '',
      lastName: '',
      gender: '',
      phone: '',
      image: { uri: '' },
    },
  });

  const onSubmit = useCallback(
    async (data: any) => {
      let formData = new FormData();
      let body: any = {};
      console.log('Data Profile Edit >>', data);

      if (data.firstName !== user?.firstName) {
        body.firstName = data.firstName;
        formData.append('firstName', data.firstName);
      }

      if (data.lastName !== user?.lastName) {
        body.lastName = data.lastName;
        formData.append('lastName', data.lastName);
      }

      if (data.phone !== user?.phone) {
        body.phone = data.phone;
        formData.append('phone', data.phone);
      }

      if (data.image?.fileName) {
        body.image = data.image.uri;

        formData.append('image', {
          uri: data.image.uri,
          type: data.image.type,
          name: data.image.fileName,
        });
      }

      console.log('Body Data >>>', body);

      if (Object.keys(body).length === 0) {
        return dispatch(asyncShowError('No changes have been made!'));
      } else {
        console.log('Form Data >>>>>', formData);
        // await dispatch(asyncUpdateProfile(formData)).unwrap();
      }
    },
    [dispatch, user]
  );

  useEffect(() => {
    setValue('firstName', user?.firstName);
    setValue('lastName', user?.lastName);
    user?.image && setValue('image', { uri: user?.image });
  }, [user._id, user.firstName, user.lastName, user.image, setValue]);

  return (
    <Layout customHeader={<CustomHeader title="Edit Personal Info" />}>
      <ScrollView>
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.profileGrid}>
              <View style={styles.profile}>
                <Controller
                  name="image"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: 'Image is required',
                    },
                  }}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <UploadImage
                        isEditable={true}
                        image={value}
                        originalImage={user?.image}
                        handleImage={onChange}
                        _imageStyle={styles.profilePhoto}
                      />
                    );
                  }}
                />

                {errors.image?.message && (
                  <GrayMediumText
                    _style={{ color: colors.theme.lightRed }}
                    text={errors.image.message}
                  />
                )}
              </View>
            </View>

            <Controller
              name="firstName"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'First name is required',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <AppInput
                  label="First Name"
                  placeholder="Enter first name"
                  value={value}
                  onChange={onChange}
                  required
                />
              )}
            />

            {errors.firstName?.message && (
              <GrayMediumText
                text={errors.firstName.message}
                _style={{ color: colors.theme.lightRed }}
              />
            )}

            <Controller
              name="lastName"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Last name is required',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <AppInput
                  label="Last name"
                  placeholder="Enter last name"
                  value={value}
                  required
                  onChange={onChange}
                />
              )}
            />

            {errors.lastName?.message && (
              <GrayMediumText
                text={errors.lastName.message}
                _style={{ color: colors.theme.lightRed }}
              />
            )}

            <Controller
              name="phone"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Phone is required',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <AppInput
                  label="Phone"
                  placeholder="Enter phone"
                  value={value}
                  required
                  onChange={onChange}
                />
              )}
            />

            {errors.phone?.message && (
              <GrayMediumText
                text={errors.phone.message}
                _style={{ color: colors.theme.lightRed }}
              />
            )}

            <Controller
              name="city"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'City is required',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <AppInput
                  label="City"
                  placeholder="Enter city"
                  value={value}
                  required
                  onChange={onChange}
                />
              )}
            />

            {errors.city?.message && (
              <GrayMediumText
                text={errors.city.message}
                _style={{ color: colors.theme.lightRed }}
              />
            )}

            <Controller
              name="state"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'State is required',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <AppInput
                  label="State"
                  placeholder="Enter state"
                  value={value}
                  required
                  onChange={onChange}
                />
              )}
            />

            {errors.state?.message && (
              <GrayMediumText
                text={errors.state.message}
                _style={{ color: colors.theme.lightRed }}
              />
            )}

            <Controller
              name="zip"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Zip is required',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <AppInput
                  label="Zip"
                  placeholder="Enter zip"
                  value={value}
                  required
                  onChange={onChange}
                />
              )}
            />

            {errors.zip?.message && (
              <GrayMediumText
                text={errors.zip.message}
                _style={{ color: colors.theme.lightRed }}
              />
            )}

            <Controller
              name="address"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Address is required',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <AppInput
                  label="Address"
                  placeholder="Enter address"
                  value={value}
                  required
                  onChange={onChange}
                />
              )}
            />

            {errors.address?.message && (
              <GrayMediumText
                text={errors.address.message}
                _style={{ color: colors.theme.lightRed }}
              />
            )}

            <AppButton
              title={'Update'}
              btnStyle={{
                marginVertical: 10,
              }}
              onPress={handleSubmit(onSubmit)}
            />
          </ScrollView>
        </View>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
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
});
