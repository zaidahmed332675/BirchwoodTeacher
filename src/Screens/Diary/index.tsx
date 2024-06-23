import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import dp1 from '../../Assets/icons/dp1.png';
import { CustomHeader } from '../../Components/CustomHeader';
import { DiaryCard } from '../../Components/DiaryCard';
import { GlroyBold } from '../../Components/GlroyBoldText';
import { GrayMediumText } from '../../Components/GrayMediumText';
import { Layout } from '../../Components/Layout';
import { SearchModal } from '../../Components/SearchModal';
import { CustomSwitch } from '../../Components/Switch';
import { DiaryStackParams, EDiaryStack } from '../../Types/NavigationTypes';
import { dummyRecords } from '../../Utils/options';
import { colors } from '../../theme/colors';

type Props = StackScreenProps<DiaryStackParams, 'diary'>;

const Diary = ({ navigation }: Props) => {
  const searchModalRef = useRef();

  const [tabIndex, setTabIndex] = useState<number>(1);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [student, setStudent] = useState<Record<string, any>>();
  const items = [...dummyRecords];

  const onSelectSwitch = (index: number) => {
    setTabIndex(index);
    if (index > 1) {
      setSearchModalOpen(true);
    }
  };

  useEffect(() => {
    let item = searchModalRef.current?.selectedItem;
    if (item) {
      setStudent(item);
    }
  }, [isSearchModalOpen]);

  return (
    <Layout
      customHeader={
        <CustomHeader
          title="Work Diary"
          isActionEnbl={true}
          onPress={() => {
            navigation.navigate(EDiaryStack.createDiary);
          }}
        />
      }>
      <View style={styles.customSwitch}>
        <CustomSwitch
          selectionMode={1}
          roundCorner={true}
          option1={'Class'}
          option2={'Child'}
          onSelectSwitch={onSelectSwitch}
          selectionColor={colors.theme.primary}
        />
      </View>
      {tabIndex > 1 && student && (
        <View
          style={{
            borderColor: colors.theme.secondary,
            borderRadius: 2,
            padding: 10,
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
              text={student?.label}
              _style={{ color: colors.text.black }}
            />
            <GrayMediumText
              text={`Class ${'X1-B'} | Roll no: ${student?.rollNumber}`}
              _style={{ fontSize: 12 }}
            />
          </View>
          <TouchableOpacity
            onPress={() => setSearchModalOpen(o => !o)}
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
      )}

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
        <View style={styles.diaryRecord}>
          <DiaryCard />
        </View>
        <View style={styles.diaryRecord}>
          <DiaryCard />
        </View>
        <View style={styles.diaryRecord}>
          <DiaryCard />
        </View>
        <View style={styles.diaryRecord}>
          <DiaryCard />
        </View>
        <View style={styles.diaryRecord}>
          <DiaryCard />
        </View>
        <View style={styles.diaryRecord}>
          <DiaryCard />
        </View>
        <View style={styles.diaryRecord}>
          <DiaryCard />
        </View>
        <View style={styles.diaryRecord}>
          <DiaryCard />
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  customSwitch: {
    marginVertical: 20,
    alignItems: 'center',
  },
  diaryRecord: {
    marginVertical: 10,
  },
});

export default Diary;
