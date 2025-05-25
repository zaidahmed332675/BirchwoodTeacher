import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { formatDistanceToNow } from 'date-fns';
import lodash from 'lodash';
import React, { useMemo, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { asyncDeletePost, asyncLikePost, asyncLovePost } from '../../Stores/actions/post.action';
import { useAppSelector, useLoaderDispatch } from '../../Stores/hooks';
import { colors } from '../../Theme/colors';
import { EPostStack, PostStackParams } from '../../Types/NavigationTypes';
// import { isImage, isVideo } from '../../Utils/options';
import { vh, vw } from '../../Utils/units';
import { AppBottomSheet } from '../BottomSheet';
import { Comments } from '../Comment';
import { GrayMediumText } from '../GrayMediumText';
import { Reaction } from '../Reaction';
import { ImageBox } from '../UploadImage';
import { VIcon } from '../VIcon';
// import { AppVideoPlayer } from './AppVideoPlayer';
import { selectPostById } from '../../Stores/slices/post.slice';
import { elevation } from '../../Utils/elevation';
import { DataLoader } from '../DataLoader';
import { AppMenu } from '../Menu';
import { PostMediaGrid } from '../PostImageGrid';
import { getRelativeTimeFromNow } from '../../Utils/options';

export const ActivityPost = ({ userId, postId }: { userId: string, postId: string }) => {
  const navigation = useNavigation<NavigationProp<PostStackParams>>()
  const post = useAppSelector(selectPostById(postId))

  const sheetRef = useRef<BottomSheetModalMethods>(null);

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const [likeLoading, likePost] = useLoaderDispatch(asyncLikePost, false);
  const [loveLoading, lovePost] = useLoaderDispatch(asyncLovePost, false);
  const [_, deletePost] = useLoaderDispatch(asyncDeletePost);

  if (!post?._id) {
    return <View style={styles.container}>
      <DataLoader />
    </View>
  }

  const handleLike = async () => {
    if (likeLoading) return
    await likePost({ postId: post?._id })
  }

  const handleLove = async () => {
    if (loveLoading) return
    await lovePost({ postId: post?._id })
  }

  const handlePostDelete = () => {
    Alert.alert('Warning', 'Are you sure you want to delete this post permanently?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => deletePost({ postId: post?._id })
      },
    ]);
  }

  const media = useMemo(() => {
    return lodash.shuffle([...post?.images, ...post?.videos]);
  }, [post.images, post.videos])

  const snapPoints = useMemo(() => ["84%"], []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.author}>
          <ImageBox image={{ uri: post.author?.image }} _imageStyle={styles.profilePic} _containerStyle={{
            ...styles.profilePic,
            ...elevation(10),
          }} />
          <View style={{
            marginLeft: vw * 2.78, // 10
          }}>
            <GrayMediumText _style={styles.userName} text={`${post.author?.firstName} ${post.author?.lastName}`} />
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 5 }}>
              <VIcon type='Ionicons' name='earth-sharp' color={colors.theme.grey} size={15} />
              <GrayMediumText _style={styles.timeStamp} text={getRelativeTimeFromNow(post?.createdAt)} />
            </View>
          </View>
        </View>
        {/* <View style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'row',
          gap: 5,
          top: 5,
          right: 5,
        }}>
          <TouchableOpacity onPress={() => navigation.navigate(EPostStack.createPost, {
            activityId: '',
            postId: post?._id
          })}>
            <VIcon
              type="Feather"
              name={"edit-3"}
              size={20}
              color={colors.theme.darkGreen}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePostDelete}>
            <VIcon
              type="AntDesign"
              name={"delete"}
              size={20}
              color={colors.theme.darkRed}
            />
          </TouchableOpacity>
        </View> */}
        <View style={{ position: 'absolute', top: 5, right: 5 }}>
          <AppMenu
            options={[
              {
                label: 'Edit',
                onPress: () =>
                  navigation.navigate(EPostStack.createPost, {
                    activityId: '',
                    postId: post?._id,
                  }),
                icon: { type: 'Feather', name: 'edit-3', color: '#4caf50' }
              },
              {
                label: 'Delete',
                onPress: handlePostDelete,
                color: colors.theme.darkRed,
                icon: { type: 'AntDesign', name: 'delete', color: '#f44336' }
              },
            ]}
          />
        </View>
      </View>
      <Text style={styles.postText}>
        {post.content}
      </Text>
      {media.length ? <View style={{
        gap: 10,
        flex: 1,
      }}>
        <PostMediaGrid media={media} _imageStyle={
          styles.postImage
        } />

        {/* {
          media.map((media, index) => {
            if (isImage(media)) {
              return <ImageBox key={`${media}_${index}`} image={{ uri: media }} _imageStyle={styles.postImage} _containerStyle={{
                height: vh * 26.32,
              }} />
            }
            else if (isVideo(media)) {
              return <AppVideoPlayer key={`${media}_${index}`} index={index} media={media} />
            } else {
              return <></>
            }
          })
        } */}
      </View> : null}
      <View style={{
        flexDirection: 'row',
        marginTop: 10,
        gap: 10,
      }}>
        <GrayMediumText
          text={`${post.likes.length} Likes`}
          _style={{
            fontWeight: 'normal',
            fontSize: vh * 1.58, // 12
          }}
        />
        <GrayMediumText
          text={`${post.loves.length} Loved`}
          _style={{
            fontWeight: 'normal',
            fontSize: vh * 1.58, // 12
          }}
        />
        <GrayMediumText
          text={`${post.commentsCount ?? 0} Comments`}
          _style={{
            fontWeight: 'normal',
            fontSize: vh * 1.58, // 12
          }}
        />
      </View>
      <Reaction userId={userId} post={post} handleLike={handleLike} handleLove={handleLove} handleSheetPresent={() => sheetRef.current?.present()} />
      <AppBottomSheet
        ref={sheetRef}
        isSheetOpen={isSheetOpen}
        enableDynamicSizing={false}
        onChange={(index) => {
          setIsSheetOpen(index >= 0)
        }}
        onDismiss={() => {
          sheetRef.current?.dismiss()
          setIsSheetOpen(false)
        }}
        snapPoints={snapPoints}
        enableDismissOnClose
        enablePanDownToClose
        _handleStyle={{
          backgroundColor: colors.theme.greyAlt,
        }}
        _sheetStyle={{
          backgroundColor: colors.theme.white,
        }}
      >
        {isSheetOpen && <Comments isSheetOpen={isSheetOpen} postId={post?._id} />}
      </AppBottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.theme.white,
    borderRadius: vh * 2.63, // 20
    padding: vh * 2.63, // 20
    marginTop: vh * 2.63, // 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  author: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    width: vw * 13.89, // 50,
    height: vh * 6.58, // 50,
    borderRadius: (vw * 13.89) / 2,
    borderWidth: 1,
    borderColor: colors.theme.primary,
  },
  userName: {
    fontSize: vh * 2.11, // 16
    color: colors.text.dimBlack,
  },
  timeStamp: {
    fontSize: vh * 1.58, // 12
    fontWeight: 'normal',
    color: '#888',
  },
  postText: {
    fontSize: vh * 1.84, // 14
    marginVertical: vh * 1.32, // 10
    color: colors.text.dimBlack,
  },
  postImage: {
    width: '100%',
    height: '100%',
    borderRadius: 0,
    resizeMode: 'cover'
  },
});
