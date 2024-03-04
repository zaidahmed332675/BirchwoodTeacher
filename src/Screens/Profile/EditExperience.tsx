import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AppInput } from '../../Components/AppInput';
import { AppButton } from '../../Components/Button';
import { GlroyBold } from '../../Components/GlroyBoldText';
import { Layout } from '../../Components/Layout';
import { VIcon } from '../../Components/VIcon';
import { ProfileStackParams } from '../../Types/NavigationTypes';
import { colors } from '../../theme/colors';
import { CustomHeader } from '../../Components/CustomHeader';

type Props = StackScreenProps<ProfileStackParams, 'editExperience'>;

export default function EditExperience({}: Props) {
  const [fields, setFields] = useState<
    {
      institute: string;
      startingDate: string;
      endingDate: string;
      subjectStudy: string;
    }[]
  >([]);

  const addEducationField = () => {
    setFields([
      ...fields,
      { institute: '', startingDate: '', endingDate: '', subjectStudy: '' },
    ]);
  };

  const removeEducationField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  return (
    <Layout customHeader={<CustomHeader title="Edit Experience" />}>
      <ScrollView style={{ backgroundColor: '' }}>
        <View style={styles.container}>
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
            label="Subject Taught"
            onChange={() => {}}
            placeholder={'subject taught'}
            value={''}
            required
          />

          {/* Dynamic Fields */}
          <View style={styles.groupContainer}>
            {fields.map((_, index) => (
              <View key={index} style={styles.fieldGroup}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <GlroyBold
                    _style={{
                      color: colors.theme.primary,
                      fontSize: 22,
                    }}
                    text={`Institute - 0${index + 1}`}
                  />
                  <TouchableOpacity
                    onPress={() => removeEducationField(index)}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: colors.theme.primary,
                      borderRadius: 8,
                      padding: 4,
                    }}>
                    <VIcon
                      type="Ionicons"
                      name="close"
                      size={20}
                      color={colors.theme.white}
                    />
                  </TouchableOpacity>
                </View>
                <AppInput
                  label="Institute Name"
                  onChange={text => {
                    const newFields = [...fields];
                    newFields[index].institute = text;
                    setFields(newFields);
                  }}
                  placeholder={'institute name'}
                  value={''}
                  required
                />
                <AppInput
                  label="Starting Date"
                  onChange={text => {
                    const newFields = [...fields];
                    newFields[index].endingDate = text;
                    setFields(newFields);
                  }}
                  placeholder={'start date'}
                  value={''}
                  required
                />
                <AppInput
                  label="Ending Date"
                  onChange={text => {
                    const newFields = [...fields];
                    newFields[index].startingDate = text;
                    setFields(newFields);
                  }}
                  placeholder={'end date'}
                  value={''}
                  required
                />
                <AppInput
                  label="Subject Taught"
                  onChange={text => {
                    const newFields = [...fields];
                    newFields[index].subjectStudy = text;
                    setFields(newFields);
                  }}
                  placeholder={'subject taught'}
                  value={''}
                  required
                />
              </View>
            ))}
          </View>
          <AppButton
            icon
            bordered
            title={'Add Experience'}
            onPress={addEducationField}
            btnStyle={{
              marginVertical: 10,
            }}
          />
          <AppButton
            title={'Update'}
            btnStyle={{
              marginVertical: 10,
            }}
            onPress={() => {}}
          />
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
  groupContainer: {},
  fieldGroup: {
    marginTop: 20,
  },
});
