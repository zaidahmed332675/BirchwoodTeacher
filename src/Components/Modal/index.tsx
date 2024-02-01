import React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import {
  StyleSheet,
  View,
  Modal,
  // ActivityIndicator,
  // TouchableOpacity,
  // Text,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../theme/colors';

interface AppModalProps {
  isModalVisible: boolean;
  children: React.ReactNode;
  _styleContent?: object;
  _styleBackground?: object;
  onClose: () => void;
}

const AppModal = ({
  isModalVisible,
  children,
  _styleContent,
  _styleBackground,
  onClose,
}: AppModalProps) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isModalVisible}
      onRequestClose={onClose}>
      <View style={[styles.modalBackground, _styleBackground]}>
        <View style={[styles.modalContent, _styleContent]}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicon
                name="close-circle-outline"
                size={26}
                color={colors.theme.white}
              />
            </TouchableOpacity>
          </View>
          {children}
        </View>
        {/* <View style={styles.activityIndicatorWrapper}> */}
        {/* <ActivityIndicator
            style={styles.loader}
            animating={true}
            size={'large'}
            color="white"
          /> */}
        {/* </View> */}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#rgba(0, 0, 0, 0.7)',
    zIndex: 1000,
  },
  modalContent: {},
  header: {
    backgroundColor: colors.theme.primary,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 8,
  },
  // activityIndicatorWrapper: {
  //   borderRadius: 10,
  //   display: 'flex',
  //   alignItems: 'center',
  //   color: '#FFF',
  //   justifyContent: 'space-around',
  // },
  // loader: {
  //   height: 100,
  //   width: 100,
  //   fontSize: 30,
  // },
  closeButton: {
    alignSelf: 'flex-end',
  },
  // closeButtonText: {
  //   color: 'white',
  //   fontSize: 16,
  // },
});

export { AppModal };
