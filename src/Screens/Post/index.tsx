import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { ActivityPost } from '../../Components/ActivityPost';
import { CustomHeader } from '../../Components/CustomHeader';
import { DataLoader } from '../../Components/DataLoader';
import { Layout } from '../../Components/Layout';
import { LoadMoreFlatList } from '../../Components/LoadMoreFlatList';
import { NotFound } from '../../Components/NotFound';
// import { SearchModal } from '../../Components/SearchModal';
// import { CustomSwitch } from '../../Components/Switch';
import { GrayMediumText } from '../../Components/GrayMediumText';
import { ImageBox } from '../../Components/UploadImage';
import { asyncGetAllChildPosts, asyncGetAllClassPosts, asyncGetAllPosts } from '../../Stores/actions/post.action';
import { useAppDispatch, useAppSelector, useLoaderDispatch } from '../../Stores/hooks';
import { selectChildren } from '../../Stores/slices/class.slice';
import { selectAppLoader } from '../../Stores/slices/common.slice';
import { selectPosts, setLikeDislike, setLoveUnlove } from '../../Stores/slices/post.slice';
import { selectUserProfile } from '../../Stores/slices/user.slice';
import { colors } from '../../Theme/colors';
import {
  EPostStack,
  PostStackParams,
} from '../../Types/NavigationTypes';
import { socket } from '../../Utils/socket';
import { vh, vw } from '../../Utils/units';
import { elevation } from '../../Utils/elevation';

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

  // const [loading, getAllPosts] = useLoaderDispatch(asyncGetAllPosts, false);
  const [classloading, getAllClassPosts] = useLoaderDispatch(asyncGetAllClassPosts);
  const [childloading, getAllChildPosts] = useLoaderDispatch(asyncGetAllChildPosts, false);

  const profile = useAppSelector(selectUserProfile);
  const appLoading = useAppSelector(selectAppLoader)

  let posts = useAppSelector(selectPosts);
  let children = useAppSelector(selectChildren);

  const dispatch = useAppDispatch()

  // const onSelectSwitch = (index: number) => {
  //   setTabIndex(index);
  //   if (index === 2) setSearchModalOpen(true);
  //   else setChildId('')
  // };

  // const loadData = (isFresh = false, ignoreLoading = false) => {
  //   if (tabIndex === 0 && (ignoreLoading || !loading)) getAllPosts({ isFresh })
  //   if (tabIndex === 1 && (ignoreLoading || !classloading)) getAllClassPosts({ isFresh })
  //   if (tabIndex === 2 && childId && (ignoreLoading || !childloading)) getAllChildPosts({ childId, isFresh })
  // }

  const loadData = (isFresh = false, isRefreshing = false, ignoreLoading = false) => {
    if (!childId && (ignoreLoading || !classloading)) getAllClassPosts({ isFresh, isRefreshing })
    if (childId && (ignoreLoading || !childloading)) getAllChildPosts({ childId, isFresh, isRefreshing })
  }

  const handlePostInteraction = (record: any) => {
    console.log(record, 'postInteraction')
    let { userId, postId, interactionType } = record

    if (userId === profile?._id) return

    if (['Post Liked', 'Post UnLiked'].includes(interactionType)) {
      dispatch(setLikeDislike({
        _id: postId,
        userId
      }))
    } else if (['Post Loved', 'Post UnLoved'].includes(interactionType)) {
      dispatch(setLoveUnlove({
        _id: postId,
        userId
      }))
    }
  }

  useEffect(() => {
    socket.emit('livePostFeed');
    socket.on('postInteraction', handlePostInteraction);
    return () => {
      socket.emit('leaveLivePostFeed');
      socket.off('postInteraction', handlePostInteraction);
    };
  }, []);

  useEffect(() => {
    if (!isSearchModalOpen && !childId && tabIndex === 2) {
      return setTabIndex(1)
    }
    loadData(true, false, true)
  }, [tabIndex, childId, isSearchModalOpen]);

  if ((classloading || childloading) && !posts.length) {
    return <DataLoader />;
  }

  return (
    <Layout
      _styleSheetViewContent={{
        backgroundColor: colors.theme.background,
        paddingHorizontal: 0,
        marginHorizontal: 0,
      }}
      customHeader={
        <CustomHeader
          title="Posts"
          isActionEnbl={true}
          onPress={() => {
            navigation.navigate(EPostStack.activityList);
          }}
        />
      }>

      <View style={[styles.childrenCarousal]}>
        <FlatList
          data={children}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: vh * 2.63, // 20
            paddingHorizontal: vw * 2.78, // 10
          }}
          keyExtractor={item => item._id}
          renderItem={({ item }) => {
            return (
              <View key={item?._id} style={{ alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => { setChildId(prevChildId => item._id === prevChildId ? "" : item._id) }} style={{
                  justifyContent: 'center',
                  gap: 10
                }}>
                  <ImageBox
                    image={{ uri: item.image }}
                    _imageStyle={{
                      width: vh * 8,
                      height: vh * 8,
                    }}
                    _containerStyle={[
                      styles.imageContainer,
                      childId === item?._id && styles.selectedImageContainer,
                      { ...elevation(10) }
                    ]}
                  />
                </TouchableOpacity>
                <GrayMediumText text={`${item.firstName} ${item.lastName}`} _style={
                  styles.childName
                } />
              </View>
            )
          }}
        />
      </View>

      {/* <View style={[styles.customSwitch]}>
        <CustomSwitch
          selectionMode={tabIndex}
          options={['All', 'Class', 'Child']}
          roundCorner={true}
          onSelectSwitch={onSelectSwitch}
          selectionColor={colors.theme.secondary}
        />
      </View> */}

      {/* <SearchModal
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
      /> */}

      <View style={{
        flex: 1,
        paddingHorizontal: vw * 2.78, // 10
        marginHorizontal: vw * 2.78, // 10
      }}>
        {posts.length ?
          <LoadMoreFlatList
            uuidKey='_id'
            data={posts}
            renderItem={({ item }) => <ActivityPost userId={profile?._id} postId={item?._id} />}
            loadMore={loadData}
            loading={!appLoading && (classloading || childloading)}
          />
          : <NotFound text={`No posts available\nPlease add a new post`} />}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  childrenCarousal: {
    backgroundColor: colors.theme.white,
  },
  imageContainer: {
    marginHorizontal: 5,
    borderWidth: 3,
    borderRadius: 50,
    borderColor: colors.theme.primary, // Change only the color when selected
    padding: 2,
  },
  selectedImageContainer: {
    borderColor: colors.theme.darkGreen, // Change only the color when selected
  },
  childName: {
    fontSize: vh * 1.58, // 12
    fontWeight: '600',
    color: colors.theme.black,
    marginTop: vh * 1, // 10
  },
  customSwitch: {
    marginTop: vh * 2.63, // 20
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default Post;
