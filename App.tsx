import React from 'react';
import { Platform, SafeAreaView, StatusBar } from 'react-native';
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
          <FlashMessage
            position={
              Platform.OS === 'ios'
                ? 'top'
                : { top: StatusBar.currentHeight, left: 0, right: 0 }
            }
            duration={2000}
            icon="auto"
            animated={true}
          />
          <AppRouting />
        </SafeAreaView>
      </GestureHandlerRootView>
    </Provider>
  );
}

export default App;
