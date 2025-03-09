import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Post } from '../../Types/Post';
import { colors } from '../../Theme/colors';
import { VIcon } from '../VIcon';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withSequence, withTiming } from 'react-native-reanimated';

interface ReactionProps {
  handleLike: () => Promise<void>;
  handleLove: () => Promise<void>;
  handleSheetPresent?: () => void;
  userId: string;
  post: Post;
}

export const Reaction = ({ userId, post, handleLike, handleLove, handleSheetPresent }: ReactionProps) => {
  const [localLikes, setLocalLikes] = useState(post.likes.includes(userId));
  const [localLoves, setLocalLoves] = useState(post.loves.includes(userId));

  const likeScale = useSharedValue(1);
  const loveScale = useSharedValue(1);
  const commentScale = useSharedValue(1);
  const likeRotation = useSharedValue(0);
  const loveRotation = useSharedValue(0);

  const likeStyle = useAnimatedStyle(() => ({
    transform: [{ scale: likeScale.value }, { rotate: `${likeRotation.value}deg` }],
  }));

  const loveStyle = useAnimatedStyle(() => ({
    transform: [{ scale: loveScale.value }, { rotate: `${loveRotation.value}deg` }],
  }));

  const commentStyle = useAnimatedStyle(() => ({
    transform: [{ scale: commentScale.value }],
  }));

  const animateLike = async () => {
    setLocalLikes(!localLikes);
    likeScale.value = withSequence(
      withTiming(1.4, { duration: 100 }),
      withSpring(1, { damping: 4, stiffness: 250 })
    );
    likeRotation.value = withSequence(
      withTiming(-10, { duration: 50 }),
      withTiming(10, { duration: 50 }),
      withTiming(0, { duration: 50 })
    );
    try {
      await handleLike();
    } catch (error) {
      setLocalLikes(localLikes);
    }
  };

  const animateLove = async () => {
    setLocalLoves(!localLoves);
    loveScale.value = withSequence(
      withTiming(1.5, { duration: 120 }),
      withSpring(1, { damping: 4, stiffness: 250 })
    );
    loveRotation.value = withSequence(
      withTiming(-15, { duration: 50 }),
      withTiming(15, { duration: 50 }),
      withTiming(0, { duration: 50 })
    );
    try {
      await handleLove();
    } catch (error) {
      setLocalLoves(localLoves);
    }
  };

  const animateComment = () => {
    commentScale.value = withSequence(
      withTiming(1.3, { duration: 100 }),
      withSpring(1, { damping: 4, stiffness: 250 })
    );
    handleSheetPresent && handleSheetPresent();
  };

  return (
    <View style={styles.reaction}>
      <View style={styles.reactionActions}>
        <TouchableOpacity
          style={[styles.action, localLikes ? styles.actionSelected : {}]}
          onPress={animateLike}
        >
          <Animated.View style={likeStyle}>
            <VIcon
              type="FontAwesome"
              name={localLikes ? 'thumbs-up' : 'thumbs-o-up'}
              size={16}
              color={colors.theme.white}
              style={styles.moreAction}
            />
          </Animated.View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.action, localLoves ? styles.actionSelected : {}]}
          onPress={animateLove}
        >
          <Animated.View style={loveStyle}>
            <VIcon
              type="FontAwesome"
              name={localLoves ? 'heart' : 'heart-o'}
              size={16}
              color={colors.theme.white}
              style={styles.moreAction}
            />
          </Animated.View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.action} onPress={animateComment}>
          <Animated.View style={commentStyle}>
            <VIcon
              type="Ionicons"
              name="chatbubble-ellipses-outline"
              size={16}
              color={colors.theme.white}
              style={styles.moreAction}
            />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  reaction: {
    marginBottom: 20,
    marginTop: 10,
  },
  reactionActions: {
    flexDirection: 'row',
    gap: 10,
  },
  action: {
    backgroundColor: colors.theme.greyAlt,
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
  },
  actionSelected: {
    backgroundColor: colors.theme.primary,
  },
  moreAction: {
    alignSelf: 'center',
  },
});
