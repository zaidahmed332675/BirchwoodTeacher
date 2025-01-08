import React, {
  Dispatch,
  SetStateAction,
  forwardRef,
  // useImperativeHandle,
  // useState
} from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import aDot from '../../Assets/icons/absentDot.png';
import dp1 from '../../Assets/icons/dp1.png';
import pDot from '../../Assets/icons/presentDot.png';
import { Child } from '../../Types/Class';
import { colors } from '../../Theme/colors';
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

export const SearchModal = forwardRef(
  (
    {
      label,
      placeholder = "Select Child",
      required,
      open,
      value,
      onChange,
      setOpen,
      children,
      // selectedItems,
      isMultiple = false,
      _style,
      _containerStyle,
      ...rest
    }: SearchModalProps,
    ref
  ) => {

    // const [value, setValue] = useState<any>(selectedItems);
    // useImperativeHandle(
    //   ref,
    //   () => ({
    //     selectedItem: value,
    //     setValue: (val: any) => setValue(val),
    //   }),
    //   [value]
    // );

    return (
      <View style={[{ marginVertical: 10 }, _containerStyle]}>
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
                style={{
                  backgroundColor: props.isSelected
                    ? colors.theme.secondary
                    : colors.theme.white,
                  padding: 10,
                  paddingHorizontal: 15,
                  borderTopWidth: 0.5,
                  borderTopColor: colors.theme.greyAlt,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
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
                    style={{
                      height: 50,
                      width: 50,
                      borderRadius: 25,
                      resizeMode: 'contain',
                    }}
                  />
                </View>
                <View style={{ marginLeft: 10, flex: 1 }}>
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
                      fontSize: 12,
                    }}
                  />
                </View>
                <View
                  style={{
                    alignSelf: 'flex-start',
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 5,
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
            paddingVertical: 20,
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
);

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 12,
    marginBottom: 5,
    fontWeight: 'bold',
    color: colors.text.altGrey,
  },
  dropdownButtonArrowStyle: {
    fontSize: 22,
    color: colors.text.altGrey,
  },
})
