import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppInput } from '../../Components/AppInput';
import { AppButton } from '../../Components/Button';
import { GlroyBold } from '../../Components/GlroyBoldText';
import { Layout } from '../../Components/Layout';
import { VIcon } from '../../Components/VIcon';
import { ProfileStackParams } from '../../Types/NavigationTypes';
import { colors } from '../../theme/colors';
import { CustomHeader } from '../../Components/CustomHeader';

type Props = StackScreenProps<ProfileStackParams, 'editEducation'>;

export default function EditEducation({}: Props) {
  const [educationFields, setEducationFields] = useState<
    {
      institute: string;
      startingDate: string;
      subjectStudy: string;
    }[]
  >([]);

  const addEducationField = () => {
    setEducationFields([
      ...educationFields,
      { institute: '', startingDate: '', subjectStudy: '' },
    ]);
  };

  console.log(educationFields, 'edu');

  const removeEducationField = (index: number) => {
    setEducationFields(educationFields.filter((_, i) => i !== index));
  };

  return (
    <Layout customHeader={<CustomHeader title="Edit Education" />}>
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
              label="Subject Study"
              onChange={() => {}}
              placeholder={'subject study'}
              value={''}
              required
            />
            {/* Dynamic Fields */}
            <View style={styles.groupContainer}>
              {educationFields.map((_, index) => (
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
                      const newFields = [...educationFields];
                      newFields[index].institute = text;
                      setEducationFields(newFields);
                    }}
                    placeholder={'institute name'}
                    value={''}
                    required
                  />
                  <AppInput
                    label="Starting Date"
                    onChange={text => {
                      const newFields = [...educationFields];
                      newFields[index].startingDate = text;
                      setEducationFields(newFields);
                    }}
                    placeholder={'start date'}
                    value={''}
                    required
                  />
                  <AppInput
                    label="Subject Study"
                    onChange={text => {
                      const newFields = [...educationFields];
                      newFields[index].subjectStudy = text;
                      setEducationFields(newFields);
                    }}
                    placeholder={'subject study'}
                    value={''}
                    required
                  />
                </View>
              ))}
            </View>
            <AppButton
              icon
              bordered
              title={'Add Education'}
              onPress={addEducationField}
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
  groupContainer: {},
  fieldGroup: {
    marginTop: 20,
  },
});
