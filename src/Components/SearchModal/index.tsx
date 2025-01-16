import React, {
  Dispatch,
  SetStateAction
} from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import dp1 from '../../Assets/icons/dp1.png';
import { colors } from '../../Theme/colors';
import { Child } from '../../Types/Class';
import { vh, vw } from '../../Utils/units';
import { GlroyBold } from '../GlroyBoldText';
import { GrayMediumText } from '../GrayMediumText';
import { VIcon } from '../VIcon';

interface SearchModalProps {
  label: string;
  placeholder: string;
  required: boolean;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  value: any;
  onChange: any;
  children: Child[];
  isMultiple?: boolean;
  _style?: object;
  _containerStyle: object;
}

const ArrowUpIconComponent = () => (
  <VIcon
    name={'chevron-up'}
    style={styles.dropdownButtonArrowStyle}
    type="MaterialCommunityIcons"
  />
);

const ArrowDownIconComponent = () => (
  <VIcon
    name={'chevron-down'}
    style={styles.dropdownButtonArrowStyle}
    type="MaterialCommunityIcons"
  />
);

const CloseIconComponent = () => (
  <VIcon
    type="Ionicons"
    name="close-circle-outline"
    color={colors.theme.white}
    size={36}
  />
);

const TickIconComponent = () => (
  <VIcon
    type="Ionicons"
    name="checkmark-done-outline"
    color={colors.theme.white}
    size={30}
  />
);

export const SearchModal = ({
  label,
  placeholder = "Select Child",
  required,
  open,
  value,
  onChange,
  setOpen,
  children,
  isMultiple = false,
  _style,
  _containerStyle,
  ...rest
}: SearchModalProps) => {

  return (
    <View style={[{ marginVertical: vh * 1.32 }, _containerStyle]}>
      {label && <Text style={styles.labelStyle}>
        {label} {required && <Text style={{ color: 'red' }}>*</Text>}
      </Text>}
      <DropDownPicker
        testID="search-modal"
        listMode="MODAL"
        mode="SIMPLE"
        placeholder={placeholder}
        searchPlaceholder="Enter Child Name ..."
        open={open}
        setOpen={setOpen}
        loading={false}
        multiple={isMultiple}
        min={0}
        max={children?.length ?? 0}
        searchable={true}
        items={children}
        value={value}
        setValue={onChange}
        searchTextInputProps={{
          maxLength: 15,
        }}
        {...rest}
        renderListItem={(props) => {
          return (
            <TouchableOpacity
              onPress={() => {
                props.onPress(props);
              }}
              style={[styles.card, {
                backgroundColor: props.isSelected
                  ? colors.theme.secondary
                  : colors.theme.white,
              }]}>
              <View>
                {/* <Image
                    source={props.item.checkIn ? pDot : aDot}
                    style={{
                      height: 10,
                      width: 10,
                      borderRadius: 25,
                      resizeMode: 'contain',
                      position: 'absolute',
                      top: 3,
                      left: 3,
                      zIndex: 1,
                    }}
                  /> */}
                <Image
                  source={dp1}
                  style={styles.image}
                />
              </View>
              <View style={{ marginLeft: vw * 2.78, flex: 1 }}>
                <GlroyBold
                  text={`${props.label}`}
                  _style={{
                    color: props.isSelected
                      ? colors.theme.white
                      : colors.text.black,
                  }}
                />
                <GrayMediumText
                  text={`Roll No: ${props.item?.rollNumber}`}
                  _style={{
                    color: props.isSelected
                      ? colors.theme.white
                      : colors.text.greyAlt2,
                    fontSize: vh * 1.58, // 12
                  }}
                />
              </View>
              <View
                style={{
                  alignSelf: 'flex-start',
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: vh * 0.66, // 5
                  paddingHorizontal: vw * 1.39, // 5,
                }}>
                {props.isSelected && <TickIconComponent />}
              </View>
            </TouchableOpacity>
          );
        }}
        style={[
          {
            borderColor: colors.theme.greyAlt2,
          },
          _style,
        ]}
        selectedItemContainerStyle={{
          backgroundColor: colors.theme.secondary,
        }}
        selectedItemLabelStyle={{
          color: colors.text.white,
        }}
        CloseIconComponent={CloseIconComponent}
        TickIconComponent={TickIconComponent}
        ArrowUpIconComponent={ArrowUpIconComponent}
        ArrowDownIconComponent={ArrowDownIconComponent}
        searchContainerStyle={{
          backgroundColor: colors.theme.secondary,
          borderBottomColor: colors.theme.white,
          paddingVertical: vh * 2.63, // 20
        }}
        searchTextInputStyle={{
          backgroundColor: colors.theme.secondary,
          color: colors.text.white,
          borderColor: colors.theme.secondary,
        }}
        searchPlaceholderTextColor={colors.text.white}
        modalProps={{
          animationType: 'slide',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: vh * 1.32, // 10
    paddingHorizontal: vw * 4.17, // 15
    borderTopWidth: 0.5,
    borderTopColor: colors.theme.greyAlt,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: vh * 6.58, // 50
    width: vw * 13.89, // 50
    borderRadius: (vw * 13.89) / 2,
    resizeMode: 'contain',
  },
  labelStyle: {
    fontSize: vh * 1.58, // 12
    marginBottom: vh * 0.66, // 5
    fontWeight: 'bold',
    color: colors.text.altGrey,
  },
  dropdownButtonArrowStyle: {
    fontSize: vh * 2.89, // 22
    color: colors.text.altGrey,
  },
})
