import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
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
import { asyncGetAllChildHomeWorks, asyncGetAllHomeWorks } from '../../Stores/actions/diary.action';
import { useAppSelector, useLoaderDispatch } from '../../Stores/hooks';
import { selectChildren } from '../../Stores/slices/class.slice';
import { selectHomeWorks } from '../../Stores/slices/diary.slice';
import { DiaryStackParams, EDiaryStack } from '../../Types/NavigationTypes';
import { colors } from '../../theme/colors';
import { SearchModal } from '../../Components/SearchModal';

type Props = StackScreenProps<DiaryStackParams, 'diary'>;

const Diary = ({ navigation }: Props) => {

  const [tabIndex, setTabIndex] = useState<number>(0);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [childId, setChildId] = useState<string>("");

  const [loading, getAllHomeWorks] = useLoaderDispatch(asyncGetAllHomeWorks);
  const [childloading, getAllChildHomeWorks] = useLoaderDispatch(asyncGetAllChildHomeWorks, false);

  let homeworks = useAppSelector(selectHomeWorks);
  let children = useAppSelector(selectChildren);

  const onSelectSwitch = (index: number) => {
    setTabIndex(index);
    if (index === 1) setSearchModalOpen(true);
    else setChildId('')
  };

  useEffect(() => {
    if (!isSearchModalOpen && !childId && tabIndex === 1) {
      return setTabIndex(0)
    }

    if (tabIndex === 0) getAllHomeWorks()
    if (tabIndex === 1 && childId) getAllChildHomeWorks({ childId })
  }, [tabIndex, childId, isSearchModalOpen, getAllHomeWorks, getAllChildHomeWorks]);

  if (loading || childloading) {
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

      <SearchModal
        label=""
        value={childId ? childId : []}
        onChange={setChildId}
        required={true}
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
        _style={{
          display: 'none',
        }}
      />

      {homeworks.length ? <FlatList
        contentContainerStyle={{
          paddingBottom: 10,
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
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  diaryRecord: {
    backgroundColor: 'red',
    marginBottom: 12,
  },
});

export default Diary;
