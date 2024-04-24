import React from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  //   ScrollView,
  //   KeyboardAvoidingView,
  //   SafeAreaView,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const FormWrapper = ({ children }: any) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollView
        style={{ backgroundColor: 'yellow' }}
        // behavior="padding"
        // enabled
      >
        {/* <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}> */}
        {children}
        {/* </ScrollView> */}
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
};
