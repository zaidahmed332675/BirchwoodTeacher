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
import { asyncUpdateProfile } from '../../Stores/actions/user.action';
import { useAppDispatch, useAppSelector } from '../../Stores/hooks';
import { selectUserProfile } from '../../Stores/slices/user.slice';
import { EProfileStack, ProfileStackParams } from '../../Types/NavigationTypes';
import { colors } from '../../Theme/colors';

type Props = StackScreenProps<ProfileStackParams, 'editPersonalInfo'>;

export default function EditPersonalInfo({ navigation }: Props) {
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
      phone: '',
      city: '',
      state: '',
      zip: '',
      address: '',
      image: { uri: '' },
    },
  });

  const onSubmit = useCallback(
    async (data: any) => {
      let formData = new FormData();
      let body: any = {};

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
      if (data.city !== user?.city) {
        body.city = data.city;
        formData.append('city', data.city);
      }
      if (data.state !== user?.state) {
        body.state = data.state;
        formData.append('state', data.state);
      }
      if (data.zip !== user?.zip) {
        body.zip = data.zip;
        formData.append('zip', data.zip);
      }
      if (data.address !== user?.address) {
        body.address = data.address;
        formData.append('address', data.address);
      }

      if (data.image?.fileName) {
        body.image = data.image.uri;
        formData.append('image', {
          uri: data.image.uri,
          type: data.image.type,
          name: data.image.fileName,
        });
      }

      if (Object.keys(body).length === 0) {
        return dispatch(asyncShowError('No changes have been made!'));
      } else {
        await dispatch(asyncUpdateProfile(formData)).unwrap();
        navigation.navigate(EProfileStack.profile)
      }
    },
    [dispatch, user]
  );

  useEffect(() => {
    let { firstName, lastName, phone, city, state, zip, address, image } = user;
    setValue('firstName', firstName);
    setValue('lastName', lastName);
    setValue('phone', phone);
    setValue('city', city);
    setValue('state', state);
    setValue('zip', zip);
    setValue('address', address);
    image && setValue('image', { uri: image });
  }, [setValue, user]);

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
