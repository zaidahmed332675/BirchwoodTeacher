import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppInput } from '../../Components/AppInput';
import { AppButton } from '../../Components/Button';
import { GlroyBold } from '../../Components/GlroyBoldText';
import { GrayMediumText } from '../../Components/GrayMediumText';
import { vw } from '../../Utils/units';
import { colors } from '../../theme/colors';

const LeaveForm = ({}) => {
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <GlroyBold
          text={'Applying for a Leave ?'}
          _style={{ color: colors.theme.primary, fontSize: vw * 6 }}
        />
      </View>
      <GrayMediumText
        text={
          'Please enter a new password for your account below. Make sure it is strong and secure.'
        }
        _style={styles.para}
      />
      <View>
        <AppInput
          label="Leave Type"
          placeholder="Select Leave Type"
          value={leaveType}
          onChange={setLeaveType}
        />
        <AppInput
          label="Start Date"
          placeholder="Select Start Date"
          value={startDate}
          onChange={setStartDate}
        />
        <AppInput
          label="End Date"
          placeholder="Select End Date"
          value={endDate}
          onChange={setEndDate}
        />
        <AppInput
          label="Reason"
          placeholder="Enter Your Reason"
          value={reason}
          onChange={setReason}
          isMultiple={true}
          numberOfLines={4}
          inputStyle={{
            textAlignVertical: 'top',
          }}
        />
      </View>
      <View style={{ alignItems: 'center' }}>
        <AppButton
          title="Apply"
          btnStyle={{
            marginVertical: 10,
          }}
          onPress={() => {}}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  para: {
    textAlign: 'center',
    marginTop: 15,
    lineHeight: 22,
  },
  heading: {
    alignItems: 'center',
  },
});

export { LeaveForm };
