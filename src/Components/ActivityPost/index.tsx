import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import profile from '../../Assets/images/profile_bg.png';
import postImage from '../../Assets/images/forgot_child.png';
import { colors } from '../../theme/colors';
import Comment from '../Comment';
import GrayMediumText from '../GrayMediumText';
import Reaction from '../Reaction';

const ActivityPost = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.profilePic} source={profile} />
        <View>
          <GrayMediumText _style={styles.userName} text="Anna Mary" />
          <GrayMediumText _style={styles.timeStamp} text="2 hours ago" />
        </View>
      </View>
      <Text style={styles.postText}>
        Hey pals, guess what? 💥 I’ve just wrapped up crafting these
        mind-blowing 3D wallpapers, drenched in the coolest of cool colors! 🎨
      </Text>
      <Image style={styles.postImage} source={postImage} />
      <View style={styles.reactions}>
        <Reaction />
      </View>
      <View style={styles.comments}>
        <Comment />
        <Comment />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 0.5,
    borderColor: colors.theme.greyAlt,
    padding: 15,
    backgroundColor: colors.theme.white,
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
  reactions: {},
  comments: {
    borderTopWidth: 0.5,
    borderColor: colors.theme.greyAlt,
    paddingTop: 20,
    gap: 10,
  },
});

export default ActivityPost;
