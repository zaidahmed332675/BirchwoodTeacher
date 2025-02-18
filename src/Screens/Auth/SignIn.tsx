import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import chil_logo from '../../Assets/images/logo/child_logo.png';
import { AppInput } from '../../Components/AppInput';
import { AppButton } from '../../Components/Button';
import { GrayMediumText } from '../../Components/GrayMediumText';
import { MainLogo } from '../../Components/MainLogo';
import { SocialMediaIcons } from '../../Components/SocialMediaIcons';
import { asyncLogin } from '../../Stores/actions/user.action';
import { useAppDispatch } from '../../Stores/hooks';
import { AuthStackParams, EAuthStack } from '../../Types/NavigationTypes';
import { LoginUserPayload } from '../../Types/User';
import { vh, vw } from '../../Utils/units';
import { colors } from '../../Theme/colors';

type Props = StackScreenProps<AuthStackParams, 'signIn'>;

const SignIn = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();

  const handleForgotPassword = () => {
    navigation.navigate(EAuthStack.emailVerification);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserPayload>({
    defaultValues: {
      email: 'teacher001@gmail.com',
      password: 'Teacher@123456',
    },
  });

  const onSubmit = useCallback(
    async (body: LoginUserPayload) => {
      const res = await dispatch(asyncLogin(body)).unwrap();
      if (res.status) {
        navigation.navigate(EAuthStack.main);
      }
    },
    [navigation, dispatch]
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.mainLogo}>
          <MainLogo />
        </View>
        <View style={styles.formContainer}>
          <Controller
            name="email"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Email is required',
              },
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Email format is invalid',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <AppInput
                label="Email Address"
                placeholder={'Enter your email'}
                value={value}
                required
                onChange={onChange}
              />
            )}
          />

          {errors.email?.message && (
            <GrayMediumText
              _style={{ color: colors.theme.lightRed }}
              text={errors.email.message}
            />
          )}

          <Controller
            name="password"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Password is required',
              },
              minLength: {
                value: 8,
                message: 'Password must be minimum 8 characters',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <AppInput
                label="Password"
                placeholder={'Enter your password'}
                value={value}
                required
                isPassword
                onChange={onChange}
              />
            )}
          />

          {errors.password?.message && (
            <GrayMediumText
              _style={{ color: colors.theme.lightRed }}
              text={errors.password.message}
            />
          )}

          <View style={styles.forgotPasswordContainer}>
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <AppButton
            title="Sign In"
            btnStyle={styles.signInBtn}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
        <View style={styles.childLogoBox}>
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
    paddingVertical: vh * 2.63, // 20
    paddingHorizontal: vw * 5.56, // 20
    justifyContent: 'center',
  },
  mainLogo: {
    width: "80%",
    height: "15%",
    marginVertical: vh * 5,
    alignSelf: 'center',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  forgotPasswordContainer: {
    marginTop: vh * 1.32, // 10
    alignItems: 'flex-end',
  },
  forgotPasswordText: {
    textDecorationLine: 'underline',
    color: colors.theme.primary,
  },
  childLogoBox: {
    alignSelf: 'center',
    width: "100%",
    height: "20%",
    marginVertical: vh * 1.32, // 10
  },
  childLogo: {
    height: "100%",
    width: "100%",
  },
  signInBtn: {
    marginVertical: vh * 1.32, // 10
  },
});

export default SignIn;
