import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { StackScreenProps } from '@react-navigation/stack';
import { CheckBox } from '@rneui/themed';
import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import profile from '../../Assets/images/profile_bg.png';
import { AppBottomSheet } from '../../Components/BottomSheet';
import { AppButton } from '../../Components/Button';
import { Layout } from '../../Components/Layout';
import { RichTextEditor } from '../../Components/RichTextEditor';
import { SearchModal } from '../../Components/SearchModal';
import { DiaryStackParams } from '../../Types/NavigationTypes';
import { colors } from '../../theme/colors';
import { dummyRecords } from '../../Utils/options';
import { CustomHeader } from '../../Components/CustomHeader';

type Props = StackScreenProps<DiaryStackParams, 'createDiary'>;

const CreateDiaryModalContent = () => {
  const searchModalRef = useRef();

  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [audience, setAudience] = useState(0);
  const [student, setStudent] = useState<Record<string, any>>();

  const [items] = useState([...dummyRecords]);

  useEffect(() => {
    let item = searchModalRef.current?.selectedItem;
    if (item) {
      setStudent(item);
    }
  }, [isSearchModalOpen]);

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
          title="Child"
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
          open={isSearchModalOpen}
          setOpen={setSearchModalOpen}
          items={items}
          ref={searchModalRef}
        />
      )}
    </View>
  );
};

const CreateDiary = ({}: Props) => {
  const sheetRef = useRef<BottomSheetModal>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Layout customHeader={<CustomHeader title="Create Diary" />}>
      <View style={styles.container}>
        <Image style={styles.profilePic} source={profile} />
        <View>
          <Text style={styles.userName}>Anna Mary</Text>
          <Text style={styles.timeStamp}>Class Post</Text>
        </View>
      </View>
      <RichTextEditor enableToolbar={false} />
      <AppBottomSheet
        ref={sheetRef}
        enableDismissOnClose
        onDismiss={() => {
          setIsOpen(false);
        }}
        _handleStyle={{
          backgroundColor: colors.theme.greyAlt2,
        }}
        _sheetStyle={{
          backgroundColor: colors.theme.greyAlt2,
        }}>
        <CreateDiaryModalContent />
      </AppBottomSheet>

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
          marginVertical: 10,
        }}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
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
  contentContainer: {
    backgroundColor: 'transparent',
  },
});

export default CreateDiary;
