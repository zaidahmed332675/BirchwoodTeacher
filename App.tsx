import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppRouting from './src/Navigation';
import { colors } from './src/theme/colors';
// import MainStack from './src/Navigation/MainStack';
// import {colors} from './src/Utils/theme'
// import FlashMessage from 'react-native-flash-message'

function App(): JSX.Element {
  return (
    // <Provider store={store}>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor={colors.theme.primary} />
        {/* <FlashMessage position="top" duration={2000} icon="auto" /> */}
        {/* <MainStack /> */}
        <AppRouting />
      </SafeAreaView>
    </GestureHandlerRootView>
    // </Provider>
  );
}

export default App;
