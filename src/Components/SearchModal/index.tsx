import React, {
  Dispatch,
  SetStateAction,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { colors } from '../../theme/colors';
import VIcon from '../VIcon';
import { Image, TouchableOpacity, View } from 'react-native';
import GlroyBold from '../GlroyBoldText';
import GrayMediumText from '../GrayMediumText';
import dp1 from '../../Assets/icons/dp1.png';

interface SearchModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  items: Record<string, any>[];
  _style?: object;
}

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

const SearchModal = forwardRef(
  ({ open, setOpen, items, _style }: SearchModalProps, ref) => {
    const [value, setValue] = useState<any>(null);

    useImperativeHandle(
      ref,
      () => ({
        selectedItem: value,
      }),
      [value]
    );

    return (
      <DropDownPicker
        testID="search-modal"
        listMode="MODAL"
        placeholder="Select Child"
        searchPlaceholder="Enter Child Name ..."
        open={open}
        closeOnBackPressed={false}
        loading={false}
        value={value?.value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        searchable={true}
        searchTextInputProps={{
          maxLength: 15,
        }}
        renderListItem={({ label, isSelected, item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setValue(item);
                setOpen(false);
              }}
              style={{
                backgroundColor: isSelected
                  ? colors.theme.secondary
                  : colors.theme.white,
                padding: 10,
                paddingHorizontal: 15,
                borderTopWidth: 0.5,
                borderTopColor: colors.theme.greyAlt,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={dp1}
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 25,
                  resizeMode: 'contain',
                }}
              />
              <View style={{ marginLeft: 10, flex: 1 }}>
                <GlroyBold
                  text={label}
                  _style={{
                    color: isSelected ? colors.theme.white : colors.text.black,
                  }}
                />
                <GrayMediumText
                  text={`Roll No: ${item?.rollNumber}`}
                  _style={{
                    color: isSelected
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
                {isSelected && <TickIconComponent />}
              </View>
            </TouchableOpacity>
          );
        }}
        style={[
          {
            marginTop: 20,
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
          animationType: 'fade',
        }}
      />
    );
  }
);

export { SearchModal };
