import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Asset } from 'react-native-image-picker';
import AppInput from '../../Components/AppInput';
import AppButton from '../../Components/Button';
import Layout from '../../Components/Layout';
import UploadImage from '../../Components/UploadImage';
import VIcon from '../../Components/VIcon';
import { ProfileStackParams } from '../../Types/NavigationTypes';
import { colors } from '../../theme/colors';
import { TouchableOpacity } from 'react-native';

type Props = StackScreenProps<ProfileStackParams, 'editPersonalInfo'>;

const CustomHeader = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.titlContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <VIcon
            type="Ionicons"
            name="chevron-back-outline"
            size={30}
            color={colors.theme.white}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: colors.text.white,
            marginLeft: 10,
            fontWeight: 'bold',
            fontSize: 18,
          }}>
          Edit Personal Info
        </Text>
      </View>
    </View>
  );
};

export default function EditPersonalInfo({}: Props) {
  const [image, setImage] = useState<Asset>({
    uri: undefined,
  });

  return (
    <Layout customHeader={<CustomHeader />}>
      <ScrollView>
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.profileGrid}>
              <View style={styles.profile}>
                <UploadImage
                  id={1}
                  image={{ uri: image?.uri }}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titlContainer: { flexDirection: 'row', alignItems: 'center' },
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
