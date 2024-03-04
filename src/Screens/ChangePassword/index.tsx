import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppInput } from '../../Components/AppInput';
import { AppButton } from '../../Components/Button';
import { GlroyBold } from '../../Components/GlroyBoldText';
import { GrayMediumText } from '../../Components/GrayMediumText';
import { Layout } from '../../Components/Layout';
import { MainStackParams } from '../../Types/NavigationTypes';
import { vw } from '../../Utils/units';
import { colors } from '../../theme/colors';
import { CustomHeader } from '../../Components/CustomHeader';

type Props = StackScreenProps<MainStackParams, 'changePassword'>;

function ChangePassword({}: Props) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <Layout customHeader={<CustomHeader title="Change Password" />}>
      <View style={styles.heading}>
        <GlroyBold
          text={'Change Password ?'}
          _style={{ color: colors.theme.primary, fontSize: vw * 6 }}
        />
      </View>
      <GrayMediumText
        text={
          'Please enter a new password for your account below. Make sure it is strong and secure.'
        }
        _style={styles.para}
      />
      <View>
        <AppInput
          label="Current Password"
          placeholder="Enter Current Password"
          value={password}
          required
          onChange={setPassword}
          isPassword
        />
        <AppInput
          label="New Password"
          placeholder="Enter New Password"
          value={password}
          required
          onChange={setPassword}
          isPassword
        />
        <AppInput
          label="Confirm Password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          required
          onChange={setConfirmPassword}
          isPassword
        />
      </View>
      <View style={{ alignItems: 'center' }}>
        <AppButton title="Update" onPress={() => {}} />
      </View>
    </Layout>
  );
}
const styles = StyleSheet.create({
  para: {
    textAlign: 'center',
    marginTop: 15,
    lineHeight: 22,
  },
  heading: {
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChangePassword;
