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

interface SearchModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  items: Record<string, any>[];
  _style?: object;
}

const CloseIconComponent = () => (
  <VIcon type="Ionicons" name="close-circle-outline" size={36} />
);
const TickIconComponent = () => (
  <VIcon type="Ionicons" name="checkmark-done-outline" size={30} />
);

const SearchModal = forwardRef(
  ({ open, setOpen, items, _style }: SearchModalProps, ref) => {
    const [value, setValue] = useState(null);

    useImperativeHandle(
      ref,
      () => ({
        getValue() {
          return value;
        },
      }),
      [value]
    );

    return (
      <DropDownPicker
        listMode="MODAL"
        placeholder="Select Kid"
        searchPlaceholder="Type Name ..."
        open={open}
        closeOnBackPressed={false}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        searchable={true}
        searchTextInputProps={{
          maxLength: 15,
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
