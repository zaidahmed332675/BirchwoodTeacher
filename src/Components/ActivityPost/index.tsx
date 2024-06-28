import { formatDistanceToNow } from 'date-fns';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppSelector } from '../../Stores/hooks';
import { selectUserProfile } from '../../Stores/slices/user.slice';
import { Post } from '../../Types/Post';
import { colors } from '../../theme/colors';
import { Comment } from '../Comment';
import { GrayMediumText } from '../GrayMediumText';
import { Reaction } from '../Reaction';
import { ImageBox } from '../UploadImage';

export const ActivityPost = ({ item: post }: { item: Post }) => {
  const profile = useAppSelector(selectUserProfile)
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ImageBox image={{ uri: profile.image }} _imageStyle={styles.profilePic} />
        <View>
          <GrayMediumText _style={styles.userName} text="Anna Mary" />
          <GrayMediumText _style={styles.timeStamp} text={timeAgo} />
        </View>
      </View>
      <Text style={styles.postText}>
        {post.content}
      </Text>
      <ImageBox image={{ uri: post.images[0] }} _imageStyle={styles.postImage} />
      <View style={{
        flexDirection: 'row',
        marginTop: 10,
        gap: 20,
      }}>
        <GrayMediumText
          text="2 Likes"
          _style={{
            fontWeight: 'normal',
            fontSize: 12
          }}
        />
        <GrayMediumText
          text="2 Dislikes"
          _style={{
            fontWeight: 'normal',
            fontSize: 12
          }}
        />
        <GrayMediumText
          text="2 Comments"
          _style={{
            fontWeight: 'normal',
            fontSize: 12
          }}
        />
      </View>
      <Reaction />
      <View style={styles.comments}>
        <Comment />
        <Comment />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: colors.theme.greyAlt,
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
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
    height: 200,
    resizeMode: 'contain',
    borderWidth: 1,
    borderRadius: 20,
  },
  comments: {
    borderTopWidth: 0.5,
    borderColor: colors.theme.greyAlt,
  },
});
