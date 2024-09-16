import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  View
} from 'react-native';
import { ActivityPost } from '../../Components/ActivityPost';
import { CustomHeader } from '../../Components/CustomHeader';
import { DataLoader } from '../../Components/DataLoader';
import { Layout } from '../../Components/Layout';
import { LoadIndicator } from '../../Components/LoadIndicator';
import { NotFound } from '../../Components/NotFound';
import { SearchModal } from '../../Components/SearchModal';
import { CustomSwitch } from '../../Components/Switch';
import { asyncGetAllChildPosts, asyncGetAllClassPosts, asyncGetAllPosts } from '../../Stores/actions/post.action';
import { useAppSelector, useLoaderDispatch } from '../../Stores/hooks';
import { selectChildren } from '../../Stores/slices/class.slice';
import { selectPosts } from '../../Stores/slices/post.slice';
import {
  EPostStack,
  PostStackParams,
} from '../../Types/NavigationTypes';
import { colors } from '../../theme/colors';

type Props = StackScreenProps<PostStackParams, 'posts'>;

const Post = ({ navigation }: Props) => {
  // const searchModalRef = useRef();

  /** Tab Index
   * 0- All
   * 1- Class
   * 2- Child
   * **/

  const [tabIndex, setTabIndex] = useState<number>(1);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [childId, setChildId] = useState<string>("");

  const [loading, getAllPosts] = useLoaderDispatch(asyncGetAllPosts);
  const [classloading, getAllClassPosts] = useLoaderDispatch(asyncGetAllClassPosts, false);
  const [childloading, getAllChildPosts] = useLoaderDispatch(asyncGetAllChildPosts, false);

  let posts = useAppSelector(selectPosts);
  let children = useAppSelector(selectChildren);

  const onSelectSwitch = (index: number) => {
    setTabIndex(index);
    if (index === 2) setSearchModalOpen(true);
    else setChildId('')
  };

  const loadData = useCallback(() => {
    if (tabIndex === 0 || tabIndex === 1) getAllPosts()
    // if (tabIndex === 1) getAllClassPosts()
    if (tabIndex === 2 && childId) getAllChildPosts({ childId })
  }, [tabIndex, childId])

  useEffect(() => {
    if (!isSearchModalOpen && !childId && tabIndex === 2) {
      return setTabIndex(1)
    }

    loadData()
  }, [tabIndex, childId, isSearchModalOpen]);

  const filterPosts = () => {
    switch (tabIndex) {
      case 1:
        return posts.filter(post => post.type === 'CLASS');
      case 2:
        return posts.filter(post => post.type === 'CHILD' && post.children?.includes(childId));
      default:
        return posts;
    }
  };

  const filteredPosts = filterPosts();

  if (!filteredPosts.length && (loading || childloading)) {
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

      {filteredPosts.length ? <FlatList
        data={filteredPosts}
        renderItem={({ item }) => <ActivityPost item={item} />}
        keyExtractor={item => item._id.toString()}
        onEndReached={loadData}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        ListFooterComponent={() => filteredPosts.length && (loading || childloading) ? <LoadIndicator /> : null}
      /> : <NotFound text={`No posts available\nPlease add a new post`} />}
    </Layout>
  );
};

const styles = StyleSheet.create({
  customSwitch: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default Post;
