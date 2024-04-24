import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import workerImage from '../../Assets/images/worker.png';
import { colors } from '../../theme/colors';
import { GrayMediumText } from '../GrayMediumText';
import { VIcon } from '../VIcon';

export const Comment = () => {
  return (
    <View style={styles.comment}>
      <Image style={styles.commentPic} source={workerImage} />
      <View style={styles.commentData}>
        <GrayMediumText text="Mark Ramos" _style={styles.commentUserName} />
        <GrayMediumText
          _style={styles.commentText}
          text="Great work! Well done girl. Great work! Well done girl. Great
              work! Well done girl. Great work! Well done girl. Great work! Well
              done girl. Great work! Well done girl.👏🏽"
        />
        <View style={styles.commentAction}>
          <GrayMediumText text="Like" />
          <GrayMediumText text="Reply" />
          <GrayMediumText text="2m" />
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
    marginTop: 20,
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
    marginTop: 20,
    gap: 10,
  },
  moreAction: {
    alignSelf: 'flex-start',
  },
});
