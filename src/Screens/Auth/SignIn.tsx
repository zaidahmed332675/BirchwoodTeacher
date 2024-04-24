import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import chil_logo from '../../Assets/images/logo/child_logo.png';
import { AppInput } from '../../Components/AppInput';
import { AppButton } from '../../Components/Button';
import { MainLogo } from '../../Components/MainLogo';
import { SocialMediaIcons } from '../../Components/SocialMediaIcons';
import { AuthStackParams, EAuthStack } from '../../Types/NavigationTypes';
import { colors } from '../../theme/colors';
import { vh } from '../../Utils/units';

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
        <View style={{ alignItems: 'center', marginTop: vh * 5 }}>
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
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <AppButton
            title="Sign In"
            btnStyle={{
              marginVertical: 10,
            }}
            onPress={() => navigation.navigate(EAuthStack.main)}
          />
        </View>
        <View style={{ alignItems: 'center', marginVertical: 10 }}>
          <Image
            source={chil_logo}
            resizeMode="contain"
            style={styles.childLogo}
          />
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
