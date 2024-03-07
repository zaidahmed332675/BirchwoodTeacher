import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import {
  // Image,
  ScrollView,
  StyleSheet,
  // Text,
  // TouchableOpacity,
  View,
} from 'react-native';
// import dp1 from '../../Assets/icons/dp1.png';
import { ActivityPost } from '../../Components/ActivityPost';
import { CustomHeader } from '../../Components/CustomHeader';
// import { GlroyBold } from '../../Components/GlroyBoldText';
// import { GrayMediumText } from '../../Components/GrayMediumText';
import { Layout } from '../../Components/Layout';
import { SearchModal } from '../../Components/SearchModal';
// import { CustomSwitch } from '../../Components/Switch';
import {
  ActivityStackParams,
  EActivityStack,
} from '../../Types/NavigationTypes';
import { capitalizeWords, dummyRecords } from '../../Utils/options';
import { colors } from '../../theme/colors';
import { AppButton } from '../../Components/Button';
import { VIcon } from '../../Components/VIcon';

type Props = StackScreenProps<ActivityStackParams, 'activities'>;

const Activity = ({ navigation }: Props) => {
  const searchModalRef = useRef();

  const [tabIndex, setTabIndex] = useState<number>(1);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [student, setStudent] = useState<string>('');
  const items = [...dummyRecords];

  useEffect(() => {
    console.log(searchModalRef.current, 'student is here');
    if (!isSearchModalOpen) {
      let item = searchModalRef.current?.selectedItem;
      if (item) {
        setTabIndex(2);
        setStudent(item);
      }
    }
  }, [isSearchModalOpen]);

  console.log(searchModalRef.current, 'student is here');

  return (
    <Layout
      customHeader={
        <CustomHeader
          title="Activities"
          isActionEnbl={true}
          onPress={() => {
            navigation.navigate(EActivityStack.activityList);
          }}
        />
      }>
      <View style={styles.customSwitch}>
        <AppButton
          title="Class"
          bordered={!(tabIndex === 1)}
          btnStyle={{
            borderRadius: 5,
            paddingHorizontal: 15,
            paddingVertical: 10,
          }}
          onPress={() => {
            searchModalRef.current?.setValue('');
            setStudent('');
            setTabIndex(1);
          }}
        />
        <AppButton
          title={student ? capitalizeWords(student) : 'Filter By Child'}
          bordered={!(tabIndex === 2)}
          btnStyle={{
            borderRadius: 5,
            paddingHorizontal: 15,
            paddingVertical: 10,
          }}
          onPress={() => {
            setSearchModalOpen(true);
          }}
          suffix={
            <VIcon
              type="Ionicons"
              name={
                tabIndex === 2 ? 'close-circle-sharp' : 'chevron-down-outline'
              }
              size={20}
              color={
                tabIndex === 2 ? colors.theme.white : colors.theme.greyAlt2
              }
              style={{ marginLeft: 5 }}
              onPress={() => {
                if (tabIndex === 1) {
                  return setSearchModalOpen(true);
                } else {
                  searchModalRef.current?.setValue('');
                  setStudent('');
                  setTabIndex(1);
                }
              }}
            />
          }
        />
      </View>

      {/* {tabIndex > 1 && student && (
        <View
          style={{
            borderColor: colors.theme.secondary,
            borderRadius: 2,
            padding: 10,
            paddingHorizontal: 15,
            borderBottomWidth: 0.2,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={dp1}
            style={{
              height: 50,
              width: 50,
              borderRadius: 25,
              resizeMode: 'contain',
            }}
          />
          <View style={{ marginLeft: 10, flex: 1 }}>
            <GlroyBold
              text={student.label}
              _style={{ color: colors.text.black }}
            />
            <GrayMediumText
              text={`Class ${'X1-B'} | Roll no: ${student.rollNumber}`}
              _style={{ fontSize: 12 }}
            />
          </View>
          <TouchableOpacity
            onPress={() => setOpen(o => !o)}
            style={{
              alignSelf: 'flex-start',
              flexDirection: 'row',
              alignItems: 'center',
              padding: 5,
            }}>
            <Text
              style={{
                fontSize: 10,
                fontWeight: 'bold',
                marginHorizontal: 3,
                color: colors.text.black,
              }}>
              Change
            </Text>
          </TouchableOpacity>
        </View>
      )} */}

      <SearchModal
        open={isSearchModalOpen}
        setOpen={setSearchModalOpen}
        items={items}
        ref={searchModalRef}
        _style={{
          display: 'none',
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <ActivityPost />
        <ActivityPost />
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  customSwitch: {
    marginVertical: 20,
    flexDirection: 'row',
    columnGap: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Activity;
