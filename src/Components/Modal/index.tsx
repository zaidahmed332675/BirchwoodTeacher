import React from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors } from '../../theme/colors';
import { VIcon } from '../VIcon';

interface AppModalProps {
  isModalVisible: boolean;
  children: React.ReactNode;
  _styleContent?: object;
  _styleBackground?: object;
  onClose: () => void;
}

export const AppModal = ({
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
              <VIcon
                type="Ionicons"
                name="close-circle-outline"
                size={26}
                color={colors.theme.primary}
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
    backgroundColor: '#rgba(0, 0, 0, 0.25)',
    zIndex: 1000,
  },
  modalContent: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 20,
    backgroundColor: colors.theme.white,
  },
  header: {
    width: '100%',
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
