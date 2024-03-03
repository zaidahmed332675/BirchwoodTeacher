import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Asset } from 'react-native-image-picker';
import { AppInput } from '../../Components/AppInput';
import { AppButton } from '../../Components/Button';
import { Layout } from '../../Components/Layout';
import { UploadImage } from '../../Components/UploadImage';
import { ProfileStackParams } from '../../Types/NavigationTypes';
import { CustomHeader } from '../../Components/CustomHeader';

type Props = StackScreenProps<ProfileStackParams, 'editPersonalInfo'>;
export default function EditPersonalInfo({}: Props) {
  const [image, setImage] = useState<Asset>({
    uri: undefined,
  });

  return (
    <Layout customHeader={<CustomHeader title="Edit Personal Info" />}>
      <ScrollView>
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.profileGrid}>
              <View style={styles.profile}>
                <UploadImage
                  isEditable={true}
                  image={image}
                  originalImage={undefined}
                  handleImage={setImage}
                />
              </View>
            </View>
            <AppInput
              label="Date Of Birth"
              onChange={() => {}}
              placeholder={'date of birth'}
              value={''}
              required
            />
            <AppInput
              label="Gender"
              onChange={() => {}}
              placeholder={'gender'}
              value={''}
              required
            />
            <AppInput
              label="Address"
              onChange={() => {}}
              placeholder={'address'}
              value={''}
              required
            />
            <AppInput
              label="City"
              onChange={() => {}}
              placeholder={'city'}
              value={''}
              required
            />

            <AppButton title={'Update'} onPress={() => {}} />
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
});
