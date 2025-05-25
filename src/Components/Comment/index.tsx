import { BottomSheetFlatList, BottomSheetFlatListMethods } from '@gorhom/bottom-sheet';
import React, { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { asyncCreatePostComment, asyncGetCommentsByPostId } from '../../Stores/actions/post.action';
import { useAppDispatch, useAppSelector, useLoaderDispatch } from '../../Stores/hooks';
import { resetCommentsAndPaginationState, selectPostComments, setComment, setPost } from '../../Stores/slices/post.slice';
import { colors } from '../../Theme/colors';
import { Comment as CommentProps } from '../../Types/Post';
import { formatCommentTime } from '../../Utils/options';
import { socket } from '../../Utils/socket';
import { vh, vw } from '../../Utils/units';
import { AppInput } from '../AppInput';
import { GrayMediumText } from '../GrayMediumText';
import { LoadIndicator } from '../LoadIndicator';
import { NotFound } from '../NotFound';
import { ImageBox } from '../UploadImage';
import { VIcon } from '../VIcon';
import { FlatList } from 'react-native-gesture-handler';

interface commentsProps {
  postId: string;
  isSheetOpen: boolean;
}

export const Comments = ({ postId, isSheetOpen }: commentsProps) => {
  const dispatch = useAppDispatch()
  const bottomSheetFlatListRef = useRef<FlatList>(null)

  const [commentLoading, getPostComments] = useLoaderDispatch(asyncGetCommentsByPostId);
  const [_, createPostComment] = useLoaderDispatch(asyncCreatePostComment);

  const comments = useAppSelector(selectPostComments)

  const {
    control,
    handleSubmit,
    reset
  } = useForm<any>({
    defaultValues: {
      content: '',
    },
  });

  const loadData = (isFresh = false, ignoreLoading = false) => {
    if (!commentLoading || ignoreLoading) getPostComments({ postId, isFresh })
  }

  const handleNewComment = (record: { comment: CommentProps }) => {
    dispatch(setComment(record.comment))
  }

  useEffect(() => {
    socket.emit("joinPost", postId);
    socket.on("newComment", handleNewComment);
    return () => {
      socket.emit("leavePost", postId);
      socket.off("newComment", handleNewComment);
    };
  }, [postId]);

  useEffect(() => {
    return () => {
      dispatch(setPost({ _id: postId, commentsCount: comments.length }));
    };
  }, [postId, comments.length]);

  useEffect(() => {
    if (isSheetOpen) {
      loadData(true, true)
    }
    return () => {
      setTimeout(() => {
        dispatch(resetCommentsAndPaginationState());
      }, 100)
    }
  }, [postId, isSheetOpen]);

  const onSubmit = async (comment: Record<'content', string>) => {
    if (!comment.content) return
    let response = await createPostComment({ postId, comment })
    if (response.status) {
      reset()
      if (bottomSheetFlatListRef.current) {
        bottomSheetFlatListRef.current.scrollToOffset({ animated: true, offset: 0 });
      }
    }
  }

  if (commentLoading && !comments.length) {
    return <NotFound text={`Loading Comments...`} _textStyle={{ fontSize: 16 }} />
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{
        flexGrow: 1,
      }}>
        {comments.length ? <FlatList
          ref={bottomSheetFlatListRef}
          data={comments}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item: comment }) => <View style={styles.comments}><Comment key={comment._id} comment={comment} /></View>}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          onEndReachedThreshold={0.2}
          onEndReached={() => loadData()}
          ListFooterComponent={() => comments.length && commentLoading ? <LoadIndicator /> : null}
        />
          : <NotFound text={`No comments available`} _textStyle={{ fontSize: 16 }} />
        }
      </View>
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 10, backgroundColor: colors.theme.white }}>
        <Controller
          name="content"
          control={control}
          render={({ field: { onChange, value } }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
              <AppInput
                label=''
                placeholder="Write a comment..."
                value={value}
                onChange={onChange}
                _containerStyle={{ marginVertical: 0, flex: 1 }}
              />
              <View>
                <TouchableOpacity onPress={handleSubmit(onSubmit)}>
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
      </View>
    </View>
  )
}

export const Comment = ({ comment }: { comment: CommentProps }) => {

  let fullName = "motherFirstName" in comment.author ? `${comment.author.motherFirstName} ${comment.author.motherLastName}` : `${comment.author.firstName} ${comment.author.lastName}`

  return (
    <View style={styles.comment}>
      <ImageBox _imageStyle={styles.commentPic} image={{ uri: comment.author?.image }} _containerStyle={styles.commentPicContainer} />
      <View style={styles.commentData}>
        <GrayMediumText text={`${fullName}`} _style={styles.commentUserName} />
        <GrayMediumText
          _style={styles.commentText}
          text={comment.content}
        />
        <View style={styles.commentAction}>
          <GrayMediumText _style={{
            fontSize: vh * 1.32, // 10
          }} text={formatCommentTime(comment.createdAt)} />
        </View>
      </View>
      <VIcon
        type="Ionicons"
        name="ellipsis-vertical"
        size={18}
        color={colors.theme.greyAlt2}
        style={styles.moreAction}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  comments: {
    paddingVertical: vh * 1.32, // 10
    borderTopWidth: 0.5,
    borderColor: colors.theme.greyAlt,
    gap: 20,
  },
  comment: {
    flexDirection: 'row',
  },
  commentPicContainer: {
    justifyContent: 'flex-start',
  },
  commentPic: {
    width: vw * 8.33, // 30
    height: vh * 3.95, // 30
    borderRadius: (vw * 8.33) / 2, // 25
    marginRight: 10,
  },
  commentData: {
    flexGrow: 1,
    flexShrink: 1,
  },
  commentUserName: {
    fontSize: vh * 1.84, // 14
    color: colors.theme.black,
  },
  commentText: {
    fontWeight: 'normal',
    color: colors.text.greyAlt2,
  },
  commentAction: {
    flexDirection: 'row',
    marginTop: vh * 0.66, // 5
  },
  moreAction: {
    alignSelf: 'flex-start',
  },
});
