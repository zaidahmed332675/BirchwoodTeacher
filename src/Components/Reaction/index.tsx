import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Post } from '../../Types/Post';
import { colors } from '../../Theme/colors';
import { VIcon } from '../VIcon';

interface ReactionProps {
  handleLike: () => void;
  handleLove: () => void;
  handleSheetPresent?: () => void;
  post: Post
}

export const Reaction = ({ post, handleLike, handleLove, handleSheetPresent }: ReactionProps) => {
  return (
    <View style={styles.reaction}>
      <View style={styles.reactionActions}>
        <TouchableOpacity style={[styles.action, post.likes.length ? styles.actionSelected : {}]} onPress={handleLike}>
          <VIcon
            type="FontAwesome"
            name={post.likes.length ? "thumbs-up" : "thumbs-o-up"}
            size={16}
            color={colors.theme.white}
            style={styles.moreAction}
          />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.action, post.loves.length ? styles.actionSelected : {}]} onPress={handleLove}>
          <VIcon
            type="FontAwesome"
            name={post.loves.length ? "heart" : "heart-o"}
            size={16}
            color={colors.theme.white}
            style={styles.moreAction}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.action} onPress={handleSheetPresent}>
          <VIcon
            type="Ionicons"
            name="chatbubble-ellipses-outline"
            size={16}
            color={colors.theme.white}
            style={styles.moreAction}
          />
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
