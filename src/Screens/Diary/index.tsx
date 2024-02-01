import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { DiaryStackParams, EDiaryStack } from '../../Types/NavigationTypes';
import { DiaryCard } from '../../Components/DiaryCard';
import Layout from '../../Components/Layout';
import { CustomSwitch } from '../../Components/Switch';
import { colors } from '../../theme/colors';
import GlroyBold from '../../Components/GlroyBoldText';
import GrayMediumText from '../../Components/GrayMediumText';
import Ionicon from 'react-native-vector-icons/Ionicons';
import dp1 from '../../Assets/icons/dp1.png';
import { useNavigation } from '@react-navigation/native';
import { SearchModal } from '../../Components/SearchModal';

type Props = StackScreenProps<DiaryStackParams, 'diary'>;

const DiaryCustomHeader = () => {
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
          Work Diary
        </Text>
      </View>
      <TouchableOpacity
        style={styles.actionContainer}
        onPress={() => {
          navigation.navigate(EDiaryStack.createDiary);
        }}>
        <Ionicon
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
  const [student, setStudent] = useState();

  const [items] = useState([
    { label: 'Waqas', value: 'waqas' },
    { label: 'Ali', value: 'ali' },
    { label: 'Zaid', value: 'zaid' },
    { label: 'Waqas1', value: 'waqas1' },
    { label: 'Ali1', value: 'ali1' },
    { label: 'Zaid1', value: 'zaid1' },
    { label: 'Waqas2', value: 'waqas2' },
    { label: 'Ali2', value: 'ali2' },
    { label: 'Zaid2', value: 'zaid2' },
  ]);

  const onSelectSwitch = (index: number) => {
    setTabIndex(index);
    if (index > 1) {
      setOpen(true);
    }
  };

  useEffect(() => {
    let name = searchModalRef.current?.getValue?.();
    if (name) {
      setStudent(name);
    }
  }, [open]);

  return (
    <Layout customHeader={<DiaryCustomHeader />}>
      <View style={styles.customSwitch}>
        <CustomSwitch
          selectionMode={1}
          roundCorner={true}
          option1={'Class'}
          option2={'Kid'}
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
            <GlroyBold text={student} _style={{ color: colors.text.black }} />
            <GrayMediumText
              text={`Class ${'X1-B'} | Roll no: ${'04'}`}
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
    // not needed because of bottom sheet removed
    // marginHorizontal: 10,
    // marginRight: 20,
    // top: vh * 4,
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
