import React from 'react';
import {
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../../theme/colors';
import VIcon from '../VIcon';

type UserProfileCircleProps = {
  onPress?: () => void;
  disabled?: boolean;
  _style?: object;
} & ({ profileUri: ImageSourcePropType } | { name: string });

const UserProfileCircle = ({
  profileUri,
  name,
  onPress,
  disabled,
  _style,
}: UserProfileCircleProps) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View style={[styles.container, _style]}>
        {profileUri ? (
          <Image source={profileUri} style={styles.image} />
        ) : (
          <VIcon
            type="Ionicons"
            name={name}
            size={40}
            color={colors.text.greyAlt2}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  container: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
  },
  icon: {
    fontSize: 20,
    color: '#fff',
  },
};

export default UserProfileCircle;
