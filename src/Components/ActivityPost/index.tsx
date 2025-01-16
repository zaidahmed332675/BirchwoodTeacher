import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useAnimations } from '@react-native-media-console/reanimated';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { formatDistanceToNow } from 'date-fns';
import lodash from 'lodash';
import React, { useMemo, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import VideoPlayer from 'react-native-media-console';
import { getImagePath } from '../../Service/axios';
import { asyncDeletePost, asyncLikePost, asyncLovePost } from '../../Stores/actions/post.action';
import { useAppSelector, useLoaderDispatch } from '../../Stores/hooks';
import { selectUserProfile } from '../../Stores/slices/user.slice';
import { colors } from '../../Theme/colors';
import { EPostStack, PostStackParams } from '../../Types/NavigationTypes';
import { Post } from '../../Types/Post';
import { isImage, isVideo } from '../../Utils/options';
import { AppBottomSheet } from '../BottomSheet';
import { Comments } from '../Comment';
import { GrayMediumText } from '../GrayMediumText';
import { Reaction } from '../Reaction';
import { ImageBox } from '../UploadImage';
import { VIcon } from '../VIcon';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { vh, vw } from '../../Utils/units';

export const ActivityPost = ({ item: post }: { item: Post }) => {
  const navigation = useNavigation<NavigationProp<PostStackParams>>()

  const sheetRef = useRef<BottomSheetModalMethods>(null);

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const [likeLoading, likePost] = useLoaderDispatch(asyncLikePost, false);
  const [loveLoading, lovePost] = useLoaderDispatch(asyncLovePost, false);
  const [_, deletePost] = useLoaderDispatch(asyncDeletePost);

  const profile = useAppSelector(selectUserProfile)
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });

  const handleLike = () => {
    if (likeLoading) return
    likePost({ postId: post._id })
  }

  const handleLove = () => {
    if (loveLoading) return
    lovePost({ postId: post._id })
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
        onPress: () => deletePost({ postId: post._id })
      },
    ]);
  }

  const media = lodash.shuffle([...post.images, ...post.videos]);
  const snapPoints = useMemo(() => ["75"], []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.author}>
          <ImageBox image={{ uri: profile.image }} _imageStyle={styles.profilePic} />
          <View>
            <GrayMediumText _style={styles.userName} text={`${profile.firstName} ${profile.lastName}`} />
            <GrayMediumText _style={styles.timeStamp} text={timeAgo} />
          </View>
        </View>
        <View style={{
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
        </View>
      </View>
      <Text style={styles.postText}>
        {post.content}
      </Text>
      {media.length ? <View style={{
        gap: 10
      }}>
        {
          media.map((media, index) => {
            if (isImage(media)) {
              return <ImageBox key={`${media}_${index}`} image={{ uri: media }} _imageStyle={styles.postImage} _containerStyle={{
                height: 200
              }} />
            }
            else if (isVideo(media)) {
              return <VideoPlayer
                key={`${media}_${index}`}
                useAnimations={useAnimations}
                disableBack
                paused={true}
                poster={getImagePath(media)}
                source={{
                  uri: getImagePath(media),
                }}
                resizeMode='contain'
                containerStyle={{
                  borderRadius: 10
                }}
                style={{
                  height: 250,
                  width: '100%'
                }}
              />
            } else {
              return <></>
            }
          })
        }
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
      <Reaction post={post} handleLike={handleLike} handleLove={handleLove} handleSheetPresent={() => sheetRef.current?.present()} />
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
    borderColor: colors.theme.greyAlt,
    paddingTop: vh * 2.63, // 20
    borderBottomWidth: 0.5,
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
    marginRight: vw * 2.78, // 10
    borderWidth: 1,
    borderColor: colors.theme.greyAlt2,
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
    borderRadius: 8,
    resizeMode: 'cover'
  },
});
