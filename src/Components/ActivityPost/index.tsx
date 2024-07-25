import { useAnimations } from '@react-native-media-console/reanimated';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { formatDistanceToNow } from 'date-fns';
import lodash from 'lodash';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import VideoPlayer from 'react-native-media-console';
import { asyncCreatePostComment, asyncDeletePost, asyncGetCommentsByPostId, asyncLikePost, asyncLovePost } from '../../Stores/actions/post.action';
import { useAppSelector, useLoaderDispatch } from '../../Stores/hooks';
import { selectPostComments } from '../../Stores/slices/post.slice';
import { selectUserProfile } from '../../Stores/slices/user.slice';
import { EPostStack, PostStackParams } from '../../Types/NavigationTypes';
import { Post } from '../../Types/Post';
import { isImage, isVideo } from '../../Utils/options';
import { getImagePath } from '../../services/axios';
import { colors } from '../../theme/colors';
import { AppInput } from '../AppInput';
import { Comment } from '../Comment';
import { GrayMediumText } from '../GrayMediumText';
import { Reaction } from '../Reaction';
import { ImageBox } from '../UploadImage';
import { VIcon } from '../VIcon';

export const ActivityPost = ({ item: post }: { item: Post }) => {
  const navigation = useNavigation<NavigationProp<PostStackParams>>()

  const [likeLoading, likePost] = useLoaderDispatch(asyncLikePost, false);
  const [loveLoading, lovePost] = useLoaderDispatch(asyncLovePost, false);
  const [commentLoading, getPostComments] = useLoaderDispatch(asyncGetCommentsByPostId, false);
  const [createCommentLoading, createPostComment] = useLoaderDispatch(asyncCreatePostComment);
  const [deletePostLoading, deletePost] = useLoaderDispatch(asyncDeletePost);

  const profile = useAppSelector(selectUserProfile)
  const comments = useAppSelector(selectPostComments(post._id))
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });
  const [toggleComments, setToggleComments] = useState(false)


  const handleLike = () => {
    if (likeLoading) return
    likePost({ postId: post._id })
  }

  const handleLove = () => {
    if (loveLoading) return
    lovePost({ postId: post._id })
  }

  const handleGetComments = () => {
    setToggleComments((state) => !state)
    if (toggleComments || commentLoading) return
    getPostComments({ postId: post._id })
  }

  const {
    control,
    handleSubmit,
    reset
  } = useForm<any>({
    defaultValues: {
      content: '',
    },
  });

  const handleOnCommmentSubmit = async (comment: Record<'content', string>) => {
    if (!comment.content) return
    let response = await createPostComment({ postId: post._id, comment })
    if (response.status) reset()
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
            fontSize: 12
          }}
        />
        <GrayMediumText
          text={`${post.loves.length} Loved`}
          _style={{
            fontWeight: 'normal',
            fontSize: 12
          }}
        />
        <GrayMediumText
          text={`${comments.length} Comments`}
          _style={{
            fontWeight: 'normal',
            fontSize: 12
          }}
        />
      </View>
      <Reaction post={post} handleLike={handleLike} handleLove={handleLove} toggleComments={handleGetComments} />
      {toggleComments && <View style={styles.comments}>
        {!commentLoading ? comments.length ? comments.map((comment) => {
          return <Comment key={comment._id} comment={comment} />
        }) : <GrayMediumText _style={styles.timeStamp} text={"No Comments Found!"} />
          : <GrayMediumText _style={styles.timeStamp} text={"Loading Comments!"} />}
        <Controller
          name="content"
          control={control}
          render={({ field: { onChange, value } }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <AppInput
                label=''
                placeholder="Write a comment..."
                value={value}
                onChange={onChange}
                _containerStyle={{ marginVertical: 0, flex: 1 }}
              />
              <View>
                <TouchableOpacity onPress={handleSubmit(handleOnCommmentSubmit)}>
                  <VIcon
                    type="MaterialCommunityIcons"
                    name={"send-circle"}
                    size={45}
                    color={colors.theme.primary}
                    style={{
                      marginLeft: 5
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: colors.theme.greyAlt,
    paddingTop: 20,
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
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.theme.greyAlt2,
  },
  userName: {
    fontSize: 16,
    color: colors.text.dimBlack,
  },
  timeStamp: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#888',
  },
  postText: {
    fontSize: 14,
    marginVertical: 10,
    color: colors.text.dimBlack,
  },
  postImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    resizeMode: 'cover'
  },
  comments: {
    paddingVertical: 20,
    borderTopWidth: 0.5,
    borderColor: colors.theme.greyAlt,
    gap: 20,
  },
});
