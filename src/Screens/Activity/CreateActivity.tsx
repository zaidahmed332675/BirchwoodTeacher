import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { CheckBox } from '@rneui/themed';
import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import profile from '../../Assets/images/profile_bg.png';
import BottomSheet from '../../Components/BottomSheet';
import AppButton from '../../Components/Button';
import Layout from '../../Components/Layout';
import { RichTextEditor } from '../../Components/RichTextEditor';
import { SearchModal } from '../../Components/SearchModal';
import VIcon from '../../Components/VIcon';
import { ActivityStackParams } from '../../Types/NavigationTypes';
import { colors } from '../../theme/colors';
import { dummyRecords } from '../../Utils/options';
import { TouchableOpacity } from 'react-native';

type Props = StackScreenProps<ActivityStackParams, 'createActivity'>;

const CustomHeader = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.titlContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <VIcon
            type="Ionicons"
            name="chevron-back-outline"
            size={30}
            color={colors.theme.white}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: colors.text.white,
            marginLeft: 10,
            fontWeight: 'bold',
            fontSize: 18,
          }}>
          Create Post
        </Text>
      </View>
    </View>
  );
};

const CreateActivityModalContent = () => {
  let [audience, setAudience] = useState(0);

  const searchModalRef = useRef();
  const [open, setOpen] = useState(false);
  const [student, setStudent] = useState();

  const [items] = useState([...dummyRecords]);

  useEffect(() => {
    let name = searchModalRef.current?.getValue?.();
    if (name) {
      setStudent(name);
    }
  }, [open]);

  console.log(student);

  return (
    <View style={styles.contentContainer}>
      <Text
        style={{
          marginVertical: 20,
          color: colors.text.white,
          fontWeight: 'bold',
          fontSize: 18,
        }}>
        Choose Audience
      </Text>
      <View>
        <CheckBox
          checked={audience === 0}
          title="Class"
          textStyle={{
            fontSize: 16,
            color: colors.text.white,
          }}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          containerStyle={{
            backgroundColor: 'transparent',
            padding: 0,
            marginVertical: 8,
          }}
          checkedColor={colors.theme.white}
          onIconPress={() => setAudience(0)}
        />
        <CheckBox
          checked={audience === 1}
          title="Kid"
          textStyle={{
            fontSize: 16,
            color: colors.text.white,
          }}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          containerStyle={{
            backgroundColor: 'transparent',
            marginVertical: 8,
            padding: 0,
          }}
          checkedColor={colors.theme.white}
          onIconPress={() => setAudience(1)}
        />
      </View>
      {audience === 1 && (
        <SearchModal
          open={open}
          setOpen={setOpen}
          items={items}
          ref={searchModalRef}
        />
      )}
    </View>
  );
};

const CreateActivity = ({}: Props) => {
  const sheetRef = useRef<BottomSheetModal>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Layout customHeader={<CustomHeader />}>
      <View style={styles.container}>
        <Image style={styles.profilePic} source={profile} />
        <View>
          <Text style={styles.userName}>Anna Mary</Text>
          <Text style={styles.timeStamp}>Class Post</Text>
        </View>
      </View>
      <RichTextEditor />
      <BottomSheet
        ref={sheetRef}
        enableDismissOnClose
        onDismiss={() => {
          setIsOpen(false);
        }}
        _handleStyle={{
          backgroundColor: colors.theme.primary,
        }}
        _sheetStyle={{
          backgroundColor: colors.theme.primary,
        }}>
        <CreateActivityModalContent />
      </BottomSheet>

      <AppButton
        title={isOpen ? 'Done' : 'Post Now'}
        onPress={() => {
          sheetRef.current?.present();
          setIsOpen(true);
        }}
        btnStyle={{
          width: '95%',
          height: 50,
          marginTop: 0,
          backgroundColor: colors.theme.secondary,
          borderWidth: 0,
        }}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: colors.theme.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.dimBlack,
  },
  timeStamp: {
    fontSize: 12,
    color: '#888',
  },
  header: {
    // not needed because of bottom sheet removed
    // marginHorizontal: 10,
    // marginRight: 20,
    // top: vh * 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titlContainer: { flexDirection: 'row', alignItems: 'center' },
  contentContainer: {
    backgroundColor: 'transparent',
  },
});

export default CreateActivity;