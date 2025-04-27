import React, { useEffect } from 'react';
import { Platform, SafeAreaView, StatusBar } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import AppRouting from './src/Navigation';
import { store } from './src/Stores';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { MenuProvider } from 'react-native-popup-menu';

function App(): JSX.Element {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <MenuProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
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
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </MenuProvider>
    </Provider>
  );
}

export default App;
