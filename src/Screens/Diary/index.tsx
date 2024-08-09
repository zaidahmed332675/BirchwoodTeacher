import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { CustomHeader } from '../../Components/CustomHeader';
import { DataLoader } from '../../Components/DataLoader';
import { DiaryCard } from '../../Components/DiaryCard';
import { Layout } from '../../Components/Layout';
import { NotFound } from '../../Components/NotFound';
import { CustomSwitch } from '../../Components/Switch';
import { asyncGetAllHomeWorks } from '../../Stores/actions/diary.action';
import { useAppSelector, useLoaderDispatch } from '../../Stores/hooks';
import { selectChildren } from '../../Stores/slices/class.slice';
import { selectHomeWorks } from '../../Stores/slices/diary.slice';
import { DiaryStackParams, EDiaryStack } from '../../Types/NavigationTypes';
import { colors } from '../../theme/colors';

type Props = StackScreenProps<DiaryStackParams, 'diary'>;

const Diary = ({ navigation }: Props) => {
  const searchModalRef = useRef();

  const [tabIndex, setTabIndex] = useState<number>(1);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [student, setStudent] = useState<Record<string, any>>();

  const [loading, getAllHomeWorks] = useLoaderDispatch(asyncGetAllHomeWorks);

  let homeworks = useAppSelector(selectHomeWorks);
  let children = useAppSelector(selectChildren);

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

  useEffect(() => {
    getAllHomeWorks()
  }, [getAllHomeWorks]);


  if (loading) {
    return <DataLoader />;
  }

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
          selectionMode={tabIndex}
          roundCorner={true}
          options={['Class', 'Child']}
          onSelectSwitch={onSelectSwitch}
          selectionColor={colors.theme.secondary}
        />
      </View>
      {/* {tabIndex > 1 && student && (
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
      )} */}

      {/* <SearchModal
        open={isSearchModalOpen}
        setOpen={setSearchModalOpen}
        children={children.map(child => {
          let { parent, ...childData } = child
          return ({
            label: `${child.firstName} ${child.lastName}`,
            value: child._id,
            parentData: parent,
            ...childData,
          })
        })}
        ref={searchModalRef}
        _style={{
          display: 'none',
        }}
      /> */}

      {homeworks.length ? <FlatList
        contentContainerStyle={{
          paddingBottom: 10
        }}
        data={homeworks}
        renderItem={({ item }) => <View style={styles.diaryRecord}><DiaryCard item={item} /></View>}
        keyExtractor={item => item._id.toString()}
      /> : <NotFound text={`No home work available\nPlease add a new home work`} />}

    </Layout >
  );
};

const styles = StyleSheet.create({
  customSwitch: {
    marginVertical: 20,
    alignItems: 'center',
  },
  diaryRecord: {
    marginVertical: 6,
  },
});

export default Diary;
