import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import GrayMediumText from '../GrayMediumText';
import VIcon from '../VIcon';

const Reaction = () => {
  return (
    <View style={styles.reaction}>
      <GrayMediumText
        text="3.4k Comments 46 Shares"
        _style={{
          fontWeight: 'normal',
        }}
      />
      <View style={styles.reactionActions}>
        <View
          style={{
            backgroundColor: colors.theme.primary,
            width: 40,
            height: 40,
            borderRadius: 50,
            justifyContent: 'center',
          }}>
          <VIcon
            type="FontAwesome6"
            name="thumbs-up"
            size={16}
            color={colors.theme.white}
            style={styles.moreAction}
          />
        </View>
        <View
          style={{
            backgroundColor: colors.theme.primary,
            width: 40,
            height: 40,
            borderRadius: 50,
            justifyContent: 'center',
          }}>
          <VIcon
            type="Ionicons"
            name="chatbubble-ellipses"
            size={16}
            color={colors.theme.white}
            style={styles.moreAction}
          />
        </View>
        <View
          style={{
            backgroundColor: colors.theme.primary,
            width: 40,
            height: 40,
            borderRadius: 50,
            justifyContent: 'center',
          }}>
          <VIcon
            type="FontAwesome6"
            name="share"
            size={16}
            color={colors.theme.white}
            style={styles.moreAction}
          />
        </View>
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
    marginVertical: 10,
    gap: 10,
  },
  moreAction: {
    alignSelf: 'center',
  },
});

export default Reaction;
