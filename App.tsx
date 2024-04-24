import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppRouting from './src/Navigation';
import FlashMessage from 'react-native-flash-message';
import { Provider } from 'react-redux';
import { store } from './src/Stores';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          {/* old */}
          {/* <StatusBar
            backgroundColor={colors.theme.primary}
            barStyle="light-content"
          /> */}

          {/* new */}
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="dark-content"
          />

          <FlashMessage position="top" duration={2000} icon="auto" />
          <AppRouting />
        </SafeAreaView>
      </GestureHandlerRootView>
    </Provider>
  );
}

export default App;
