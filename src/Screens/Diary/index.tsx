import { useNavigation } from '@react-navigation/native';
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
import { DiaryCard } from '../../Components/DiaryCard';
import GlroyBold from '../../Components/GlroyBoldText';
import GrayMediumText from '../../Components/GrayMediumText';
import Layout from '../../Components/Layout';
import { SearchModal } from '../../Components/SearchModal';
import { CustomSwitch } from '../../Components/Switch';
import VIcon from '../../Components/VIcon';
import { DiaryStackParams, EDiaryStack } from '../../Types/NavigationTypes';
import { colors } from '../../theme/colors';
import { dummyRecords } from '../../Utils/options';

type Props = StackScreenProps<DiaryStackParams, 'diary'>;

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
          Work Diary
        </Text>
      </View>
      <TouchableOpacity
        style={styles.actionContainer}
        onPress={() => {
          navigation.navigate(EDiaryStack.createDiary);
        }}>
        <VIcon
          type="Ionicons"
          name="add-outline"
          size={15}
          color={colors.theme.white}
          style={styles.addIcon}
        />
        <Text
          style={{
            color: colors.theme.secondary,
            fontWeight: 'bold',
            fontSize: 13,
          }}>
          Add
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Diary = ({}: Props) => {
  const [tabIndex, setTabIndex] = useState<number>(1);

  const searchModalRef = useRef();
  const [open, setOpen] = useState(false);
  const [student, setStudent] = useState<Record<string, any>>();

  const [items] = useState([...dummyRecords]);

  const onSelectSwitch = (index: number) => {
    setTabIndex(index);
    if (index > 1) {
      setOpen(true);
    }
  };

  useEffect(() => {
    let item = searchModalRef.current?.selectedItem;
    if (item?.value) {
      setStudent(item);
    }
  }, [open]);

  return (
    <Layout customHeader={<CustomHeader />}>
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
      )}

      <SearchModal
        open={open}
        setOpen={setOpen}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titlContainer: { flexDirection: 'row', alignItems: 'center' },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 15,
    backgroundColor: colors.theme.white,
  },
  addIcon: {
    backgroundColor: colors.theme.secondary,
    borderRadius: 10,
    marginRight: 5,
  },
});

export default Diary;
