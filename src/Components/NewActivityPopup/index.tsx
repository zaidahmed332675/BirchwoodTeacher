import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { vh } from '../../Utils/units';
import { AppInput } from '../AppInput';
import { AppButton } from '../Button';
import { AppModal } from '../Modal';

interface NewActivityPopupProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (activityName: string) => void;
}

const NewActivityPopup = ({
  isVisible,
  onClose,
  onSubmit,
}: NewActivityPopupProps) => {
  const [activityName, setActivityName] = useState('');

  const handleSubmit = () => {
    onSubmit(activityName);
    setActivityName('');
  };

  return (
    <AppModal isModalVisible={isVisible} onClose={onClose}>
      <View style={styles.modalContent}>
        <AppInput
          label="New Activity"
          inputStyle={styles.input}
          placeholder="Enter Activity Name"
          value={activityName}
          onChange={text => setActivityName(text)}
        />
        <AppButton
          title="Create"
          btnStyle={{
            marginVertical: 10,
          }}
          onPress={handleSubmit}
        />
      </View>
    </AppModal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '100%',
    height: vh * 6,
  },
});

export { NewActivityPopup };
