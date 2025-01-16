import { useFocusEffect } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { ActivityPost } from '../../Components/ActivityPost';
import { CustomHeader } from '../../Components/CustomHeader';
import { DataLoader } from '../../Components/DataLoader';
import { Layout } from '../../Components/Layout';
import { LoadMoreFlatList } from '../../Components/LoadMoreFlatList';
import { NotFound } from '../../Components/NotFound';
import { SearchModal } from '../../Components/SearchModal';
import { CustomSwitch } from '../../Components/Switch';
import { asyncGetAllChildPosts, asyncGetAllClassPosts, asyncGetAllPosts } from '../../Stores/actions/post.action';
import { useAppSelector, useLoaderDispatch } from '../../Stores/hooks';
import { selectChildren } from '../../Stores/slices/class.slice';
import { selectPosts } from '../../Stores/slices/post.slice';
import { colors } from '../../Theme/colors';
import {
  EPostStack,
  PostStackParams,
} from '../../Types/NavigationTypes';
import { selectAppLoader } from '../../Stores/slices/common.slice';
import { vh } from '../../Utils/units';

type Props = StackScreenProps<PostStackParams, 'posts'>;

/** Tab Index
 * 0- All
 * 1- Class
 * 2- Child
 * **/

const Post = ({ navigation }: Props) => {
  const [tabIndex, setTabIndex] = useState<number>(1);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [childId, setChildId] = useState<string>("");

  const [loading, getAllPosts] = useLoaderDispatch(asyncGetAllPosts, false);
  const [classloading, getAllClassPosts] = useLoaderDispatch(asyncGetAllClassPosts);
  const [childloading, getAllChildPosts] = useLoaderDispatch(asyncGetAllChildPosts, false);

  const appLoading = useAppSelector(selectAppLoader)

  let posts = useAppSelector(selectPosts);
  let children = useAppSelector(selectChildren);

  const onSelectSwitch = (index: number) => {
    setTabIndex(index);
    if (index === 2) setSearchModalOpen(true);
    else setChildId('')
  };

  const loadData = (isFresh = false, ignoreLoading = false) => {
    if (tabIndex === 0 && (ignoreLoading || !loading)) getAllPosts({ isFresh })
    if (tabIndex === 1 && (ignoreLoading || !classloading)) getAllClassPosts({ isFresh })
    if (tabIndex === 2 && childId && (ignoreLoading || !childloading)) getAllChildPosts({ childId, isFresh })
  }

  useEffect(() => {
    if (!isSearchModalOpen && !childId && tabIndex === 2) {
      return setTabIndex(1)
    }
    loadData(true, true)
  }, [tabIndex, childId, isSearchModalOpen]);

  if ((loading || classloading || childloading) && !posts.length) {
    return <DataLoader />;
  }

  return (
    <Layout
      customHeader={
        <CustomHeader
          title="Posts"
          isActionEnbl={true}
          onPress={() => {
            navigation.navigate(EPostStack.activityList);
          }}
        />
      }>

      <View style={[styles.customSwitch]}>
        <CustomSwitch
          selectionMode={tabIndex}
          options={['All', 'Class', 'Child']}
          roundCorner={true}
          onSelectSwitch={onSelectSwitch}
          selectionColor={colors.theme.secondary}
        />
      </View>

      <SearchModal
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

      {posts.length ?
        <LoadMoreFlatList
          uuidKey='_id'
          data={posts}
          renderItem={({ item }) => <ActivityPost item={item} />}
          loadMore={loadData}
          loading={!appLoading && (loading || classloading || childloading)}
        />
        : <NotFound text={`No posts available\nPlease add a new post`} />}
    </Layout>
  );
};

const styles = StyleSheet.create({
  customSwitch: {
    marginTop: vh * 2.63, // 20
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default Post;
