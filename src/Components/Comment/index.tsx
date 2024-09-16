import React from 'react';
import { StyleSheet, View } from 'react-native';
import workerImage from '../../Assets/images/worker.png';
import { Comment as CommentProps } from '../../Types/Post';
import { formatCommentTime } from '../../Utils/options';
import { colors } from '../../apptheme/colors';
import { GrayMediumText } from '../GrayMediumText';
import { ImageBox } from '../UploadImage';
import { VIcon } from '../VIcon';

export const Comment = ({ comment }: { comment: CommentProps }) => {
  return (
    <View style={styles.comment}>
      <ImageBox _imageStyle={styles.commentPic} image={workerImage} _containerStyle={styles.commentPicContainer} />
      <View style={styles.commentData}>
        <GrayMediumText text="Waqas Mumtaz" _style={styles.commentUserName} />
        <GrayMediumText
          _style={styles.commentText}
          text={comment.content}
        />
        <View style={styles.commentAction}>
          <GrayMediumText text={formatCommentTime(comment.createdAt)} />
        </View>
      </View>
      <VIcon
        type="Ionicons"
        name="ellipsis-vertical"
        size={20}
        color={colors.theme.greyAlt2}
        style={styles.moreAction}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  comment: {
    flexDirection: 'row',
  },
  commentPicContainer: {
    justifyContent: 'flex-start',
  },
  commentPic: {
    width: 30,
    height: 30,
    borderRadius: 25,
    marginRight: 10,
  },
  commentData: {
    flexGrow: 1,
    flexShrink: 1,
  },
  commentUserName: {
    fontSize: 14,
    color: colors.theme.black,
  },
  commentText: {
    fontWeight: 'normal',
    color: colors.text.greyAlt2,
  },
  commentAction: {
    flexDirection: 'row',
    marginTop: 5,
    gap: 10,
  },
  moreAction: {
    alignSelf: 'flex-start',
  },
});
