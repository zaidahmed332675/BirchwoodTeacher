import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors } from '../../theme/colors';
import { VIcon } from '../VIcon';

export const Reaction = () => {
  return (
    <View style={styles.reaction}>
      <View style={styles.reactionActions}>
        <TouchableOpacity style={[styles.action, styles.actionSelected]}>
          <VIcon
            type="FontAwesome6"
            name="thumbs-up"
            size={16}
            color={colors.theme.white}
            style={styles.moreAction}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.action}>
          <VIcon
            type="Ionicons"
            name="chatbubble-ellipses"
            size={16}
            color={colors.theme.white}
            style={styles.moreAction}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.action}>
          <VIcon
            type="FontAwesome6"
            name="share"
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
    marginVertical: 10,
  },
  reactionActions: {
    flexDirection: 'row',
    gap: 10,
  },
  action: {
    backgroundColor: colors.theme.secondary,
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
