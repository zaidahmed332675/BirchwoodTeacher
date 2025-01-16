import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { CustomHeader } from '../../Components/CustomHeader';
import { DataLoader } from '../../Components/DataLoader';
import { DiaryCard } from '../../Components/DiaryCard';
import { Layout } from '../../Components/Layout';
import { LoadMoreFlatList } from '../../Components/LoadMoreFlatList';
import { NotFound } from '../../Components/NotFound';
import { SearchModal } from '../../Components/SearchModal';
import { CustomSwitch } from '../../Components/Switch';
import { asyncGetAllChildHomeWorks, asyncGetAllHomeWorks } from '../../Stores/actions/diary.action';
import { useAppSelector, useLoaderDispatch } from '../../Stores/hooks';
import { selectChildren } from '../../Stores/slices/class.slice';
import { selectHomeWorks } from '../../Stores/slices/diary.slice';
import { colors } from '../../Theme/colors';
import { DiaryStackParams, EDiaryStack } from '../../Types/NavigationTypes';
import { selectAppLoader } from '../../Stores/slices/common.slice';
import { vh } from '../../Utils/units';

type Props = StackScreenProps<DiaryStackParams, 'diary'>;

const Diary = ({ navigation }: Props) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [childId, setChildId] = useState("");

  const [loading, getAllHomeWorks] = useLoaderDispatch(asyncGetAllHomeWorks);
  const [childloading, getAllChildHomeWorks] = useLoaderDispatch(asyncGetAllChildHomeWorks, false);

  let homeworks = useAppSelector(selectHomeWorks);
  let children = useAppSelector(selectChildren);
  const appLoading = useAppSelector(selectAppLoader)

  const onSelectSwitch = (index: number) => {
    setTabIndex(index);
    if (index === 1) setSearchModalOpen(true);
    else setChildId('')
  };

  const loadData = (isFresh = false, ignoreLoading = false) => {
    if (tabIndex === 0 && (ignoreLoading || !loading)) getAllHomeWorks({ isFresh })
    if (tabIndex === 1 && childId && (ignoreLoading || !childloading)) getAllChildHomeWorks({ childId, isFresh })
  }

  useEffect(() => {
    if (!isSearchModalOpen && !childId && tabIndex === 1) {
      return setTabIndex(0)
    }
    loadData(true, true)
  }, [tabIndex, childId, isSearchModalOpen]);

  if ((loading || childloading) && !homeworks.length) {
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
          options={['All', 'Child']}
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

      {/* {homeworks.length ?
        <FlatList
          data={homeworks}
          keyExtractor={item => item._id}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          renderItem={({ item }) => <View style={styles.diaryRecord}><DiaryCard item={item} showChildrenLabel={tabIndex == 0} /></View>}
          onEndReached={({ distanceFromEnd }) => {
            if (isScrollable && distanceFromEnd >= 0 && !!flatListRef.current.listHeight) loadData()
          }}
          onContentSizeChange={(_, height) => {
            if (flatListRef.current.listHeight == 0) {
              setContentSize(height)
            }
          }}
          onLayout={(e) => {
            flatListRef.current = { listHeight: e.nativeEvent.layout.height }
          }}
          onEndReachedThreshold={0.1}
          contentContainerStyle={{
            paddingBottom: 10,
          }}
          ListFooterComponent={() => homeworks.length && (loading || childloading) ? <LoadIndicator /> : null}
        />
        : <NotFound text={`No home work available\nPlease add a new home work`} />} */}

      {homeworks.length ?
        <LoadMoreFlatList
          uuidKey='_id'
          data={homeworks}
          renderItem={({ item }) => <View style={styles.diaryRecord}><DiaryCard item={item} showChildrenLabel={tabIndex == 0} /></View>}
          loadMore={loadData}
          loading={!appLoading && (loading || childloading)}
        />
        : <NotFound text={`No home work available\nPlease add a new home work`} />}
    </Layout>
  );
};

const styles = StyleSheet.create({
  customSwitch: {
    marginTop: vh * 2.63, // 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  diaryRecord: {
    marginBottom: vh * 1.58, // 12
  },
});

export default Diary;
