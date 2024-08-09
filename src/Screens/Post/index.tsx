import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { CustomHeader } from '../../Components/CustomHeader';
import { Layout } from '../../Components/Layout';
import { SearchModal } from '../../Components/SearchModal';
import { FlatList } from 'react-native';
import { ActivityPost } from '../../Components/ActivityPost';
import { AppButton } from '../../Components/Button';
import { DataLoader } from '../../Components/DataLoader';
import { NotFound } from '../../Components/NotFound';
import { VIcon } from '../../Components/VIcon';
import { asyncGetAllChildPosts, asyncGetAllClassPosts, asyncGetAllPosts } from '../../Stores/actions/post.action';
import { useAppSelector, useLoaderDispatch } from '../../Stores/hooks';
import { selectChildren } from '../../Stores/slices/class.slice';
import { selectPosts } from '../../Stores/slices/post.slice';
import {
  EPostStack,
  PostStackParams,
} from '../../Types/NavigationTypes';
import { colors } from '../../theme/colors';
import { CustomSwitch } from '../../Components/Switch';

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

  const [loading, getAllPosts] = useLoaderDispatch(asyncGetAllPosts, false);
  const [classloading, getAllClassPosts] = useLoaderDispatch(asyncGetAllClassPosts);
  const [childloading, getAllChildPosts] = useLoaderDispatch(asyncGetAllChildPosts, false);

  let posts = useAppSelector(selectPosts);
  let children = useAppSelector(selectChildren);

  const onSelectSwitch = (index: number) => {
    setTabIndex(index);
    if (index === 2) setSearchModalOpen(true);
    else setChildId('')
  };

  console.log(childId)

  useEffect(() => {
    console.log(childId, 'childId', tabIndex, 'index')
    if (!isSearchModalOpen && !childId && tabIndex === 2) {
      return setTabIndex(1)
    }

    if (tabIndex === 0) getAllPosts()
    if (tabIndex === 1) getAllClassPosts()
    if (tabIndex === 2 && childId) getAllChildPosts({ childId })
  }, [tabIndex, childId, isSearchModalOpen, asyncGetAllPosts, getAllClassPosts, asyncGetAllChildPosts]);

  if (loading || classloading || childloading) {
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

      {posts.length ? <FlatList
        data={posts}
        renderItem={({ item }) => <ActivityPost item={item} />}
        keyExtractor={item => item._id.toString()}
      /> : <NotFound text={`No posts available\nPlease add a new post`} />}
    </Layout>
  );
};

const styles = StyleSheet.create({
  customSwitch: {
    marginTop: 20,
    flexDirection: 'row',
    columnGap: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Post;
