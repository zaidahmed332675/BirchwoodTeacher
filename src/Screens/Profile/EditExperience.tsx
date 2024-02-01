import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import AppInput from '../../Components/AppInput';
import AppButton from '../../Components/Button';
import Layout from '../../Components/Layout';
import UploadImage from '../../Components/UploadImage';
import { colors } from '../../theme/colors';
import { ProfileStackParams } from '../../Types/NavigationTypes';
import { StackScreenProps } from '@react-navigation/stack';

type Props = StackScreenProps<ProfileStackParams, 'editExperience'>;

const CustomHeader = () => {
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
          Edit Experience
        </Text>
      </View>
    </View>
  );
};

export default function EditExperience({}: Props) {
  return (
    <Layout customHeader={<CustomHeader />}>
      <ScrollView>
        <View style={styles.container}>
          <ScrollView>
            <AppInput
              label="Institute Name"
              onChange={() => {}}
              placeholder={'institute name'}
              value={''}
              required
            />
            <AppInput
              label="Starting Date"
              onChange={() => {}}
              placeholder={'start date'}
              value={''}
              required
            />
            <AppInput
              label="Ending Date"
              onChange={() => {}}
              placeholder={'end date'}
              value={''}
              required
            />
            <AppInput
              label="Subject study"
              onChange={() => {}}
              placeholder={'subject taught'}
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
});
