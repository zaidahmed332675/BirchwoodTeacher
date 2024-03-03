import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppRouting from './src/Navigation';
import { MenuProvider } from 'react-native-popup-menu';
import { colors } from './src/theme/colors';
// import FlashMessage from 'react-native-flash-message'

function App(): JSX.Element {
  return (
    <MenuProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar
            backgroundColor={colors.theme.primary}
            barStyle="light-content"
          />
          {/* <FlashMessage position="top" duration={2000} icon="auto" /> */}
          <AppRouting />
        </SafeAreaView>
      </GestureHandlerRootView>
    </MenuProvider>
  );
}

export default App;
