import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import SmallText from '../../Components/SmallText';
import { colors } from '../../theme/colors';
import MainLogo from '../../Components/MainLogo';
import ChildLogo from '../../Components/ChildLogo';
import SocialMediaIcons from '../../Components/SocialMediaIcons';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParams, EAuthStack } from '../../Types/NavigationTypes';
import AppInput from '../../Components/AppInput';
import AppButton from '../../Components/Button';

type Props = StackScreenProps<AuthStackParams, 'signIn'>;

const SignIn = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleForgotPassword = () => {
    navigation.navigate(EAuthStack.emailVerification);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ alignItems: 'center' }}>
          <MainLogo />
        </View>
        <View style={styles.formContainer}>
          <AppInput
            label="Email Address"
            placeholder={'Enter your email here'}
            value={email}
            required
            onChange={setEmail}
          />
          <AppInput
            label="Password"
            placeholder={'password'}
            value={password}
            required
            isPassword
            onChange={setPassword}
          />
          <View style={styles.forgotPasswordContainer}>
            <TouchableOpacity onPress={handleForgotPassword}>
              <SmallText
                text={'Forgot Password?'}
                _style={styles.forgotPasswordText}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <AppButton
            title="Sign In"
            onPress={() => navigation.navigate(EAuthStack.main)}
          />
        </View>
        <View style={{ alignItems: 'center', marginVertical: 10 }}>
          <ChildLogo _style={styles.childLogo} />
        </View>
        <SocialMediaIcons />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  forgotPasswordContainer: {
    marginTop: 10,
    alignItems: 'flex-end',
  },
  forgotPasswordText: {
    textDecorationLine: 'underline',
    color: colors.theme.primary,
  },
  childLogo: {
    height: 180,
    width: 320,
  },
});

export default SignIn;
