import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import profile from '../../Assets/images/profile_bg.png';
import postImage from '../../Assets/images/forgot_child.png';
import { colors } from '../../theme/colors';

const ActivityPost = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.profilePic} source={profile} />
        <View>
          <Text style={styles.userName}>Anna Mary</Text>
          <Text style={styles.timeStamp}>2 hours ago</Text>
        </View>
      </View>
      <Text style={styles.postText}>
        Hey pals, guess what? 💥 I’ve just wrapped up crafting these
        mind-blowing 3D wallpapers, drenched in the coolest of cool colors! 🎨
      </Text>
      <Image style={styles.postImage} source={postImage} />
      <View style={styles.reactions}>
        {/* Add your reaction components here */}
      </View>
      <View style={styles.comments}>
        {/* Add your comments components here */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
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
    fontWeight: 'bold',
    color: colors.text.dimBlack,
  },
  timeStamp: {
    fontSize: 12,
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
  reactions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  comments: {
    // Style your comments section
  },
});

export default ActivityPost;
